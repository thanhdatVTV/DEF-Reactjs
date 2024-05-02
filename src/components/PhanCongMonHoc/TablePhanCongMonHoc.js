import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getPhanCongMonHocs, createPhanCongMonHoc, updatePhanCongMonHoc, deletePhanCongMonHoc } from '../../services/PhanCongMonHocService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";


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

    const tableHeads = [
        'MaMH',
        'TenMH',
        'NamHoc',
        'HocKy',
        'CoSo',
        'ToaNha',
        'Phong',
        'TuanHocBatDau',
        'TuanHocKetThuc',
        'Thu',
        'TietHocBatDau',
        'TietHocKetThuc',
        'SiSo',
        'TeacherCode'
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

        let res = await getPhanCongMonHocs(keyword, pageNumber, perPage);
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
        console.log(event.target.value)
        let term = event.target.value;
        if (term) {
            let cloneListLecturerss = _.cloneDeep(listLecturers);
            cloneListLecturerss = cloneListLecturerss.filter(item => item.typeName.includes(term))
            setListLecturers(cloneListLecturerss);
        }
        else {
            getLecturerss("", 1, 6);
            console.log('d1', listLecturers);

        }
    }, 500)

    return (
        <>
            <div className='Lecturers-container'>
                <div className="my-3 add-new">
                    <span><b>Giảng viên:</b></span>
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
                            {tableHeads.map(th => (
                                <th key={th}>
                                    <div className='sort-header'>
                                        <span>{th}</span>
                                        <span>
                                            <i
                                                className="fa-solid fa-arrow-down-long"
                                                onClick={() => handleSort("desc", th)}
                                            >
                                            </i>
                                            <i
                                                className="fa-solid fa-arrow-up-long"
                                                onClick={() => handleSort("asc", th)}
                                            >
                                            </i>
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {listLecturers && listLecturers.length > 0 &&
                            listLecturers.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        {/* <td>{item.data.MaDDK}</td> */}
                                        {/* <td>{item.data.NganhHoc}</td> */}
                                        <td>{item.data.MaMH}</td>
                                        <td>{item.data.TenMH}</td>
                                        <td>{item.data.NamHoc}</td>
                                        <td>{item.data.HocKy}</td>
                                        <td>{item.data.CoSo}</td>
                                        <td>{item.data.ToaNha}</td>
                                        <td>{item.data.Phong}</td>
                                        <td>{item.data.TuanHocBatDau}</td>
                                        <td>{item.data.TuanHocKetThuc}</td>
                                        <td>{item.data.Thu}</td>
                                        <td>{item.data.TietHocBatDau}</td>
                                        <td>{item.data.TietHocKetThuc}</td>
                                        <td>{item.data.SiSo}</td>
                                        <td>{item.data.TeacherCode}</td>
                                        {/* <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditLecturers(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteLecturers(item)}
                                            >Delete
                                            </button>
                                        </td> */}
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
                    // createApi={createLecturers}
                    handleUpdateTable={handleUpdateTable}
                    title="Add new Lecturer"
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
                    // updateApi={updateLecturers}
                    title="Edit Lecturer"
                    successMessage='Update lecturer successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataLecturersDelete}
                    handleDeleteFromModal={handleDeleteLecturersFromModal}
                    // deleteApi={deleteLecturers}
                    title='Delete Lecturer'
                    successMessage='Delete Lecturer successfully'
                />
            </div>
        </>)
}

export default TableLecturers;