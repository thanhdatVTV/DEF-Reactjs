import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createFileType } from "../../services/FileTypeService";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [typeName, setTypeName] = useState("");

    const handleSaveUser = async () => {
        let res = await createFileType(typeName);
        if (res && res.response.id) {
            handleClose();
            setTypeName('');
            toast.success('A new File Type is created succeed!')
            handleUpdateTable({ id: res.response.id, typeName: typeName });
            //success
        }
        else {
            //error
            toast.success('A File Type is created error!')
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
                    <Modal.Title>Add new File Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">File type name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={typeName}
                                onChange={(event) => setTypeName(event.target.value)}
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

