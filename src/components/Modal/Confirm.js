
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
    const { show, handleClose, dataDelete, deleteApi, handleDeleteFromModal, title, successMessage } = props;

    const confirmDelete = async () => {
        console.log('dataDelete.id', dataDelete.id);
        let res = await deleteApi(dataDelete.id)
        if (res && res.status) {
            toast.success(successMessage);
            handleClose();
            handleDeleteFromModal(dataDelete);
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
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        Bạn có chắc muốn xóa không?
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

