import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createPrinter } from "../../services/PrinterService";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [brand, setBrand] = useState("");
    const [printerModel, setprinterModel] = useState("");
    const [description, setDescription] = useState("");

    const handleSaveUser = async () => {
        let res = await createPrinter(brand, printerModel, description);
        console.log(res);
        if (res && res.response.id) {
            handleClose();
            setBrand('');
            setprinterModel('');
            setDescription('');
            toast.success('A new printer is created succeed!')
            handleUpdateTable({ id: res.response.id, brand: brand, printerModel: printerModel, description: description });
            //success
        }
        else {
            //error
            toast.success('A printer is created error!')
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new Printer</Modal.Title>
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
                                onChange={(event) => setprinterModel(event.target.value)}
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
                    <Button variant="primary" onClick={() => handleSaveUser()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;

