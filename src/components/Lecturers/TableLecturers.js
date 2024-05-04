import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getLecturersList, createLecturers, updateLecturers, deleteLecturers } from '../../services/LecturersService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './Lecturers.scss'


const TableLecturers = (props) => {

    const [listLecturers, setListLecturers] = useState([]);
    const [totalLecturerss, setTotalLecturerss] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataLecturersEdit, setDataLecturersEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataLecturersDelete, setDataLecturersDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "MaGV", label: "Lecturer ID", type: "text" },
        { name: "TenGV", label: "Lecturer name", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaGV", label: "Lecturer ID", type: "text" },
        { name: "TenGV", label: "Lecturer name", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getLecturerss("", 1, 6);
    }

    const handleEditLecturersFromModal = (Lecturers) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getLecturerss("", 1, 6);
    }

    useEffect(() => {
        //call api
        getLecturerss("", 1, 6);
    }, [])

    const getLecturerss = async (keyword, pageNumber, perPage) => {

        let res = await getLecturersList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalLecturerss(res.response.total)
            setTotalPages(res.response.totalPages)
            setListLecturers(res.response)
        }
    }

    const handlePageClick = (event) => {
        getLecturerss("", +event.selected + 1, 6)
    }

    const handleEditLecturers = (Lecturers) => {
        setDataLecturersEdit(Lecturers);
        setIsShowModalEdit(true);
    }

    const handleDeleteLecturers = (Lecturers) => {
        setIsShowModalDelete(true);
        setDataLecturersDelete(Lecturers);
    }

    const handleDeleteLecturersFromModal = (Lecturers) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getLecturerss("", 1, 6);
        console.log('d1', listLecturers);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListLecturerss = _.cloneDeep(listLecturers);
        cloneListLecturerss = _.orderBy(cloneListLecturerss, [sortField], [sortBy])
        setListLecturers(cloneListLecturerss);
        console.log('d1', listLecturers);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListLecturerss = _.cloneDeep(listLecturers);
            cloneListLecturerss = cloneListLecturerss.filter(item => {
                return (
                    item.data.MaGV.includes(term) ||
                    item.data.TenGV.includes(term)
                    // Thêm các điều kiện khác nếu cần
                );
            });
            setListLecturers(cloneListLecturerss);
        }
        else {
            getLecturerss("", 1, 6);
        }
    }, 500)

    return (
        <>
            <div className='Lecturers-container'>
                <div class="box-header">
                    <h3 class="box-title">
                        DANH SÁCH GIẢNG VIÊN
                    </h3>
                </div>
                <div className="my-3 add-new">
                    <span><b></b></span>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Thêm Giảng VIên mới</button>
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
                                    <span>Mã Giảng Viên</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaGV")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaGV")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Tên giảng viên</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenGV")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenGV")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listLecturers && listLecturers.length > 0 &&
                            listLecturers.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.data.MaGV}</td>
                                        <td>{item.data.TenGV}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditLecturers(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteLecturers(item)}
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
                    createApi={createLecturers}
                    handleUpdateTable={handleUpdateTable}
                    title="Thêm Giảng Viên"
                    buttonText="Save changes"
                    successMessage="A new Lecturer is created successfully!"
                    errorMessage="Failed to create Lecturer."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataLecturersEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditLecturersFromModal}
                    updateApi={updateLecturers}
                    title="Sửa Giảng Viên"
                    successMessage='Update lecturer successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataLecturersDelete}
                    handleDeleteFromModal={handleDeleteLecturersFromModal}
                    deleteApi={deleteLecturers}
                    title='Delete Lecturer'
                    successMessage='Delete Lecturer successfully'
                />
            </div>
        </>)
}

export default TableLecturers;