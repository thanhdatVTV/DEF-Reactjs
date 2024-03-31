import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateFileType } from "../../services/FileTypeService";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import './FileType.scss'

const ModalEdit = (props) => {
    const { show, handleClose, dataFileTypeEdit, handleEditFileTypeFromModal } = props;
    const [typeName, setTypeName] = useState("");

    const handleEditFileType = async () => {
        let res = await updateFileType(dataFileTypeEdit.id, typeName);
        if (res) {
            //success
            handleEditFileTypeFromModal({
                id: dataFileTypeEdit.id,
                typeName: typeName
            })
            handleClose();
            toast.success("update file type success");
        }
        else {
            //error
        }
        console.log(res);
    }

    useEffect(() => {
        if (show) {
            setTypeName(dataFileTypeEdit.typeName);
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
                    <Modal.Title>Edit a file type</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditFileType()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEdit;

