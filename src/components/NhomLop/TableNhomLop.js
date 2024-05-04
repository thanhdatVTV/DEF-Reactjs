import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getNhomLopList, createNhomLop, updateNhomLop, deleteNhomLop } from '../../services/NhomLopService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './NhomLop.scss'


const TableNhomLop = (props) => {

    const [listNhomLop, setListNhomLop] = useState([]);
    const [totalNhomLop, setTotalNhomLop] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataNhomLopEdit, setDataNhomLopEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataNhomLopDelete, setDataNhomLopDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const inputFieldsAddNew = [
        // { name: "MaHK", label: "HK ID", type: "text" },
        { name: "MaNhom", label: "NhomLop ID", type: "text" },
        { name: "TenNhom", label: "Ten NhomLop", type: "text" },
        // { name: "MaMH", label: "MH ID", type: "text" },
    ];
    const inputFieldsEdit = [
        // { name: "Id", label: "ID", type: "text" },
        // { name: "MaHK", label: "HK ID", type: "text" },
        { name: "MaNhom", label: "NhomLop ID", type: "text" },
        { name: "TenNhom", label: "Ten NhomLop", type: "text" },
        // { name: "MaMH", label: "MH ID", type: "text" },
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListNhomLop([NhomLop, ...listNhomLop]);
        getNhomLop("", 1, 6);
    }

    const handleEditNhomLopFromModal = (NhomLop) => {
        // let cloneListNhomLop = _.cloneDeep(listNhomLop);
        // let index = listNhomLop.findIndex(item => item.id === NhomLop.id);
        // cloneListNhomLop[index].typeName = NhomLop.typeName;
        // setListNhomLop(cloneListNhomLop);
        getNhomLop("", 1, 6);
    }

    useEffect(() => {
        //call api
        getNhomLop("", 1, 6);
    }, [])

    const getNhomLop = async (keyword, pageNumber, perPage) => {

        let res = await getNhomLopList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setTotalNhomLop(res.response.total)
            setTotalPages(res.response.totalPages)
            setListNhomLop(res.response)
        }
    }

    const handlePageClick = (event) => {
        getNhomLop("", +event.selected + 1, 6)
    }

    const handleEditNhomLop = (NhomLop) => {
        setDataNhomLopEdit(NhomLop);
        setIsShowModalEdit(true);
    }

    const handleDeleteNhomLop = (NhomLop) => {
        setIsShowModalDelete(true);
        setDataNhomLopDelete(NhomLop);
    }

    const handleDeleteNhomLopFromModal = (NhomLop) => {
        // let cloneListNhomLop = _.cloneDeep(listNhomLop);
        // cloneListNhomLop = cloneListNhomLop.filter(item => item.id !== NhomLop.id);
        // setListNhomLop(cloneListNhomLop);
        getNhomLop("", 1, 6);
        console.log('d1', listNhomLop);

    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListNhomLop = _.cloneDeep(listNhomLop);
        cloneListNhomLop = _.orderBy(cloneListNhomLop, [sortField], [sortBy])
        setListNhomLop(cloneListNhomLop);
        console.log('d1', listNhomLop);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListNhomLop = _.cloneDeep(listNhomLop);
            cloneListNhomLop = cloneListNhomLop.filter(item => {
                return (
                    item.data.TenNhom.includes(term) ||
                    item.data.MaNhom.includes(term)
                    // Thêm các điều kiện khác nếu cần
                );
            });
            setListNhomLop(cloneListNhomLop);
        }
        else {
            getNhomLop("", 1, 6);
        }
    }, 500)

    return (
        <>
            <div className='NhomLop-container'>
                <div className="my-3 add-new">
                    <span><b>Nhom lop:</b></span>
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
                                    {/* <span>ID</span> */}
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
                                    <span>Ten nhom</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "TenNhom")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "TenNhom")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            {/* <th>
                                <div className='sort-header'>
                                    <span>Ma mon hoc</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaMH")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaMH")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th> */}
                            {/* <th>
                                <div className='sort-header'>
                                    <span>Ma hoc ki</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "MaHK")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "MaHK")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listNhomLop && listNhomLop.length > 0 &&
                            listNhomLop.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        {/* <td>{item.id}</td> */}
                                        {/* <td>{item.data.MaHK}</td> */}
                                        <td>{item.data.MaNhom}</td>
                                        <td>{item.data.TenNhom}</td>
                                        {/* <td>{item.data.MaMH}</td> */}
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditNhomLop(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteNhomLop(item)}
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
                    createApi={createNhomLop}
                    handleUpdateTable={handleUpdateTable}
                    title="Add new NhomLop"
                    buttonText="Save changes"
                    successMessage="A new NhomLop is created successfully!"
                    errorMessage="Failed to create NhomLop."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataNhomLopEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditNhomLopFromModal}
                    updateApi={updateNhomLop}
                    title="Edit NhomLop"
                    successMessage='Update NhomLop successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataNhomLopDelete}
                    handleDeleteFromModal={handleDeleteNhomLopFromModal}
                    deleteApi={deleteNhomLop}
                    title='Delete NhomLop'
                    successMessage='Delete NhomLop successfully'
                />
            </div>
        </>)
}

export default TableNhomLop;