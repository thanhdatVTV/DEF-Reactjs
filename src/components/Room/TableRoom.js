import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getRoomList, createRoom, updateRoom, deleteRoom } from '../../services/RoomService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './AddNew';
import ModalEdit from './Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './Room.scss'


const TableBuilding = (props) => {

    const [listBuilding, setListBuilding] = useState([]);
    const [totalBuilding, setTotalBuilding] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataBuildingEdit, setDataBuildingEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataBuildingDelete, setDataBuildingDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        { name: "MaPhong", label: "Room ID", type: "text" },
        { name: "TenPhong", label: "Room name", type: "text" },
        { name: "ToaNhaId", label: "Building ID", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaPhong", label: "Room ID", type: "text" },
        { name: "TenPhong", label: "Room name", type: "text" },
        { name: "ToaNhaId", label: "Building ID", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListLecturers([Lecturers, ...listLecturers]);
        getBuilding("", 1, 6);
    }

    const handleEditBuildingFromModal = (Building) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // let index = listLecturers.findIndex(item => item.id === Lecturers.id);
        // cloneListLecturerss[index].typeName = Lecturers.typeName;
        // setListLecturers(cloneListLecturerss);
        getBuilding("", 1, 6);
    }

    useEffect(() => {
        //call api
        getBuilding("", 1, 6);
    }, [])

    const getBuilding = async (keyword, pageNumber, perPage) => {

        let res = await getRoomList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalBuilding(res.response.total)
            setTotalPages(res.response.totalPages)
            setListBuilding(res.response)
        }
    }

    const handlePageClick = (event) => {
        getBuilding("", +event.selected + 1, 6)
    }

    const handleEditBuilding = (Building) => {
        setDataBuildingEdit(Building);
        setIsShowModalEdit(true);
    }

    const handleDeleteBuilding = (Building) => {
        setIsShowModalDelete(true);
        setDataBuildingDelete(Building);
    }

    const handleDeleteBuildingFromModal = (Building) => {
        // let cloneListLecturerss = _.cloneDeep(listLecturers);
        // cloneListLecturerss = cloneListLecturerss.filter(item => item.id !== Lecturers.id);
        // setListLecturers(cloneListLecturerss);
        getBuilding("", 1, 6);
        console.log('d1', listBuilding);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListBuilding = _.cloneDeep(listBuilding);
        cloneListBuilding = _.orderBy(cloneListBuilding, [sortField], [sortBy])
        setListBuilding(cloneListBuilding);
        console.log('d1', listBuilding);

    }

    const handleSearch = debounce((event) => {
        console.log(event.target.value)
        let term = event.target.value;
        if (term) {
            let cloneListBuilding = _.cloneDeep(listBuilding);
            cloneListBuilding = cloneListBuilding.filter(item => item.typeName.includes(term))
            setListBuilding(cloneListBuilding);
        }
        else {
            getBuilding("", 1, 6);
            console.log('d1', listBuilding);

        }
    }, 500)

    return (
        <>
            <div className='Building-container'>
                <div className="my-3 add-new">
                    <span><b>Phòng:</b></span>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Thêm Phòng Mới</button>
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
                                    <span>Mã Phòng</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaPhong")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaPhong")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Tên Phòng</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenPhong")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenPhong")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>
                                <div className='sort-header'>
                                    <span>Tên Toà Nhà</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenTN")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenTN")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBuilding && listBuilding.length > 0 &&
                            listBuilding.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.data.MaPhong}</td>
                                        <td>{item.data.TenPhong}</td>
                                        <td>{item.data.TenTN}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditBuilding(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteBuilding(item)}
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
                    createApi={createRoom}
                    handleUpdateTable={handleUpdateTable}
                    title="Thêm phòng"
                    buttonText="Save changes"
                    successMessage="Thêm mới Phòng học thành công!"
                    errorMessage="Thêm mới Phòng học thất bại!"
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataBuildingEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditBuildingFromModal}
                    updateApi={updateRoom}
                    title="Sửa phòng"
                    successMessage='Cập nhật phòng thành công.'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataBuildingDelete}
                    handleDeleteFromModal={handleDeleteBuildingFromModal}
                    deleteApi={deleteRoom}
                    title='Xóa Phòng học thất bại!'
                    successMessage='Xóa phòng học thành công!'
                />
            </div>
        </>)
}

export default TableBuilding;