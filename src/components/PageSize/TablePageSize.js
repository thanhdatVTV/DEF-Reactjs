import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getPageSizeList } from '../../services/PageSizeService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import ModalConfirm from './ModalConfirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import './PageSize.scss'


const TablePageSize = (props) => {

    const [listFileType, setListFileType] = useState([]);
    const [totalFileTypes, setTotalFileTypes] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataFileTypeEdit, setDataFileTypeEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataFileTypeDelete, setDataFileTypeDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = (fileType) => {
        //setListFileType([fileType, ...listFileType]);
        getFileTypes("", 1, 6);

    }

    const handleEditFileTypeFromModal = (fileType) => {
        // let cloneListFileTypes = _.cloneDeep(listFileType);
        // let index = listFileType.findIndex(item => item.id === fileType.id);
        // cloneListFileTypes[index].pageSizeName = fileType.pageSizeName;
        // setListFileType(cloneListFileTypes);
        getFileTypes("", 1, 6);
    }

    useEffect(() => {
        //call api
        getFileTypes("", 1, 6);
    }, [])

    const getFileTypes = async (keyword, page, perPage) => {
        let res = await getPageSizeList(keyword, page, perPage);
        if (res && res.response) {
            setTotalFileTypes(res.response.total)
            setTotalPages(res.response.totalPages)
            setListFileType(res.response.pageSizes)
            // console.log(res.response)
        }
    }

    const handlePageClick = (event) => {
        getFileTypes('', +event.selected + 1, 6)
    }

    const handleEditFileType = (fileType) => {
        setDataFileTypeEdit(fileType);
        setIsShowModalEdit(true);
    }

    const handleDeleteFileType = (fileType) => {
        setIsShowModalDelete(true);
        setDataFileTypeDelete(fileType);
    }

    const handleDeleteFileTypeFromModal = (fileType) => {
        // let cloneListFileTypes = _.cloneDeep(listFileType);
        // cloneListFileTypes = cloneListFileTypes.filter(item => item.id !== fileType.id);
        // setListFileType(cloneListFileTypes);
        getFileTypes("", 1, 6);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListFileTypes = _.cloneDeep(listFileType);
        cloneListFileTypes = _.orderBy(cloneListFileTypes, [sortField], [sortBy])
        setListFileType(cloneListFileTypes);
    }

    const handleSearch = debounce((event) => {
        console.log(event.target.value)
        let term = event.target.value;
        if (term) {
            let cloneListFileTypes = _.cloneDeep(listFileType);
            cloneListFileTypes = cloneListFileTypes.filter(item => item.pageSizeName.includes(term))
            setListFileType(cloneListFileTypes);
        }
        else {
            getFileTypes("", 1, 6);
        }
    }, 500)

    return (
        <>
            <div className='pageSize-container'>
                <div className="my-3 add-new">
                    <span><b>List page size:</b></span>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add new page size</button>
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
                                    <span>Page size Name</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort("desc", "pageSizeName")}
                                        >
                                        </i>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort("asc", "pageSizeName")}
                                        >
                                        </i>
                                    </span>
                                </div>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listFileType && listFileType.length > 0 &&
                            listFileType.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.pageSizeName}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditFileType(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteFileType(item)}
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
                    handleUpdateTable={handleUpdateTable}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataFileTypeEdit={dataFileTypeEdit}
                    handleClose={handleClose}
                    handleEditFileTypeFromModal={handleEditFileTypeFromModal}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataFileTypeDelete={dataFileTypeDelete}
                    handleDeleteFileTypeFromModal={handleDeleteFileTypeFromModal}
                />
            </div>
        </>)
}

export default TablePageSize;