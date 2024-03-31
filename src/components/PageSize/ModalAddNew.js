import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { createPageSize } from "../../services/PageSizeService";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [pageSizeName, setPageSizeName] = useState("");

    const handleSaveUser = async () => {
        let res = await createPageSize(pageSizeName);
        console.log(res);
        if (res && res.response.id) {
            handleClose();
            setPageSizeName('');
            toast.success('A new page size is created succeed!')
            handleUpdateTable({ id: res.response.id, pageSizeName: pageSizeName });
            //success
        }
        else {
            //error
            toast.success('A page size is created error!')
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
                    <Modal.Title>Add new Page size</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSaveUser()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;

