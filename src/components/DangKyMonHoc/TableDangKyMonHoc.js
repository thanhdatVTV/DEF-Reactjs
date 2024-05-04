import { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { getPhanCongMonHocList, updatePhanCongMonHoc } from '../../services/PhanCongMonHocService';
import { getDangKyMonHocList, createDangKyMonHoc } from '../../services/DangKyMonHocService';
import ReactPaginate from 'react-paginate';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import { useParams } from 'react-router-dom';
import { Form, Dropdown } from 'react-bootstrap';
import './TableDangKyMonHoc.scss';
import { toast } from "react-toastify";
import { UserContext } from '../context/UserContext';


const TableDangKyMonHoc = (props) => {
    const { user, logoutContext } = useContext(UserContext);

    const { MaDDK } = useParams();
    const [listPhanCongMonHoc, setListPhanCongMonHoc] = useState([]);
    const [totalPhanCongMonHocs, setTotalPhanCongMonHocs] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");

    const [updatedRecords, setUpdatedRecords] = useState([]); // Store updated records
    const [isDropdownChanged, setIsDropdownChanged] = useState(false); // Track dropdown changes


    //Môn học đã đăng ký 
    const [listMonHocDaDangKy, setListMonHocDaDangKy] = useState([]);

    const tableHeads = [
        'MaMH',
        'TenMH',
        'NamHoc',
        'HocKy',
        'NhomLop',
        'CoSo',
        'ToaNha',
        'Phong',
        'TuanHoc',
        'Thu',
        'TietHoc',
        'SiSo',
        'TeacherCode'
    ];

    const tableMonHocDaDangKyHeads = [
        'MaMH',
        'TenMH',
        'NamHoc',
        'HocKy',
        'NhomLop',
        'CoSo',
        'ToaNha',
        'Phong',
        'TuanHoc',
        'Thu',
        'TietHoc',
        'SiSo',
        'TeacherCode'
    ];

    useEffect(() => {
        getPhanCongMonHocs("", MaDDK, 1, 6);
        getMonHocDaDangKys("", MaDDK, user.account.codeId, 1, 10);
    }, [])

    const getPhanCongMonHocs = async (keyword, MaDDK, pageNumber, perPage) => {
        let res = await getPhanCongMonHocList(keyword, MaDDK, pageNumber, perPage);
        if (res && res.response) {
            setTotalPages(res.response.totalPages);
            setListPhanCongMonHoc(res.response);
        }
    };

    const getMonHocDaDangKys = async (keyword, MaDDK, MaSV, pageNumber, perPage) => {
        let res = await getDangKyMonHocList(keyword, MaDDK, MaSV, pageNumber, perPage);
        if (res && res.response) {
            setListMonHocDaDangKy(res.response);
        }
    };

    const handlePageClick = (event) => {
        getPhanCongMonHocs("", MaDDK, +event.selected + 1, 6)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListPhanCongMonHocs = _.cloneDeep(listPhanCongMonHoc);
        cloneListPhanCongMonHocs = _.orderBy(cloneListPhanCongMonHocs, [sortField], [sortBy])
        setListPhanCongMonHoc(cloneListPhanCongMonHocs);

    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListPhanCongMonHocs = _.cloneDeep(listPhanCongMonHoc);
            //cloneListPhanCongMonHocs = cloneListPhanCongMonHocs.filter(item => item.data.MaMH.includes(term))
            cloneListPhanCongMonHocs = cloneListPhanCongMonHocs.filter(item => {
                return (
                    item.data.MaMH.includes(term) ||
                    item.data.TenMH.includes(term)
                );
            });

            setListPhanCongMonHoc(cloneListPhanCongMonHocs);
        }
        else {
            getPhanCongMonHocs("", MaDDK, 1, 6);
        }
    }, 500)

    const handleSortMonHocDaDangKy = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListMonHocDaDangKys = _.cloneDeep(listMonHocDaDangKy);
        cloneListMonHocDaDangKys = _.orderBy(cloneListMonHocDaDangKys, [sortField], [sortBy])
        setListMonHocDaDangKy(cloneListMonHocDaDangKys);

    }

    const handleSearchMonHocDaDangKy = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListMonHocDaDangKys = _.cloneDeep(listMonHocDaDangKy);
            //cloneListPhanCongMonHocs = cloneListPhanCongMonHocs.filter(item => item.data.MaMH.includes(term))
            cloneListMonHocDaDangKys = cloneListMonHocDaDangKys.filter(item => {
                return (
                    item.data.MaMH.includes(term) ||
                    item.data.TenMH.includes(term)
                );
            });

            setListMonHocDaDangKy(cloneListMonHocDaDangKys);
        }
        else {
            getPhanCongMonHocs("", MaDDK, 1, 6);
        }
    }, 500)

    const generateWeekString = (selectedWeeks, tuanHoc) => {
        if (tuanHoc) {
            return tuanHoc;
        }

        if (!selectedWeeks || !Array.isArray(selectedWeeks)) {
            return '';
        }

        let weekString = '';
        for (let i = 0; i < selectedWeeks.length; i++) {
            weekString += selectedWeeks[i] ? i + 1 : '-';
        }
        return weekString;
    };

    const generateDayString = (selectedDays, thu) => {
        if (thu) {
            return thu;
        }

        if (!selectedDays || !Array.isArray(selectedDays)) {
            return '';
        }

        const daysOfWeek = ['2', '3', '4', '5', '6', '7', 'CN'];
        let dayString = '';
        for (let i = 0; i < selectedDays.length; i++) {
            dayString += selectedDays[i] ? daysOfWeek[i] + ' ' : '- ';
        }
        return dayString.trim();
    };

    const generateTietHocString = (selectedTietHocs, tietHoc) => {
        if (tietHoc) {
            return tietHoc;
        }

        if (!selectedTietHocs || !Array.isArray(selectedTietHocs)) {
            return '';
        }

        const tietsOfDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        let tietHocString = '';
        for (let i = 0; i < selectedTietHocs.length; i++) {
            tietHocString += selectedTietHocs[i] ? tietsOfDay[i] + ' ' : '- ';
        }
        return tietHocString.trim();
    };


    const handleChonMonHoc = async (item) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn Đăng ký môn này?");
        if (confirm) {
            try {
                // Sau khi copy thành công, làm mới danh sách
                let res = await createDangKyMonHoc({
                    MaSV: user.account.codeId,
                    MaDDK: item.data.MaDDK,
                    NganhHoc: item.data.NganhHoc,
                    MaMH: item.data.MaMH,
                    TenMH: item.data.TenMH,
                    NamHoc: item.data.NamHoc,
                    HocKy: item.data.HocKy,
                    NhomLop: item.data.NhomLop,
                    CoSo: item.data.CoSo,
                    ToaNha: item.data.ToaNha,
                    Phong: item.data.Phong,
                    TuanHoc: item.data.TuanHoc,
                    Thu: item.data.Thu,
                    TietHoc: item.data.TietHoc,
                    SiSo: item.data.SiSo,
                    TeacherCode: item.data.TeacherCode
                });
                console.log('dat', res);
                if (res && res.status) {
                    //success
                    toast.success("Đăng ký môn thành công.");
                    getPhanCongMonHocs("", MaDDK, 1, 6);
                }
                else {
                    //error
                    toast.error("Copy thất bại");
                }
            } catch (error) {
                console.error("Copy failed:", error);
            }
        }
    };

    return (
        <>
            <div className='PhanCongMonHoc-container'>
                <div className="my-3 add-new">
                    <span><b>Đợt đăng ký:</b> {MaDDK}</span>
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
                        {listPhanCongMonHoc && listPhanCongMonHoc.length > 0 &&
                            listPhanCongMonHoc.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.data.MaMH}</td>
                                        <td>{item.data.TenMH}</td>
                                        <td>{item.data.NamHoc}</td>
                                        <td>{item.data.HocKy}</td>
                                        <td>{item.data.NhomLop}</td>
                                        <td>{item.data.CoSo}</td>
                                        <td>{item.data.ToaNha}</td>
                                        <td>{item.data.Phong}</td>
                                        <td>
                                            {generateWeekString(item.data.TuanHoc[item.id], item.data.TuanHoc)}
                                        </td>
                                        <td>
                                            {generateDayString(item.data.Thu[item.id], item.data.Thu)}
                                        </td>
                                        <td>
                                            {generateTietHocString(item.data.TietHoc[item.id], item.data.TietHoc)}
                                        </td>
                                        <td>{item.data.SiSo}</td>
                                        <td>{item.data.TeacherCode}</td>
                                        <td>
                                            <button className='btn btn-warning mx-3' onClick={() => handleChonMonHoc(item)}>Chọn</button>
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



            <div className='MonHocDaDangKy-container'>
                <div className="my-3 add-new">
                    <span><b>Danh sách môn học đã đăng ký:</b></span>
                </div>
                <div className='col-4 my-3'>
                    <input
                        className='form-control'
                        placeholder='Search...'
                        onChange={(event) => handleSearchMonHocDaDangKy(event)}
                    />
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {tableMonHocDaDangKyHeads.map(th => (
                                <th key={th}>
                                    <div className='sort-header'>
                                        <span>{th}</span>
                                        <span>
                                            <i
                                                className="fa-solid fa-arrow-down-long"
                                                onClick={() => handleSortMonHocDaDangKy("desc", th)}
                                            >
                                            </i>
                                            <i
                                                className="fa-solid fa-arrow-up-long"
                                                onClick={() => handleSortMonHocDaDangKy("asc", th)}
                                            >
                                            </i>
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {listMonHocDaDangKy && listMonHocDaDangKy.length > 0 &&
                            listMonHocDaDangKy.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.data.MaMH}</td>
                                        <td>{item.data.TenMH}</td>
                                        <td>{item.data.NamHoc}</td>
                                        <td>{item.data.HocKy}</td>
                                        <td>{item.data.NhomLop}</td>
                                        <td>{item.data.CoSo}</td>
                                        <td>{item.data.ToaNha}</td>
                                        <td>{item.data.Phong}</td>
                                        <td>
                                            {generateWeekString(item.data.TuanHoc[item.id], item.data.TuanHoc)}
                                        </td>
                                        <td>
                                            {generateDayString(item.data.Thu[item.id], item.data.Thu)}
                                        </td>
                                        <td>
                                            {generateTietHocString(item.data.TietHoc[item.id], item.data.TietHoc)}
                                        </td>
                                        <td>{item.data.SiSo}</td>
                                        <td>{item.data.TeacherCode}</td>
                                        <td>
                                            <button className='btn btn-warning mx-3' onClick={() => handleChonMonHoc(item)}>Chọn</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>)
}

export default TableDangKyMonHoc;