import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {
  getTestScheduleList,
  createTestSchedules,
  updateTestSchedules,
  deleteTestSchedules,
} from '../../services/TestSchedulesService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss';
import _, { debounce } from 'lodash';
import './TestSchedules.scss';

const TableTestSchedules = (props) => {
  const [listTestSchedules, setListTestSchedules] = useState([]);
  const [totalTestScheduless, setTotalTestScheduless] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataTestSchedulesEdit, setDataTestSchedulesEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataTestSchedulesDelete, setDataTestSchedulesDelete] = useState({});

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');

  const [keyword, setKeyword] = useState('');

  const inputFieldsAddNew = [
    { name: 'TenLichThi', label: 'TenLichThi', type: 'text' },
    { name: 'PhanCongMonHocId', label: 'PhanCongMonHocId', type: 'text' },
    { name: 'MaCS', label: 'MaCS', type: 'text' },
    { name: 'MaTN', label: 'MaTN', type: 'text' },
    { name: 'MaPhong', label: 'MaPhong', type: 'text' },
    { name: 'MaNhom', label: 'MaNhom', type: 'text' },
  ];
  const inputFieldsEdit = [
    { name: 'Id', label: 'ID', type: 'text' },
    { name: 'TenLichThi', label: 'TenLichThi', type: 'text' },
    { name: 'PhanCongMonHocId', label: 'PhanCongMonHocId', type: 'text' },
    { name: 'MaCS', label: 'MaCS', type: 'text' },
    { name: 'MaTN', label: 'MaTN', type: 'text' },
    { name: 'MaPhong', label: 'MaPhong', type: 'text' },
    { name: 'MaNhom', label: 'MaNhom', type: 'text' },
  ];

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = () => {
    // setListTestSchedules([TestSchedules, ...listTestSchedules]);
    getTestScheduless('', 1, 6);
  };

  const handleEditTestSchedulesFromModal = (TestSchedules) => {
    // let cloneListTestScheduless = _.cloneDeep(listTestSchedules);
    // let index = listTestSchedules.findIndex(item => item.id === TestSchedules.id);
    // cloneListTestScheduless[index].typeName = TestSchedules.typeName;
    // setListTestSchedules(cloneListTestScheduless);
    getTestScheduless('', 1, 6);
  };

  useEffect(() => {
    //call api
    getTestScheduless('', 1, 6);
  }, []);

  const getTestScheduless = async (keyword, pageNumber, perPage) => {
    let res = await getTestScheduleList(keyword, pageNumber, perPage);
    if (res && res.response) {
      setTotalTestScheduless(res.response.total);
      setTotalPages(res.response.totalPages);
      setListTestSchedules(res.response);
    }
  };

  const handlePageClick = (event) => {
    getTestScheduless('', +event.selected + 1, 6);
  };

  const handleEditTestSchedules = (TestSchedules) => {
    setDataTestSchedulesEdit(TestSchedules);
    setIsShowModalEdit(true);
  };

  const handleDeleteTestSchedules = (TestSchedules) => {
    setIsShowModalDelete(true);
    setDataTestSchedulesDelete(TestSchedules);
  };

  const handleDeleteTestSchedulesFromModal = (TestSchedules) => {
    // let cloneListTestScheduless = _.cloneDeep(listTestSchedules);
    // cloneListTestScheduless = cloneListTestScheduless.filter(item => item.id !== TestSchedules.id);
    // setListTestSchedules(cloneListTestScheduless);
    getTestScheduless('', 1, 6);
    console.log('d1', listTestSchedules);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListTestScheduless = _.cloneDeep(listTestSchedules);
    cloneListTestScheduless = _.orderBy(cloneListTestScheduless, [sortField], [sortBy]);
    setListTestSchedules(cloneListTestScheduless);
    console.log('d1', listTestSchedules);
  };

  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneListTestScheduless = _.cloneDeep(listTestSchedules);
      cloneListTestScheduless = cloneListTestScheduless.filter((item) =>
        item.typeName.includes(term)
      );
      setListTestSchedules(cloneListTestScheduless);
    } else {
      getTestScheduless('', 1, 6);
      console.log('d1', listTestSchedules);
    }
  }, 500);

  return (
    <>
      <div className="TestSchedules-container">
        <div className="my-3 add-new">
          <span>
            <b>Lịch thi:</b>
          </span>
          <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
            Thêm lịch thi mới
          </button>
        </div>
        <div className="col-4 my-3">
          <input
            className="form-control"
            placeholder="Search..."
            onChange={(event) => handleSearch(event)}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'id')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'id')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Tên Lịch Thi</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'TenLichThi')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'TenLichThi')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Phân công môn học ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'PhanCongMonHocId')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'PhanCongMonHocId')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Mã cơ sở</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'MaCS')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'MaCS')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Mã TN</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'MaTN')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'MaTN')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Mã phòng</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'MaPhong')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'MaPhong')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Mã nhóm</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'MaNhom')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'MaNhom')}
                    ></i>
                  </span>
                </div>
              </th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listTestSchedules &&
              listTestSchedules.length > 0 &&
              listTestSchedules.map((item, index) => {
                return (
                  <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.data.TenLichThi}</td>
                    <td>{item.data.PhanCongMonHocId}</td>
                    <td>{item.data.MaCS}</td>
                    <td>{item.data.MaTN}</td>
                    <td>{item.data.MaPhong}</td>
                    <td>{item.data.MaNhom}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleEditTestSchedules(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteTestSchedules(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
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
          activeClassName="active"
        />
        <ModalAddNew
          show={isShowModalAddNew}
          handleClose={handleClose}
          createApi={createTestSchedules}
          handleUpdateTable={handleUpdateTable}
          title="Add new TestSchedule"
          buttonText="Save changes"
          successMessage="A new TestSchedule is created successfully!"
          errorMessage="Failed to create TestSchedule."
          inputFields={inputFieldsAddNew}
        />
        <ModalEdit
          show={isShowModalEdit}
          dataEdit={dataTestSchedulesEdit}
          handleClose={handleClose}
          handleEditFromModal={handleEditTestSchedulesFromModal}
          updateApi={updateTestSchedules}
          title="Edit TestSchedule"
          successMessage="Update TestSchedule successfully"
          inputFields={inputFieldsEdit}
        />
        <ModalConfirm
          show={isShowModalDelete}
          handleClose={handleClose}
          dataDelete={dataTestSchedulesDelete}
          handleDeleteFromModal={handleDeleteTestSchedulesFromModal}
          deleteApi={deleteTestSchedules}
          title="Delete TestSchedule"
          successMessage="Delete TestSchedule successfully"
        />
      </div>
    </>
  );
};

export default TableTestSchedules;
