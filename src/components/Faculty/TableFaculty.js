import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getFacultyList, createFaculty, updateFaculty, deleteFaculty } from '../../services/FacultyService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './Faculty.scss'


const TableFaculty = (props) => {

    const [listFaculty, setListFaculty] = useState([]);
    const [totalFaculty, setTotalFaculty] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataFacultyEdit, setDataFacultyEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataFacultyDelete, setDataFacultyDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "MaKhoa", label: "Faculty ID", type: "text" },
        { name: "TenKhoa", label: "Faculty name", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaKhoa", label: "Faculty ID", type: "text" },
        { name: "TenKhoa", label: "Faculty name", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getFaculty("", 1, 6);
    }

    const handleEditFacultyFromModal = (Faculty) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getFaculty("", 1, 6);
    }

    useEffect(() => {
        //call api
        getFaculty("", 1, 6);
    }, [])

    const getFaculty = async (keyword, pageNumber, perPage) => {

        let res = await getFacultyList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalFaculty(res.response.total)
            setTotalPages(res.response.totalPages)
            setListFaculty(res.response)
        }
    }

    const handlePageClick = (event) => {
        getFaculty("", +event.selected + 1, 6)
    }

    const handleEditFaculty = (Faculty) => {
        setDataFacultyEdit(Faculty);
        setIsShowModalEdit(true);
    }

    const handleDeleteFaculty = (Faculty) => {
        setIsShowModalDelete(true);
        setDataFacultyDelete(Faculty);
    }

    const handleDeleteFacultyFromModal = (Faculty) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getFaculty("", 1, 6);
        console.log('d1', listFaculty);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListFaculty = _.cloneDeep(listFaculty);
        cloneListFaculty = _.orderBy(cloneListFaculty, [sortField], [sortBy])
        setListFaculty(cloneListFaculty);
        console.log('d1', listFaculty);

    }

    const handleSearch = debounce((event) => {
        console.log(event.target.value)
        let term = event.target.value;
        if (term) {
            let cloneListFaculty = _.cloneDeep(listFaculty);
            cloneListFaculty = cloneListFaculty.filter(item => item.typeName.includes(term))
            setListFaculty(cloneListFaculty);
        }
        else {
            getFaculty("", 1, 6);
            console.log('d1', listFaculty);

        }
    }, 500)

    return (
        <>
            <div className='Faculty-container'>
                <div className="my-3 add-new">
                    <span><b>Khoa:</b></span>
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
                                    <span>MaKhoa</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaKhoa")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaKhoa")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Tên Khoa</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenKhoa")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenKhoa")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listFaculty && listFaculty.length > 0 &&
                            listFaculty.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.data.MaKhoa}</td>
                                        <td>{item.data.TenKhoa}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditFaculty(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteFaculty(item)}
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
                    createApi={createFaculty}
                    handleUpdateTable={handleUpdateTable}
                    title="Add new Faculty"
                    buttonText="Save changes"
                    successMessage="A new Faculty is created successfully!"
                    errorMessage="Failed to create Faculty."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataFacultyEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditFacultyFromModal}
                    updateApi={updateFaculty}
                    title="Edit Faculty"
                    successMessage='Update faculty successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataFacultyDelete}
                    handleDeleteFromModal={handleDeleteFacultyFromModal}
                    deleteApi={deleteFaculty}
                    title='Delete Faculty'
                    successMessage='Delete Faculty successfully'
                />
            </div>
        </>)
}

export default TableFaculty;