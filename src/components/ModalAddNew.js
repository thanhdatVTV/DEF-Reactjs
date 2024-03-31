import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    // const { show, handleClose, handleUpdateTable } = props;
    // const [codeId, setCodeId] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [fullName, setFullName] = useState("");
    // const [dateOfBirth, setDateOfBirth] = useState("");
    // const [facultyName, setFacultyName] = useState("");
    // const [courseName, setCourseName] = useState("");
    // const [type, setType] = useState("");

    // const handleSaveUser = async () => {
    //     let res = await postCreateUser(codeId, lastName, firstName, fullName, dateOfBirth, facultyName, courseName, type);
    //     console.log(res);
    //     if (res) {
    //         handleClose();
    //         setCodeId('');
    //         setFirstName('');
    //         setLastName('');
    //         setFullName('');
    //         setDateOfBirth('');
    //         setFaculty('');
    //         setCourse('');
    //         setType('');
    //         toast.success('A User is created succeed!')
    //         let tmpCodeId = res.response.type ? res.response.studentId : res.response.teacherId;
    //         handleUpdateTable({ 
    //             codeId: tmpCodeId,
    //             firstName: res.response.firstName, 
    //             lastName: res.response.lastName, 
    //             fullName: res.response.fullName, 
    //             dateOfBirth: res.response.dateOfBirth, 
    //             facultyName: res.response.facultyName, 
    //             courseName: res.response.courseName, 
    //             type: res.response.type
    //         });
    //         //success
    //     }
    //     else {
    //         //error
    //         toast.success('A User is created error!')
    //     }
    // }
    return (
        <>
            {/* <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">ID</label>
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
                    <Button variant="primary" onClick={() => handleSaveUser()}>Save changes</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    )
}

export default ModalAddNew;

