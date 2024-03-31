import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { updatePageSize } from "../../services/PageSizeService";
import { toast } from 'react-toastify';
import { useEffect } from "react";

const ModalEdit = (props) => {
    const { show, handleClose, dataFileTypeEdit, handleEditFileTypeFromModal } = props;
    const [pageSizeName, setPageSizeName] = useState("");

    const handleEditFileType = async () => {
        let res = await updatePageSize(dataFileTypeEdit.id, pageSizeName);
        if (res) {
            //success
            handleEditFileTypeFromModal({
                id: dataFileTypeEdit.id,
                pageSizeName: pageSizeName
            })
            handleClose();
            toast.success("update page size success");
        }
        else {
            //error
        }
        console.log(res);
    }

    useEffect(() => {
        if (show) {
            setPageSizeName(dataFileTypeEdit.pageSizeName);
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
                    <Modal.Title>Edit a page size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Page size name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={pageSizeName}
                                onChange={(event) => setPageSizeName(event.target.value)}
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

