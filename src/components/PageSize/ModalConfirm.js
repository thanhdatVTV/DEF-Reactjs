
import { Modal, Button } from "react-bootstrap";
import { deletePageSize } from "../../services/PageSizeService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
    const { show, handleClose, dataFileTypeDelete, handleDeleteFileTypeFromModal } = props;

    const confirmDelete = async () => {
        let res = await deletePageSize(dataFileTypeDelete.id)
        if (res && res.status) {
            toast.success("Delete file type succeed!");
            handleClose();
            handleDeleteFileTypeFromModal(dataFileTypeDelete);
        }
        else {
            toast.error("Error delete")
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
                    <Modal.Title>Delete a page size</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        Bạn có muốn thực hiện thao tác!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm;

