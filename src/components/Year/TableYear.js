import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getYearList, createYear, updateYear, deleteYear } from '../../services/YearService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './Year.scss'

const TableYear = (props) => {
    const [listYear, setListYear] = useState([]);
    const [totalYear, setTotalYear] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataYearEdit, setDataYearEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataYearDelete, setDataYearDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "MaNamHoc", label: "Year ID", type: "text" },
        { name: "NamHoc", label: "Year name", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaNamHoc", label: "Year ID", type: "text" },
        { name: "NamHoc", label: "Year name", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getYear("", 1, 6);
    }

    const handleEditYearFromModal = (Year) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getYear("", 1, 6);
    }

    useEffect(() => {
        //call api
        getYear("", 1, 6);
    }, [])

    const getYear = async (keyword, pageNumber, perPage) => {

        let res = await getYearList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalYear(res.response.total)
            setTotalPages(res.response.totalPages)
            setListYear(res.response)
        }
    }

    const handlePageClick = (event) => {
        getYear("", +event.selected + 1, 6)
    }

    const handleEditYear = (Year) => {
        setDataYearEdit(Year);
        setIsShowModalEdit(true);
    }

    const handleDeleteYear = (Year) => {
        setIsShowModalDelete(true);
        setDataYearDelete(Year);
    }

    const handleDeleteYearFromModal = (Year) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getYear("", 1, 6);
        console.log('d1', listYear);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListYear = _.cloneDeep(listYear);
        cloneListYear = _.orderBy(cloneListYear, [sortField], [sortBy])
        setListYear(cloneListYear);
        console.log('d1', listYear);

    }

    const handleSearch = debounce((event) => {
        console.log(event.target.value)
        let term = event.target.value;
        if (term) {
            let cloneListYear = _.cloneDeep(listYear);
            cloneListYear = cloneListYear.filter(item => item.typeName.includes(term))
            setListYear(cloneListYear);
        }
        else {
            getYear("", 1, 6);
            console.log('d1', listYear);

        }
    }, 500)
    return (
        <>
            <div className='Year-container'>
                <div className="my-3 add-new">
                    <span><b>Nam Hoc:</b></span>
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
                                    <span>Ma Nam Hoc</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaNamHoc")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaNamHoc")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Nam Hoc</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "NamHoc")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "NamHoc")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listYear && listYear.length > 0 &&
                            listYear.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.data.MaNamHoc}</td>
                                        <td>{item.data.NamHoc}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditYear(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteYear(item)}
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
                    createApi={createYear}
                    handleUpdateTable={handleUpdateTable}
                    title="Add new Year"
                    buttonText="Save changes"
                    successMessage="A new Year is created successfully!"
                    errorMessage="Failed to create Year."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataYearEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditYearFromModal}
                    updateApi={updateYear}
                    title="Edit Year"
                    successMessage='Update Year successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataYearDelete}
                    handleDeleteFromModal={handleDeleteYearFromModal}
                    deleteApi={deleteYear}
                    title='Delete Year'
                    successMessage='Delete Year successfully'
                />
            </div>
        </>
    )
}

export default TableYear;