import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getDotDangKyList, createDotDangKy, updateDotDangKy, deleteDotDangKy } from '../../services/DotDangKyService';
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

    const [listDotDangKy, setListDotDangKy] = useState([]);
    const [totalDotDangKys, setTotalDotDangKys] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataDotDangKyEdit, setDataDotDangKyEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataDotDangKyDelete, setDataDotDangKyDelete] = useState({});

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

    const tableHeads = ['MaDDK', 'MoTa', 'NamHoc', 'HocKy', 'ThoiGianBatDau', 'ThoiGianKetThuc']

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleUpdateTable = () => {
        // setListDotDangKy([DotDangKy, ...listDotDangKy]);
        getDotDangKys("", 1, 6);
    }

    const handleEditDotDangKyFromModal = (DotDangKy) => {
        // let cloneListDotDangKys = _.cloneDeep(listDotDangKy);
        // let index = listDotDangKy.findIndex(item => item.id === DotDangKy.id);
        // cloneListDotDangKys[index].typeName = DotDangKy.typeName;
        // setListDotDangKy(cloneListDotDangKys);
        getDotDangKys("", 1, 6);
    }

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

    const handleEditDotDangKy = (DotDangKy) => {
        setDataDotDangKyEdit(DotDangKy);
        setIsShowModalEdit(true);
    }

    const handleDeleteDotDangKy = (DotDangKy) => {
        setIsShowModalDelete(true);
        setDataDotDangKyDelete(DotDangKy);
    }

    const handleDeleteDotDangKyFromModal = (DotDangKy) => {
        // let cloneListDotDangKys = _.cloneDeep(listDotDangKy);
        // cloneListDotDangKys = cloneListDotDangKys.filter(item => item.id !== DotDangKy.id);
        // setListDotDangKy(cloneListDotDangKys);
        getDotDangKys("", 1, 6);
        console.log('d1', listDotDangKy);

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
                    NhomLop: '',
                    CoSo: '',
                    ToaNha: '',
                    Phong: '',
                    TuanHoc: '',
                    Thu: '',
                    TietHoc: '',
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
            //navigate("/phancongmonhoc");
            navigate(`/phancongmonhoc/${item.id}`, { state: { MaDDK: item.id } });
        });
    }

    return (
        <>
            <div className='DotDangKy-container' style={{ margin: '3vw' }}>
                <div className="my-3 add-new">
                    <span><b>Danh sách đợt đăng ký</b></span>
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
                        {listDotDangKy && listDotDangKy.length > 0 &&
                            listDotDangKy.map((item) => {
                                // Kiểm tra thời gian hiện tại có nằm trong phạm vi từ ThoiGianBatDau đến ThoiGianKetThuc
                                const currentTime = new Date();
                                const startTime = new Date(item.data.ThoiGianBatDau);
                                const endTime = new Date(item.data.ThoiGianKetThuc);
                                const isTimeInRange = currentTime <= startTime;// && currentTime <= endTime;
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
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditDotDangKy(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger mx-3'
                                                onClick={() => handleDeleteDotDangKy(item)}
                                            >Delete
                                            </button>
                                            <button
                                                className='btn btn-info'
                                                onClick={() => handleDotDangKy(item)}
                                                disabled={!isTimeInRange}
                                            >Cấu hình</button>
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
                    dataEdit={dataDotDangKyEdit}
                    handleClose={handleClose}
                    handleEditFromModal={handleEditDotDangKyFromModal}
                    updateApi={updateDotDangKy}
                    title="Edit Enrollment"
                    successMessage='Update Enrollment successfully'
                    inputFields={inputFieldsEdit}
                />
                <ModalConfirm
                    show={isShowModalDelete}
                    handleClose={handleClose}
                    dataDelete={dataDotDangKyDelete}
                    handleDeleteFromModal={handleDeleteDotDangKyFromModal}
                    deleteApi={deleteDotDangKy}
                    title='Delete Enrollment'
                    successMessage='Delete Enrollment successfully'
                />
            </div>
        </>)
}

export default DotDangKy;