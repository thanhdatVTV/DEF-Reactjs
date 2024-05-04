import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getMajorList, createMajor, updateMajor, deleteMajor } from '../../services/MajorService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './AddNew';
import ModalEdit from './Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './Major.scss'

const TableMajor = (props) => {
    const [listMajor, setListMajor] = useState([]);
    const [totalMajor, setTotalMajor] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataMajorEdit, setDataMajorEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataMajorDelete, setDataMajorDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "MaKhoa", label: "Faculty ID", type: "text" },
        { name: "TenKhoa", label: "Faculty name", type: "text" },
        { name: "MaNganh", label: "Major ID", type: "text" },
        { name: "TenNganh", label: "Major name", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaKhoa", label: "Faculty ID", type: "text" },
        { name: "TenKhoa", label: "Faculty name", type: "text" },
        { name: "MaNganh", label: "Major ID", type: "text" },
        { name: "TenNganh", label: "Major name", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getMajor("", 1, 6);
    }

    const handleEditMajorFromModal = (Major) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getMajor("", 1, 6);
    }

    useEffect(() => {
        //call api
        getMajor("", 1, 6);
    }, [])

    const getMajor = async (keyword, pageNumber, perPage) => {

        let res = await getMajorList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalMajor(res.response.total)
            setTotalPages(res.response.totalPages)
            setListMajor(res.response)
        }
    }

    const handlePageClick = (event) => {
        getMajor("", +event.selected + 1, 6)
    }

    const handleEditMajor = (Major) => {
        setDataMajorEdit(Major);
        setIsShowModalEdit(true);
    }

    const handleDeleteMajor = (Major) => {
        setIsShowModalDelete(true);
        setDataMajorDelete(Major);
    }

    const handleDeleteMajorFromModal = (Major) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getMajor("", 1, 6);
        console.log('d1', listMajor);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListMajor = _.cloneDeep(listMajor);
        cloneListMajor = _.orderBy(cloneListMajor, [sortField], [sortBy])
        setListMajor(cloneListMajor);
        console.log('d1', listMajor);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListMajor = _.cloneDeep(listMajor);
            cloneListMajor = cloneListMajor.filter(item => {
                return (
                    item.data.MaKhoa.includes(term) ||
                    item.data.TenKhoa.includes(term) ||
                    item.data.MaNganh.includes(term) ||
                    item.data.TenNganh.includes(term)
                    // Thêm các điều kiện khác nếu cần
                );
            });
            setListMajor(cloneListMajor);
        }
        else {
            getMajor("", 1, 6);
        }
    }, 500)

    return (
        <>
            <div className='Major-container'>
                <div class="box-header">
                    <h3 class="box-title">
                        DANH SÁCH NGÀNH HỌC
                    </h3>
                </div>
                <div className="my-3 add-new">
                    <span><b></b></span>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Thêm Ngành Học Mới</button>
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
                                    <span>Mã Khoa</span>
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
                            <th>
                                <div className='sort-header'>
                                    <span>Mã Ngành Học</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaNganh")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaNganh")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Tên Ngành Học</span>
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listMajor && listMajor.length > 0 &&
                            listMajor.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.data.MaKhoa}</td>
                                        <td>{item.data.TenKhoa}</td>
                                        <td>{item.data.MaNganh}</td>
                                        <td>{item.data.TenNganh}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditMajor(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteMajor(item)}
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
                    createApi={createMajor}
                    handleUpdateTable={handleUpdateTable}
                    title="Thêm mới Ngành Học"
                    buttonText="Xác Nhận"
                    successMessage="A new Major is created successfully!"
                    errorMessage="Failed to create Major."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataMajorEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditMajorFromModal}
                    updateApi={updateMajor}
                    title="Edit Major"
                    successMessage='Update Major successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataMajorDelete}
                    handleDeleteFromModal={handleDeleteMajorFromModal}
                    deleteApi={deleteMajor}
                    title='Delete Major'
                    successMessage='Delete Major successfully'
                />
            </div>
        </>
    )
}

export default TableMajor;