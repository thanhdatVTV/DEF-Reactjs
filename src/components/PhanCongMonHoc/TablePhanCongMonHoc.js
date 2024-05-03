import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getPhanCongMonHocList, createPhanCongMonHoc, updatePhanCongMonHoc, deletePhanCongMonHoc } from '../../services/PhanCongMonHocService';
import { getCoSoList } from '../../services/CoSoService';
import { getBuildingList } from '../../services/BuildingService';
import { getRoomList } from '../../services/RoomService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import { useParams } from 'react-router-dom';
import { Form, Dropdown } from 'react-bootstrap';
import './TablePhanCongMonHoc.scss';


const TablePhanCongMonHoc = (props) => {
    const { MaDDK } = useParams();
    const [listPhanCongMonHoc, setListPhanCongMonHoc] = useState([]);
    const [totalPhanCongMonHocs, setTotalPhanCongMonHocs] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataPhanCongMonHocEdit, setDataPhanCongMonHocEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataPhanCongMonHocDelete, setDataPhanCongMonHocDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState("");
    const [listCoSo, setListCoSo] = useState([]);
    const [listToaNha, setListToaNha] = useState([]);
    const [listPhong, setListPhong] = useState([]);
    const [selectedWeeks, setSelectedWeeks] = useState({}); // State lưu trữ thông tin tuần được chọn cho mỗi hàng
    const [selectedDays, setSelectedDays] = useState({}); // State lưu trữ thông tin thứ được chọn cho mỗi hàng

    const [updatedRecords, setUpdatedRecords] = useState([]); // Store updated records
    const [isDropdownChanged, setIsDropdownChanged] = useState(false); // Track dropdown changes

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
        'TuanHoc',
        'Thu',
        'TietHoc',
        'SiSo',
        'TeacherCode'
    ];

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListPhanCongMonHoc([PhanCongMonHoc, ...listPhanCongMonHoc]);
        getPhanCongMonHocs("", MaDDK, 1, 6);
    }

    const handleEditPhanCongMonHocFromModal = (PhanCongMonHoc) => {
        // let cloneListPhanCongMonHocs = _.cloneDeep(listPhanCongMonHoc);
        // let index = listPhanCongMonHoc.findIndex(item => item.id === PhanCongMonHoc.id);
        // cloneListPhanCongMonHocs[index].typeName = PhanCongMonHoc.typeName;
        // setListPhanCongMonHoc(cloneListPhanCongMonHocs);
        getPhanCongMonHocs("", MaDDK, 1, 6);
    }

    useEffect(() => {
        getPhanCongMonHocs("", MaDDK, 1, 6);
        getCoSos("", 1, 20);
        getToaNhas("", 1, 20);
        getToaPhongs("", 1, 20);
    }, [])

    // const getPhanCongMonHocs = async (keyword, MaDDK, pageNumber, perPage) => {
    //     let res = await getPhanCongMonHocList(keyword, MaDDK, pageNumber, perPage);
    //     console.log('MaDDK', res.response);
    //     if (res && res.response) {
    //         setTotalPhanCongMonHocs(res.response.total)
    //         setTotalPages(res.response.totalPages)
    //         setListPhanCongMonHoc(res.response)
    //     }
    // }

    const getPhanCongMonHocs = async (keyword, MaDDK, pageNumber, perPage) => {
        let res = await getPhanCongMonHocList(keyword, MaDDK, pageNumber, perPage);
        if (res && res.response) {
            setTotalPages(res.response.totalPages);
            setListPhanCongMonHoc(res.response);
            // Khởi tạo state cho selectedWeeks với giá trị mặc định là mỗi hàng đều không có tuần nào được chọn
            let initialSelectedWeeks = {};
            res.response.forEach(item => {
                initialSelectedWeeks[item.id] = new Array(52).fill(false);
            });

            // Khởi tạo state cho selectedDays với giá trị mặc định là mỗi hàng đều không có tuần nào được chọn
            let initialSelectedDays = {};
            res.response.forEach(item => {
                initialSelectedDays[item.id] = new Array(7).fill(false);
            });
            setSelectedWeeks(initialSelectedWeeks);
            setSelectedDays(initialSelectedDays);
        }
    };

    const getCoSos = async (keyword, pageNumber, perPage) => {
        let res = await getCoSoList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setListCoSo(res.response)
        }
    }

    const getToaNhas = async (keyword, pageNumber, perPage) => {
        let res = await getBuildingList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setListToaNha(res.response)
        }
    }

    const getToaPhongs = async (keyword, pageNumber, perPage) => {
        let res = await getRoomList(keyword, pageNumber, perPage);
        if (res && res.response) {
            setListPhong(res.response)
        }
    }

    const handlePageClick = (event) => {
        getPhanCongMonHocs("", MaDDK, +event.selected + 1, 6)
    }

    const handleEditPhanCongMonHoc = (PhanCongMonHoc) => {
        setDataPhanCongMonHocEdit(PhanCongMonHoc);
        setIsShowModalEdit(true);
    }

    const handleDeletePhanCongMonHoc = (PhanCongMonHoc) => {
        setIsShowModalDelete(true);
        setDataPhanCongMonHocDelete(PhanCongMonHoc);
    }

    const handleDeletePhanCongMonHocFromModal = (PhanCongMonHoc) => {
        // let cloneListPhanCongMonHocs = _.cloneDeep(listPhanCongMonHoc);
        // cloneListPhanCongMonHocs = cloneListPhanCongMonHocs.filter(item => item.id !== PhanCongMonHoc.id);
        // setListPhanCongMonHoc(cloneListPhanCongMonHocs);
        getPhanCongMonHocs("", MaDDK, 1, 6);

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
            cloneListPhanCongMonHocs = cloneListPhanCongMonHocs.filter(item => item.typeName.includes(term))
            setListPhanCongMonHoc(cloneListPhanCongMonHocs);
        }
        else {
            getPhanCongMonHocs("", MaDDK, 1, 6);
        }
    }, 500)

    // Cập nhật handleEditField để lưu trữ id cùng với dữ liệu đã thay đổi
    const handleEditField = (index, field, value) => {
        let updatedRecord = { ...listPhanCongMonHoc[index] };
        console.log('updatedRecord', updatedRecord);
        updatedRecord.data[field] = value;
        setListPhanCongMonHoc(prevState => {
            let newState = [...prevState];
            newState[index] = updatedRecord;
            return newState;
        });
        setIsDropdownChanged(true); // Set dropdown changed flag
        setUpdatedRecords(prevState => {
            let newRecords = [...prevState];
            if (!newRecords.includes(updatedRecord)) {
                newRecords.push(updatedRecord);
            }
            return newRecords;
        });
    };

    const handleUpdateRecords = async () => {
        // Call API to update all records
        await Promise.all(updatedRecords.map(async record => {
            updatePhanCongMonHoc({
                Id: record.id,
                MaDDK: record.data.MaDDK,
                NganhHoc: record.data.NganhHoc,
                MaMH: record.data.MaMH,
                TenMH: record.data.TenMH,
                NamHoc: record.data.NamHoc,
                HocKy: record.data.HocKy,
                CoSo: record.data.CoSo,
                ToaNha: record.data.ToaNha,
                Phong: record.data.Phong,
                TuanHoc: record.data.TuanHoc,
                Thu: record.data.Thu,
                TietHoc: record.data.TietHoc,
                SiSo: record.data.SiSo,
                TeacherCode: record.data.TeacherCode
            }).then(response => {
                getPhanCongMonHocs("", MaDDK, 1, 6);
            }).catch(error => {
                console.error("Error creating PhanCongMonHoc", error);
            });
            //await updatePhanCongMonHoc(record.data); // Assuming API function to update record
            //console.log(record);
        }));
        setIsDropdownChanged(false);
        setUpdatedRecords([]);
    };

    const handleWeekSelect = (id, index, indexItem) => {
        setSelectedWeeks((selectedWeeks) => {
            const updatedSelectedWeeks = { ...selectedWeeks };
            updatedSelectedWeeks[id] = updatedSelectedWeeks[id].map((week, i) => {
                if (i === index) {
                    return !week; // Đảo trạng thái của tuần được chọn
                }
                return week; // Giữ nguyên trạng thái của các tuần khác
            });
            setIsDropdownChanged(true);
            // Lưu giá trị của tuần học vào biến TuanHoc
            const weekString = generateWeekString(updatedSelectedWeeks[id]);
            handleEditField(indexItem, 'TuanHoc', weekString);
            console.log('weekString', weekString);
            return updatedSelectedWeeks;
        });
    };

    const handleDaySelect = (id, index, indexItem) => {
        setSelectedDays((selectedDays) => {
            const updatedSelectedDays = { ...selectedDays };
            updatedSelectedDays[id] = updatedSelectedDays[id].map((selected, i) => {
                if (i === index) {
                    return !selected; // Đảo trạng thái của thứ được chọn
                }
                return selected; // Giữ nguyên trạng thái của các thứ khác
            });
            setIsDropdownChanged(true);
            // Lưu giá trị của thứ vào biến Thu
            const dayString = generateDayString(updatedSelectedDays[id]);
            handleEditField(indexItem, 'Thu', dayString);
            return updatedSelectedDays;
        });
    };

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

    const weekDropdown = (id, indexItem) => (
        <Dropdown.Menu className="multi-column-dropdown">
            <div className="dropdown-columns">
                {selectedWeeks[id] && selectedWeeks[id].map((week, index) => (
                    <Form.Check
                        key={index}
                        inline
                        label={`Tuần ${index + 1}`}
                        type="checkbox"
                        checked={week}
                        onChange={() => handleWeekSelect(id, index, indexItem)}
                    />
                ))}
            </div>
        </Dropdown.Menu>
    );

    const dayDropdown = (id, indexItem) => (
        <Dropdown.Menu className="multi-column-dropdown">
            <div className="dropdown-columns">
                {selectedDays[id] && selectedDays[id].map((selected, index) => (
                    <Form.Check
                        key={index}
                        inline
                        label={`Thứ ${index + 2}`}
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleDaySelect(id, index, indexItem)}
                    />
                ))}
            </div>
        </Dropdown.Menu>
    );

    return (
        <>
            <div className='PhanCongMonHoc-container'>
                <div className="my-3 add-new">
                    <span><b>Đợt đăng ký:</b> {MaDDK}</span>
                    {isDropdownChanged && (
                        <button className='btn btn-primary ml-3' onClick={handleUpdateRecords}>Xác nhận</button>
                    )}
                    {/* <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add new file type</button> */}
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
                                        {/* <td style={{ display: 'none' }} id={`${item.id}`}>{item.id}</td> */}
                                        <td>{item.data.MaMH}</td>
                                        <td>{item.data.TenMH}</td>
                                        <td>{item.data.NamHoc}</td>
                                        <td>{item.data.HocKy}</td>
                                        <td>
                                            <select
                                                className="form-control"
                                                value={item.data.CoSo}
                                                onChange={(e) => handleEditField(index, 'CoSo', e.target.value)}
                                            >
                                                <option value="">None</option>
                                                {listCoSo.map((coso) => (
                                                    <option key={coso.id} value={coso.data.MaCS}>
                                                        {coso.data.TenCS}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        {/* <td>{item.data.ToaNha}</td> */}
                                        <td>
                                            <select
                                                className="form-control"
                                                value={item.data.ToaNha}
                                                onChange={(e) => handleEditField(index, 'ToaNha', e.target.value)}
                                            >
                                                <option value="">None</option>
                                                {listToaNha.map((toaNha) => (
                                                    <option key={toaNha.id} value={toaNha.data.TenTN}>
                                                        {toaNha.data.TenTN}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        {/* <td>{item.data.Phong}</td> */}
                                        <td>
                                            <select
                                                className="form-control"
                                                value={item.data.Phong}
                                                onChange={(e) => handleEditField(index, 'Phong', e.target.value)}
                                            >
                                                <option value="">None</option>
                                                {listPhong.map((phong) => (
                                                    <option key={phong.id} value={phong.data.TenPhong}>
                                                        {phong.data.TenPhong}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        {/* item.data.TuanHoc */}
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" id={`dropdown-week-${index}`}>
                                                    Chọn tuần
                                                </Dropdown.Toggle>
                                                {weekDropdown(item.id, index)}
                                            </Dropdown>
                                            {generateWeekString(item.data.TuanHoc[item.id], item.data.TuanHoc)}
                                        </td>
                                        {/* <td>{item.data.Thu}</td> */}
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" id={`dropdown-day-${index}`}>
                                                    Chọn thứ
                                                </Dropdown.Toggle>
                                                {dayDropdown(item.id, index)}
                                            </Dropdown>
                                            {generateDayString(item.data.Thu[item.id], item.data.Thu)}
                                        </td>
                                        <td>{item.data.TietHoc}</td>
                                        <td>{item.data.SiSo}</td>
                                        <td>{item.data.TeacherCode}</td>
                                        {/* <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditPhanCongMonHoc(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeletePhanCongMonHoc(item)}
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
                    // createApi={createPhanCongMonHoc}
                    handleUpdateTable={handleUpdateTable}
                    title="Add new Lecturer"
                    buttonText="Save changes"
                    successMessage="A new Lecturer is created successfully!"
                    errorMessage="Failed to create Lecturer."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataPhanCongMonHocEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditPhanCongMonHocFromModal}
                    // updateApi={updatePhanCongMonHoc}
                    title="Edit Lecturer"
                    successMessage='Update lecturer successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataPhanCongMonHocDelete}
                    handleDeleteFromModal={handleDeletePhanCongMonHocFromModal}
                    // deleteApi={deletePhanCongMonHoc}
                    title='Delete Lecturer'
                    successMessage='Delete Lecturer successfully'
                />
            </div>
        </>)
}

export default TablePhanCongMonHoc;