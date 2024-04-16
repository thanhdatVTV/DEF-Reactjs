import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getMajorList, createMajor, updateMajor, deleteMajor } from '../../services/MajorService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
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
        { name: "MaNganh", label: "Major ID", type: "text" },
        { name: "TenNganh", label: "Major name", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
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
        console.log(event.target.value)
        let term = event.target.value;
        if (term) {
            let cloneListMajor = _.cloneDeep(listMajor);
            cloneListMajor = cloneListMajor.filter(item => item.typeName.includes(term))
            setListMajor(cloneListMajor);
        }
        else {
            getMajor("", 1, 6);
            console.log('d1', listMajor);

        }
    }, 500)
    return (
        <>
            <div className='Major-container'>
                <div className="my-3 add-new">
                    <span><b>Nganh Hoc:</b></span>
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
                                    <span>Ma Nganh Hoc</span>
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
                                    <span>Tên Nganh Hoc</span>
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
                                        <td>{item.id}</td>
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
                    title="Add new Major"
                    buttonText="Save changes"
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