import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getEduProgramList, createEduProgram, updateEduProgram, deleteEduProgram } from '../../services/EduProgramService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './EduProgram.scss'

const TableEduProgram = (props) => {
    const [listEduProgram, setListEduProgram] = useState([]);
    const [totalEduProgram, setTotalEduProgram] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataEduProgramEdit, setDataEduProgramEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataEduProgramDelete, setDataEduProgramDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "NganhId", label: "Nganh ID", type: "text" },
        { name: "TenNganh", label: "Ten Nganh", type: "text" },
        { name: "MaMonHoc", label: "Ma Mon Hoc", type: "text" },
        { name: "TenMonHoc", label: "Ten Mon Hoc", type: "text" },
        { name: "SoTC", label: "So tin chi", type: "text" },
        { name: "GroupId", label: "Group ID", type: "text" },
        { name: "IsCompulsory", label: "Is Compulsory", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "NganhId", label: "Nganh ID", type: "text" },
        { name: "TenNganh", label: "Ten Nganh", type: "text" },
        { name: "MaMonHoc", label: "Ma Mon Hoc", type: "text" },
        { name: "TenMonHoc", label: "Ten Mon Hoc", type: "text" },
        { name: "SoTC", label: "So tin chi", type: "text" },
        { name: "GroupId", label: "Group ID", type: "text" },
        { name: "IsCompulsory", label: "Is Compulsory", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getEduProgram("", 1, 6);
    }

    const handleEditEduProgramFromModal = (EduProgram) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getEduProgram("", 1, 6);
    }

    useEffect(() => {
        //call api
        getEduProgram("", 1, 6);
    }, [])

    const getEduProgram = async (keyword, pageNumber, perPage) => {

        let res = await getEduProgramList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalEduProgram(res.response.total)
            setTotalPages(res.response.totalPages)
            setListEduProgram(res.response)
        }
    }

    const handlePageClick = (event) => {
        getEduProgram("", +event.selected + 1, 6)
    }

    const handleEditEduProgram = (EduProgram) => {
        setDataEduProgramEdit(EduProgram);
        setIsShowModalEdit(true);
    }

    const handleDeleteEduProgram = (EduProgram) => {
        setIsShowModalDelete(true);
        setDataEduProgramDelete(EduProgram);
    }

    const handleDeleteEduProgramFromModal = (EduProgram) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getEduProgram("", 1, 6);
        console.log('d1', listEduProgram);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListEduProgram = _.cloneDeep(listEduProgram);
        cloneListEduProgram = _.orderBy(cloneListEduProgram, [sortField], [sortBy])
        setListEduProgram(cloneListEduProgram);
        console.log('d1', listEduProgram);

    }

    const handleSearch = debounce((event) => {
        console.log(event.target.value)
        let term = event.target.value;
        if (term) {
            let cloneListEduProgram = _.cloneDeep(listEduProgram);
            cloneListEduProgram = cloneListEduProgram.filter(item => item.typeName.includes(term))
            setListEduProgram(cloneListEduProgram);
        }
        else {
            getEduProgram("", 1, 6);
            console.log('d1', listEduProgram);

        }
    }, 500)
    return (
        <>
            <div className='EduProgram-container'>
                <div className="my-3 add-new">
                    <span><b>Chuong Trinh Dao Tao:</b></span>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add new file type</button>
                </div>
                <div className='col-4 my-3'>
                    <input
                        className='form-control'
                        placeholder='Search...'
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <div className='sort-header'>
                                    <span>ID</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "id")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "id")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Ma Nganh</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "NganhId")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "NganhId")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Ten Nganh</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenNganh")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenNganh")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Ma Mon Hoc</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaMonHoc")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaMonHoc")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Ten Mon Hoc</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenMonHoc")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenMonHoc")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>So tin chi</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "SoTC")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "SoTC")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Group ID</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "GroupId")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "GroupId")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Is Compulsory</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "IsCompulsory")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "IsCompulsory")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEduProgram && listEduProgram.length > 0 &&
                            listEduProgram.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.data.NganhId}</td>
                                        <td>{item.data.TenNganh}</td>
                                        <td>{item.data.MaMonHoc}</td>
                                        <td>{item.data.TenMonHoc}</td>
                                        <td>{item.data.SoTC}</td>
                                        <td>{item.data.GroupId}</td>
                                        <td>{item.data.IsCompulsory}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditEduProgram(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteEduProgram(item)}
                                            >Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName='active'
                />
                <ModalAddNew
                    show={isShowModalAddNew}
                    handleClose={handleClose}
                    createApi={createEduProgram}
                    handleUpdateTable={handleUpdateTable}
                    title="Add new EduProgram"
                    buttonText="Save changes"
                    successMessage="A new EduProgram is created successfully!"
                    errorMessage="Failed to create EduProgram."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataEduProgramEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditEduProgramFromModal}
                    updateApi={updateEduProgram}
                    title="Edit EduProgram"
                    successMessage='Update EduProgram successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataEduProgramDelete}
                    handleDeleteFromModal={handleDeleteEduProgramFromModal}
                    deleteApi={deleteEduProgram}
                    title='Delete EduProgram'
                    successMessage='Delete EduProgram successfully'
                />
            </div>
        </>
    )
}

export default TableEduProgram;