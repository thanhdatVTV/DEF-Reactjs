import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getSemesterList, createSemester, updateSemester, deleteSemester } from '../../services/SemesterService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './Semester.scss'

const TableSemester = (props) => {
    const [listSemester, setListSemester] = useState([]);
    const [totalSemester, setTotalSemester] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataSemesterEdit, setDataSemesterEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataSemesterDelete, setDataSemesterDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "MaHocKy", label: "Semester ID", type: "text" },
        { name: "HocKy", label: "Semester name", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaHocKy", label: "Semester ID", type: "text" },
        { name: "HocKy", label: "Semester name", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getSemester("", 1, 6);
    }

    const handleEditSemesterFromModal = (Semester) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getSemester("", 1, 6);
    }

    useEffect(() => {
        //call api
        getSemester("", 1, 6);
    }, [])

    const getSemester = async (keyword, pageNumber, perPage) => {

        let res = await getSemesterList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalSemester(res.response.total)
            setTotalPages(res.response.totalPages)
            setListSemester(res.response)
        }
    }

    const handlePageClick = (event) => {
        getSemester("", +event.selected + 1, 6)
    }

    const handleEditSemester = (Semester) => {
        setDataSemesterEdit(Semester);
        setIsShowModalEdit(true);
    }

    const handleDeleteSemester = (Semester) => {
        setIsShowModalDelete(true);
        setDataSemesterDelete(Semester);
    }

    const handleDeleteSemesterFromModal = (Semester) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getSemester("", 1, 6);
        console.log('d1', listSemester);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListSemester = _.cloneDeep(listSemester);
        cloneListSemester = _.orderBy(cloneListSemester, [sortField], [sortBy])
        setListSemester(cloneListSemester);
        console.log('d1', listSemester);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListSemester = _.cloneDeep(listSemester);
            cloneListSemester = cloneListSemester.filter(item => {
                return (
                    item.data.MaHocKy.includes(term) ||
                    item.data.HocKy.includes(term)
                    // Thêm các điều kiện khác nếu cần
                );
            });
            setListSemester(cloneListSemester);
        }
        else {
            getSemester("", 1, 6);
        }
    }, 500)
    return (
        <>
            <div className='Semester-container'>
                <div class="box-header">
                    <h3 class="box-title">
                        HỌC KỲ
                    </h3>
                </div>
                <div className="my-3 add-new">
                    <span><b></b></span>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Thêm Học Kỳ Mới</button>
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
                                    <span>Mã Học Kỳ</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaHocKy")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaHocKy")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Học Kỳ</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "HocKy")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "HocKy")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSemester && listSemester.length > 0 &&
                            listSemester.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.data.MaHocKy}</td>
                                        <td>{item.data.HocKy}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditSemester(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteSemester(item)}
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
                    createApi={createSemester}
                    handleUpdateTable={handleUpdateTable}
                    title="Thêm học kỳ"
                    buttonText="Save changes"
                    successMessage="A new Semester is created successfully!"
                    errorMessage="Failed to create Semester."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataSemesterEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditSemesterFromModal}
                    updateApi={updateSemester}
                    title="Sửa Học Kỳ"
                    successMessage='Update Semester successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataSemesterDelete}
                    handleDeleteFromModal={handleDeleteSemesterFromModal}
                    deleteApi={deleteSemester}
                    title='Delete Semester'
                    successMessage='Delete Semester successfully'
                />
            </div>
        </>
    )
}

export default TableSemester;