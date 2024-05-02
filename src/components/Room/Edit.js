import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { getBuildingList } from "../../services/BuildingService";

const ModalEdit = (props) => {
    const { show, handleClose, dataEdit, updateApi, handleEditFromModal, title, successMessage, inputFields } = props;
    const [inputValues, setInputValues] = useState({});
    const [listPhong, setListPhong] = useState([]);
    const [selectedToaNhaId, setSelectedToaNhaId] = useState('');
    const [selectedTenTN, setSelectedTenTN] = useState('');

    useEffect(() => {
        getBuildingList("", 1, 10).then(response => {
            const dataList = response.response.map(item => {
                return {
                    id: item.id,
                    TenTN: item.data.TenTN
                };
            });
            setListPhong(dataList);
        }).catch(error => {
            console.error("Error fetching CoSo list", error);
        });
    }, []);

    const handleSelectToaNha = (value) => {
        const TenTN = listPhong.find(toaNha => toaNha.id === value).TenTN;
        setInputValues({ ...inputValues, TenTN: TenTN, ToaNhaId: value });

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
                <form>
                        {inputFields.map((field, index) => {
                            if(field.name === "ToaNhaId"){
                                return (
                                    <div key={index} className="mb-3">
                                        <label className="form-label">Select Toa Nha</label>
                                        <select
                                            className="form-select"
                                            // value={selectedToaNhaId}
                                            onChange={(event) => {
                                                // setSelectedToaNhaId(event.target.value); 
                                                handleSelectToaNha(event.target.value);
                                            }}
                                        >
                                            <option value="">None</option>
                                            {listPhong.map((toaNha) => (
                                                <option key={toaNha.id} value={toaNha.id}>{toaNha.TenTN}</option>
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
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                    <Button variant="primary" onClick={() => handleEdit()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEdit;

