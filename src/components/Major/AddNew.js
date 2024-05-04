import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { getFacultyList } from '../../services/FacultyService';

const ModalAddNew = (props) => {
    const { show, handleClose, createApi, handleUpdateTable, title, buttonText, successMessage, errorMessage, inputFields } = props;
    const [inputValues, setInputValues] = useState({});
    const [listFaculty, setListFaculty] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [SelectedFacultyName, setSelectedFacultyName] = useState('');
    const [selectedTenNganh, setSelectedTenNganh] = useState('');

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

    const handleInputChange = (fieldName, value) => {
        // setSelectedTenCS(listCoSo.find(coSo => coSo.id === value).TenCS);
        setInputValues({ ...inputValues, [fieldName]: value });
    };

    const handleSelectFaculty = (value) => {
        if (value) {
          const FacultyId = listFaculty.find((Faculty) => Faculty.id === value).MaKhoa;
          setSelectedFaculty(FacultyId);
          const FacultyName = listFaculty.find((Faculty) => Faculty.id === value).TenKhoa;
          setSelectedFacultyName(setSelectedFacultyName);
          setInputValues({
            ...inputValues,
            MaKhoa: FacultyId,
            TenKhoa: FacultyName
          });
        } else {
          setInputValues({ ...inputValues, MaKhoa: '', TenKhoa: '' });
        }
      };

    const handleSaveFunc = async () => {
        try {
            const res = await createApi(inputValues);
            if (res && res.response) {
                handleClose();
                setInputValues({});
                setSelectedFaculty('');
                setSelectedFacultyName('');
                toast.success(successMessage);
                handleUpdateTable();
            } else {
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(errorMessage);
        }
    };

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
                            }  else {
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
                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    <Button variant="primary" onClick={handleSaveFunc}>Xác Nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;
