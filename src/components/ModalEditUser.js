import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { putUpdateUser } from "../services/UserService";
import { toast } from 'react-toastify';
import { useEffect } from "react";

const ModalEditUser = (props) => {
    // const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    // const [codeId, setCodeId] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [fullName, setFullName] = useState("");
    // const [dateOfBirth, setDateOfBirth] = useState("");
    // const [facultyName, setFacultyName] = useState("");
    // const [courseName, setCourseName] = useState("");
    // const [type, setType] = useState("");

    // const handleEditUser = async () => {
    //     let res = await putUpdateUser(id, codeId, lastName, firstName, fullName, dateOfBirth, facultyName, courseName, type);
    //     if (res) {
    //         //success
    //         handleEditUserFromModal({
    //             id: id,
    //             codeId: res.response.codeId,
    //             firstName: res.response.firstName, 
    //             lastName: res.response.lastName, 
    //             fullName: res.response.fullName, 
    //             dateOfBirth: res.response.dateOfBirth, 
    //             facultyName: res.response.facultyName, 
    //             courseName: res.response.courseName, 
    //             type: res.response.type
    //         })
    //         handleClose();
    //         toast.success("update user success");
    //     }
    //     else {
    //         //error
    //     }
    //     console.log(res);
    // }

    // useEffect(() => {
    //     if (show) {
    //         setCodeId(dataUserEdit.codeId);
    //         setFirstName(dataUserEdit.firstName);
    //         setLastName(dataUserEdit.lastName);
    //         setFullName(dataUserEdit.fullName);
    //         setDateOfBirth(dataUserEdit.dateOfBirth);
    //         setFacultyName(dataUserEdit.facultyName);
    //         setCourseName(dataUserEdit.courseName);
    //         setType(dataUserEdit.type);
    //     }
    // }, [dataUserEdit])

    return (
        <>
            {/* <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">codeId</label>
                            <input
                                type="text"
                                className="form-control"
                                value={codeId}
                                onChange={(event) => setCodeId(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">firstName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">lastName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">fullName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">dateOfBirth</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dateOfBirth}
                                onChange={(event) => setDateOfBirth(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">facultyName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={facultyName}
                                onChange={(event) => setFacultyName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">courseName</label>
                            <input
                                type="text"
                                className="form-control"
                                value={courseName}
                                onChange={(event) => setCourseName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">type</label>
                            <input
                                type="text"
                                className="form-control"
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>Confirm</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )
}

export default ModalEditUser;

