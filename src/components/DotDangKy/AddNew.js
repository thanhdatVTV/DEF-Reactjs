import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, createApi, handleUpdateTable, title, buttonText, successMessage, errorMessage, inputFields } = props;
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (fieldName, value) => {
        setInputValues({ ...inputValues, [fieldName]: value });
    };

    const handleSaveFunc = async () => {
        try {
            const res = await createApi(inputValues);
            if (res && res.response) {
                handleClose();
                setInputValues({});
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

    const handleYearChange = (value) => {
        // Lấy năm từ giá trị input
        const year = value.substring(0, 4);
        // Cập nhật inputValues cho trường NamHoc với năm đã chọn
        handleInputChange('NamHoc', year);
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
                            if (field.name === 'ThoiGianBatDau' || field.name === 'ThoiGianKetThuc') {
                                return (
                                    <div key={index} className="mb-3">
                                        <label className="form-label">{field.label}</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={inputValues[field.name] || ''}
                                            onChange={(event) => handleInputChange(field.name, event.target.value)}
                                        />
                                    </div>
                                );
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
                                );
                            }
                        })}
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSaveFunc}>{buttonText}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;
