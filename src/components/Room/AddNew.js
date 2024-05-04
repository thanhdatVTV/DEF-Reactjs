import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { getBuildingList } from '../../services/BuildingService';

const ModalAddNew = (props) => {
    const { show, handleClose, createApi, handleUpdateTable, title, buttonText, successMessage, errorMessage, inputFields } = props;
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

    const handleInputChange = (fieldName, value) => {
        // setSelectedTenTN(listPhong.find(coSo => coSo.id === value).TenTN);
        setInputValues({ ...inputValues, [fieldName]: value });
    };

    const handleSelectToaNha = (value) => {
        const TenTN = listPhong.find(toaNha => toaNha.id === value).TenTN;
        setInputValues({ ...inputValues, TenTN: TenTN, ToaNhaId: value });

    };

    const handleSaveFunc = async () => {
        console.log(inputValues)
        try {
            const res = await createApi(inputValues);
            if (res && res.response) {
                handleClose();
                setInputValues({});
                setSelectedToaNhaId('');
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
                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    <Button variant="primary" onClick={handleSaveFunc}>Xác Nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;
