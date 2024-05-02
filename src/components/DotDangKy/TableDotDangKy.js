import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getDotDangKys, createDotDangKy, updateDotDangKy, deleteDotDangKy } from '../../services/DotDangKyService';
import { getSubjectList } from '../../services/SubjectsService';
import { getPhanCongMonHocs, createPhanCongMonHoc, updatePhanCongMonHoc, deletePhanCongMonHoc } from '../../services/PhanCongMonHocService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './AddNew';
import ModalEdit from './Edit';
import ModalConfirm from './Confirm';
import '../TableUser.scss'
import _, { debounce } from "lodash";
import { useNavigate } from 'react-router-dom';


const DotDangKy = (props) => {

    const navigate = useNavigate();

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
        { name: "MaDDK", label: "Mã đợt đăng ký", type: "text" },
        { name: "MoTa", label: "Mô tả", type: "text" },
        { name: "NamHoc", label: "Năm học", type: "text" },
        { name: "HocKy", label: "Học kỳ", type: "text" },
        { name: "ThoiGianBatDau", label: "Thời gian bắt đầu", type: "text" },
        { name: "ThoiGianKetThuc", label: "Thời gian kết thúc", type: "text" },
    ];
    const inputFieldsEdit = [
        { name: "Id", label: "ID", type: "text" },
        { name: "MaDDK", label: "Mã đợt đăng ký", type: "text" },
        { name: "MoTa", label: "Mô tả", type: "text" },
        { name: "NamHoc", label: "Năm học", type: "text" },
        { name: "HocKy", label: "Học kỳ", type: "text" },
        { name: "ThoiGianBatDau", label: "Thời gian bắt đầu", type: "text" },
        { name: "ThoiGianKetThuc", label: "Thời gian kết thúc", type: "text" },
    ];

    const tableHeads = ['id', 'MaDDK', 'MoTa', 'NamHoc', 'HocKy', 'ThoiGianBatDau', 'ThoiGianKetThuc']

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

        let res = await getDotDangKys(keyword, pageNumber, perPage);
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

    const handleDotDangKy = (item) => {
        getSubjectList("", 1, 1000).then(subjectsResponse => {
            const subjects = subjectsResponse.response.map(subject => {
                return {
                    MaMH: subject.data.MaMonHoc,
                    TenMH: subject.data.TenMonHoc
                };
            }).filter(subject => subject.MaMH && subject.TenMH);
            // console.log("Subjects List", subjects);
            subjects.forEach(subject => {
                createPhanCongMonHoc({
                    MaDDK: item.id, 
                    NganhHoc: '', 
                    MaMH: subject.MaMH, 
                    TenMH: subject.TenMH, 
                    NamHoc: item.data.NamHoc, 
                    HocKy: item.data.HocKy, 
                    CoSo: '', 
                    ToaNha: '', 
                    Phong: '', 
                    TuanHocBatDau: '', 
                    TuanHocKetThuc: '', 
                    Thu: '', 
                    TietHocBatDau: '', 
                    TietHocKetThuc: '', 
                    SiSo: '', 
                    TeacherCode: '' 
                }).then(response => {
                    // console.log("PhanCongMonHoc created", response);
                }).catch(error => {
                    console.error("Error creating PhanCongMonHoc", error);
                });
            });
        }).catch(error => {
            console.error("Error fetching subjects", error);
        }).finally(() => {
            // Navigate to @TablePhanCongMonHoc after operations are completed
            navigate("/phancongmonhoc");
        });
    }

    return (
        <>
            <div className='Lecturers-container' style={{margin: '3vw'}}>
                <div className="my-3 add-new">
                    <span><b>Giảng viên:</b></span>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add new</button>
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
                        {listLecturers && listLecturers.length > 0 &&
                            listLecturers.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.data.MaDDK}</td>
                                        <td>{item.data.MoTa}</td>
                                        <td>{item.data.NamHoc}</td>
                                        <td>{item.data.HocKy}</td>
                                        <td>{item.data.ThoiGianBatDau}</td>
                                        <td>{item.data.ThoiGianKetThuc}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditLecturers(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger mx-3'
                                                onClick={() => handleDeleteLecturers(item)}
                                            >Delete
                                            </button>
                                            <button
                                                className='btn btn-info'
                                                onClick={() => handleDotDangKy(item)}
                                            >Xác nhận</button>
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
                    createApi={createDotDangKy}
                    handleUpdateTable={handleUpdateTable}
                    title="Thêm đợt đăng ký"
                    buttonText="Save changes"
                    successMessage="A new Enrollment is created successfully!"
                    errorMessage="Failed to create Enrollment."
                    inputFields={inputFieldsAddNew}
                />
                <ModalEdit
                    show={isShowModalEdit}
                    dataEdit={dataLecturersEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditLecturersFromModal}
                    updateApi={updateDotDangKy}
                    title="Edit Enrollment"
                    successMessage='Update Enrollment successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataLecturersDelete}
                    handleDeleteFromModal={handleDeleteLecturersFromModal}
                    deleteApi={deleteDotDangKy}
                    title='Delete Enrollment'
                    successMessage='Delete Enrollment successfully'
                />
            </div>
        </>)
}

export default DotDangKy;