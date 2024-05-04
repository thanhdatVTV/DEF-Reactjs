import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { getFacultyList } from "../../services/FacultyService";

const ModalEdit = (props) => {
    const { show, handleClose, dataEdit, updateApi, handleEditFromModal, title, successMessage, inputFields } = props;
    const [inputValues, setInputValues] = useState({});
    const [listFaculty, setListFaculty] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedFacultyName, setSelectedFacultyName] = useState('');
    const [selectedTenKhoa, setSelectedTenKhoa] = useState('');

    useEffect(() => {
        getFacultyList("", 1, 4).then(response => {
            const dataList = response.response.map(item => {
                return {
                    id: item.id,
                    MaKhoa: item.data.MaKhoa,
                    TenKhoa: item.data.TenKhoa
                };
            });
            setListFaculty(dataList);
        }).catch(error => {
            console.error("Error fetching Faculty list", error);
        });
    }, []);

    const handleSelectFaculty = (value) => {
        if (value) {
          const FacultyId = listFaculty.find(
            (Faculty) => Faculty.id === value
          ).MaKhoa;
          setSelectedFaculty(FacultyId);
          const FacultyName = listFaculty.find(
            (Faculty) => Faculty.id === value
          ).TenKhoa;
          setSelectedFacultyName(FacultyName);
          setInputValues({
            ...inputValues,
            MaKhoa: FacultyId,
            TenKhoa: FacultyName,
          });
        } else {
          setInputValues({ ...inputValues, MaKhoa: '' });
        }
      };

    const handleInputChange = (fieldName, value) => {
        setInputValues({ ...inputValues, [fieldName]: value });
    };

    const handleEdit = async () => {
        let res = await updateApi({ ...inputValues, Id: dataEdit.id});
        if (res) {
            //success
            handleEditFromModal({
                ...inputValues,
                Id: dataEdit.id
            })
            handleClose();
            toast.success(successMessage);
        }
        else {
            //error
        }
        console.log(res);
    }

    useEffect(() => {
        if (show) {
            setInputValues({ ...dataEdit.data, Id: dataEdit.id });
        }
    }, [dataEdit])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <form>
                        {inputFields.map((field, index) => (
                            <div key={index} className="mb-3">
                                <label className="form-label">{field.label}</label>
                                <input
                                    type={field.type}
                                    className="form-control"
                                    value={inputValues[field.name] || ''}
                                    onChange={(event) => handleInputChange(field.name, event.target.value)}
                                />
                            </div>
                        ))}
                    </form> */}
                    <form>
                        {inputFields.map((field, index) => {
                            if(field.name === "MaKhoa"){
                                return (
                                    <div key={index} className="mb-3">
                                        <label className="form-label">Select Faculty</label>
                                        <select
                                            className="form-select"
                                            // value={selectedCoSo}
                                            onChange={(event) => {
                                                // setSelectedCoSo(event.target.value); 
                                                handleSelectFaculty(event.target.value);
                                            }}
                                        >
                                            <option value="">None</option>
                                            {listFaculty.map((Faculty) => (
                                                <option key={Faculty.id} value={Faculty.id}>{Faculty.MaKhoa}</option>
                                            ))}
                                        </select>
                                    </div>
                                )
                            } else {
                                return (
                                    
                                    <div key={index} className="mb-3">
                                        <label className="form-label">{field.label}</label>
                                        <input
                                            type={field.type}
                                            className="form-control"
                                            value={inputValues[field.name] || ''}
                                            onChange={(event) => handleInputChange(field.name, event.target.value)}
                                        />
                                    </div>    
                                )
                            }
                            
                        })}
                    
                        
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Đóng</Button>
                    <Button variant="primary" onClick={() => handleEdit()}>Xác Nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEdit;

