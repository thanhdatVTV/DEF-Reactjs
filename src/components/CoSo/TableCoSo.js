import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getCoSoList, createCoSo, updateCoSo, deleteCoSo } from '../../services/CoSoService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './CoSo.scss'

const TableCoSo = (props) => {
    const [listCoSo, setListCoSo] = useState([]);
    const [totalCoSo, setTotalCoSo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataCoSoEdit, setDataCoSoEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataCoSoDelete, setDataCoSoDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "MaCS", label: "CoSo ID", type: "text" },
        { name: "DiaChi", label: "Địa chỉ", type: "text" },
        { name: "TenCS", label: "CoSo name", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaCS", label: "CoSo ID", type: "text" },
        { name: "DiaChi", label: "Địa chỉ", type: "text" },
        { name: "TenCS", label: "CoSo name", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getCoSo("", 1, 6);
    }

    const handleEditCoSoFromModal = (CoSo) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getCoSo("", 1, 6);
    }

    useEffect(() => {
        //call api
        getCoSo("", 1, 6);
    }, [])

    const getCoSo = async (keyword, pageNumber, perPage) => {

        let res = await getCoSoList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalCoSo(res.response.total)
            setTotalPages(res.response.totalPages)
            setListCoSo(res.response)
        }
    }

    const handlePageClick = (event) => {
        getCoSo("", +event.selected + 1, 6)
    }

    const handleEditCoSo = (CoSo) => {
        setDataCoSoEdit(CoSo);
        setIsShowModalEdit(true);
    }

    const handleDeleteCoSo = (CoSo) => {
        setIsShowModalDelete(true);
        setDataCoSoDelete(CoSo);
    }

    const handleDeleteCoSoFromModal = (CoSo) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getCoSo("", 1, 6);
        console.log('d1', listCoSo);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListCoSo = _.cloneDeep(listCoSo);
        cloneListCoSo = _.orderBy(cloneListCoSo, [sortField], [sortBy])
        setListCoSo(cloneListCoSo);
        console.log('d1', listCoSo);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListCoSo = _.cloneDeep(listCoSo);
            cloneListCoSo = cloneListCoSo.filter(item => {
                return (
                    item.data.MaCS.includes(term) ||
                    item.data.TenCS.includes(term)
                    // Thêm các điều kiện khác nếu cần
                );
            });
            setListCoSo(cloneListCoSo);
        }
        else {
            getCoSo("", 1, 6);
        }
    }, 500)
    return (
        <>
            <div className='CoSo-container'>
                <div class="box-header">
                    <h3 class="box-title">
                        DANH SÁCH CƠ SỞ GIẢNG DẠY
                    </h3>
                </div>
                <div className="my-3 add-new">
                    <span><b></b></span>
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
                                    <span>Ma Co So</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaCS")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaCS")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Co So</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenCS")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenCS")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCoSo && listCoSo.length > 0 &&
                            listCoSo.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.data.MaCS}</td>
                                        <td>{item.data.TenCS}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditCoSo(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteCoSo(item)}
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
                    createApi={createCoSo}
                    handleUpdateTable={handleUpdateTable}
                    title="Add new CoSo"
                    buttonText="Save changes"
                    successMessage="A new CoSo is created successfully!"
                    errorMessage="Failed to create CoSo."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataCoSoEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditCoSoFromModal}
                    updateApi={updateCoSo}
                    title="Edit CoSo"
                    successMessage='Update CoSo successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataCoSoDelete}
                    handleDeleteFromModal={handleDeleteCoSoFromModal}
                    deleteApi={deleteCoSo}
                    title='Delete CoSo'
                    successMessage='Delete CoSo successfully'
                />
            </div>
        </>
    )
}

export default TableCoSo;