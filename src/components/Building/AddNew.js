import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { getCoSoList } from '../../services/CoSoService';

const ModalAddNew = (props) => {
    const { show, handleClose, createApi, handleUpdateTable, title, buttonText, successMessage, errorMessage, inputFields } = props;
    const [inputValues, setInputValues] = useState({});
    const [listCoSo, setListCoSo] = useState([]);
    const [selectedCoSo, setSelectedCoSo] = useState('');
    const [selectedTenCS, setSelectedTenCS] = useState('');

    useEffect(() => {
        getCoSoList("", 1, 4).then(response => {
            const dataList = response.response.map(item => {
                return {
                    id: item.id,
                    TenCS: item.data.TenCS
                };
            });
            setListCoSo(dataList);
        }).catch(error => {
            console.error("Error fetching CoSo list", error);
        });
    }, []);

    const handleInputChange = (fieldName, value) => {
        // setSelectedTenCS(listCoSo.find(coSo => coSo.id === value).TenCS);
        setInputValues({ ...inputValues, [fieldName]: value });
    };

    const handleSelectCoSo = (value) => {
        const coSoTen = listCoSo.find(coSo => coSo.id === value).TenCS;
        setInputValues({ ...inputValues, TenCS: coSoTen, CoSoId: value });

    };

    const handleSaveFunc = async () => {
        try {
            const res = await createApi(inputValues);
            if (res && res.response) {
                handleClose();
                setInputValues({});
                setSelectedCoSo('');
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
                            if(field.name === "CoSoId"){
                                return (
                                    <div key={index} className="mb-3">
                                        <label className="form-label">Select CoSo</label>
                                        <select
                                            className="form-select"
                                            // value={selectedCoSo}
                                            onChange={(event) => {
                                                // setSelectedCoSo(event.target.value); 
                                                handleSelectCoSo(event.target.value);
                                            }}
                                        >
                                            <option value="">None</option>
                                            {listCoSo.map((coSo) => (
                                                <option key={coSo.id} value={coSo.id}>{coSo.TenCS}</option>
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
