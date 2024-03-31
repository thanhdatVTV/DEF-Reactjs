import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { updatePrinter } from "../../services/PrinterService";
import { toast } from 'react-toastify';
import { useEffect } from "react";

const ModalEdit = (props) => {
    const { show, handleClose, dataFileTypeEdit, handleEditFileTypeFromModal } = props;
    const [brand, setBrand] = useState("");
    const [printerModel, setPrinterModel] = useState("");
    const [description, setDescription] = useState("");

    const handleEditFileType = async () => {
        let res = await updatePrinter(dataFileTypeEdit.id, brand, printerModel, description);
        if (res) {
            //success
            handleEditFileTypeFromModal({
                id: dataFileTypeEdit.id,
                brand: brand,
                printerModel: printerModel,
                description: description
            })
            handleClose();
            toast.success("update printer success");
        }
        else {
            //error
        }
        console.log(res);
    }

    useEffect(() => {
        if (show) {
            setBrand(dataFileTypeEdit.brand);
            setPrinterModel(dataFileTypeEdit.printerModel);
            setDescription(dataFileTypeEdit.description);
        }
    }, [dataFileTypeEdit])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a printer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Brand</label>
                            <input
                                type="text"
                                className="form-control"
                                value={brand}
                                onChange={(event) => setBrand(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Model</label>
                            <input
                                type="text"
                                className="form-control"
                                value={printerModel}
                                onChange={(event) => setPrinterModel(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                    <Button variant="primary" onClick={() => handleEditFileType()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEdit;

