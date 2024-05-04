import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getDotDangKyList } from '../../services/DotDangKyService';
import ReactPaginate from 'react-paginate';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import { useNavigate } from 'react-router-dom';

const DotDangKySinhVien = (props) => {

    const navigate = useNavigate();

    const [listDotDangKy, setListDotDangKy] = useState([]);
    const [totalDotDangKys, setTotalDotDangKys] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [dataDotDangKyEdit, setDataDotDangKyEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataDotDangKyDelete, setDataDotDangKyDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const tableHeads = ['MaDDK', 'MoTa', 'NamHoc', 'HocKy', 'ThoiGianBatDau', 'ThoiGianKetThuc']

    useEffect(() => {
        //call api
        getDotDangKys("", 1, 6);
    }, []);

    const getDotDangKys = async (keyword, pageNumber, perPage) => {

        let res = await getDotDangKyList(keyword, "", pageNumber, perPage);
        if (res && res.response) {
            setTotalDotDangKys(res.response.total)
            setTotalPages(res.response.totalPages)
            setListDotDangKy(res.response)
        }
    }

    const handlePageClick = (event) => {
        getDotDangKys("", +event.selected + 1, 6)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListDotDangKys = _.cloneDeep(listDotDangKy);
        cloneListDotDangKys = _.orderBy(cloneListDotDangKys, [sortField], [sortBy])
        setListDotDangKy(cloneListDotDangKys);
        console.log('d1', listDotDangKy);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListDotDangKys = _.cloneDeep(listDotDangKy);
            cloneListDotDangKys = cloneListDotDangKys.filter(item => {
                return (
                    item.data.MaDDK.includes(term) ||
                    item.data.NamHoc.includes(term) ||
                    item.data.MoTa.includes(term)
                    // Thêm các điều kiện khác nếu cần
                );
            });
            setListDotDangKy(cloneListDotDangKys);
        }
        else {
            getDotDangKys("", 1, 6);
        }
    }, 500)

    const handleDotDangKy = (item) => {
        navigate(`/dangkymonhoc/${item.id}`, { state: { MaDDK: item.id } });
    }

    return (
        <>
            <div className='DotDangKy-container' style={{ margin: '3vw' }}>
                <div class="box-header">
                    <h3 class="box-title">
                        DANH SÁCH ĐỢT ĐĂNG KÝ HIỆN TẠI
                    </h3>
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
                                <th>
                                    <div className='sort-header'>
                                        <span>{th}</span>
                                        <span>
                                            <i
                                                className="fa-solid fa-arrow-down-long"
                                                onClick={() => handleSort("desc", `${th}`)}
                                            >
                                            </i>
                                            <i
                                                className="fa-solid fa-arrow-up-long"
                                                onClick={() => handleSort("asc", `${th}`)}
                                            >
                                            </i>
                                        </span>
                                    </div>
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listDotDangKy && listDotDangKy.length > 0 &&
                            listDotDangKy.map((item) => {
                                // Kiểm tra thời gian hiện tại có nằm trong phạm vi từ ThoiGianBatDau đến ThoiGianKetThuc
                                const currentTime = new Date();
                                const startTime = new Date(item.data.ThoiGianBatDau);
                                const endTime = new Date(item.data.ThoiGianKetThuc);
                                const isTimeInRange = currentTime >= startTime && currentTime <= endTime;
                                return (
                                    <tr key={item.id}>
                                        {/* <td>{item.id}</td> */}
                                        <td>{item.data.MaDDK}</td>
                                        <td>{item.data.MoTa}</td>
                                        <td>{item.data.NamHoc}</td>
                                        <td>{item.data.HocKy}</td>
                                        <td>{item.data.ThoiGianBatDau}</td>
                                        <td>{item.data.ThoiGianKetThuc}</td>
                                        <td>
                                            <button
                                                className='btn btn-info'
                                                onClick={() => handleDotDangKy(item)}
                                                disabled={!isTimeInRange}
                                            >Chọn</button>
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
            </div>
        </>)
}

export default DotDangKySinhVien;