import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {
  getSubjectList,
  createSubjects,
  updateSubjects,
  deleteSubjects,
} from '../../services/SubjectsService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './AddNew';
import ModalEdit from './Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss';
import _, { debounce } from 'lodash';
import './Subjects.scss';

const TableSubjects = (props) => {
  const [listSubjects, setListSubjects] = useState([]);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataSubjectsEdit, setDataSubjectsEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataSubjectsDelete, setDataSubjectsDelete] = useState({});

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');

  const [keyword, setKeyword] = useState('');

  const inputFieldsAddNew = [
    { name: 'MaMonHoc', label: 'Mã Môn Học', type: 'text' },
    { name: 'TenMonHoc', label: 'Tên Môn Học', type: 'text' },
    { name: 'PrerequisiteCourseID', label: 'Môn Học Tiên Quyết', type: 'text' },
    { name: 'SoTC', label: 'Số Tín Chỉ', type: 'text' },
  ];
  const inputFieldsEdit = [
    // { name: 'Id', label: 'Id', type: 'text' },
    { name: 'MaMonHoc', label: 'Mã Môn Học', type: 'text' },
    { name: 'TenMonHoc', label: 'Tên Môn Học', type: 'text' },
    { name: 'PrerequisiteCourseID', label: 'Môn Học Tiên Quyết', type: 'text' },
    { name: 'SoTC', label: 'Số Tín Chỉ', type: 'text' },
  ];

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = () => {
    // setListSubjects([Subjects, ...listSubjects]);
    getSubjects('', 1, 6);
  };

  const handleEditSubjectsFromModal = (Subjects) => {
    // let cloneListSubjectss = _.cloneDeep(listSubjects);
    // let index = listSubjects.findIndex(item => item.id === Subjects.id);
    // cloneListSubjectss[index].typeName = Subjects.typeName;
    // setListSubjects(cloneListSubjectss);
    getSubjects('', 1, 6);
  };

  useEffect(() => {
    //call api
    getSubjects('', 1, 6);
  }, []);

  const getSubjects = async (keyword, pageNumber, perPage) => {
    let res = await getSubjectList(keyword, pageNumber, perPage);
    console.log(res);
    console.log(res.response);
    if (res && res.response) {
      setTotalSubjects(res.response.total);
      setTotalPages(res.response.totalPages);
      setListSubjects(res.response);
    }
  };

  const handlePageClick = (event) => {
    getSubjects('', +event.selected + 1, 6);
  };

  const handleEditSubjects = (Subjects) => {
    setDataSubjectsEdit(Subjects);
    setIsShowModalEdit(true);
  };

  const handleDeleteSubjects = (Subjects) => {
    setIsShowModalDelete(true);
    setDataSubjectsDelete(Subjects);
  };

  const handleDeleteSubjectsFromModal = (Subjects) => {
    // let cloneListSubjectss = _.cloneDeep(listSubjects);
    // cloneListSubjectss = cloneListSubjectss.filter(item => item.id !== Subjects.id);
    // setListSubjects(cloneListSubjectss);
    getSubjects('', 1, 6);
    console.log('d1', listSubjects);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListSubjects = _.cloneDeep(listSubjects);
    cloneListSubjects = _.orderBy(cloneListSubjects, [sortField], [sortBy]);
    setListSubjects(cloneListSubjects);
    console.log('d1', listSubjects);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListSubjects = _.cloneDeep(listSubjects);
      cloneListSubjects = cloneListSubjects.filter((item) => {
        return (
          item.data.MaMonHoc.includes(term) ||
          item.data.TenMonHoc.includes(term) ||
          item.data.PrerequisiteCourseID.includes(term)
          // Thêm các điều kiện khác nếu cần
        );
      });
      setListSubjects(cloneListSubjects);
    } else {
      getSubjects('', 1, 6);
    }
  }, 500);

  return (
    <>
      <div className="Subjects-container">
        <div class="box-header">
          <h3 class="box-title">MÔN HỌC</h3>
        </div>
        <div className="my-3 add-new">
          <span>
            <b></b>
          </span>
          <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
            Thêm mới
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
              {/* <th>
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
              </th> */}
              <th>
                <div className="sort-header">
                  <span>Mã Môn Học</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'MaMonHoc')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'MaMonHoc')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Tên Môn Học</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'TenMonHoc')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'TenMonHoc')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Môn Học Tiên Quyết</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'PrerequisiteCourseID')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'PrerequisiteCourseID')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Số Tín Chỉ</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'SoTC')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'SoTC')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listSubjects &&
              listSubjects.length > 0 &&
              listSubjects.map((item, index) => {
                return (
                  <tr key={`users-${index}`}>
                    {/* <td>{item.id}</td> */}
                    <td>{item.data.MaMonHoc}</td>
                    <td>{item.data.TenMonHoc}</td>
                    <td>{item.data.PrerequisiteCourseID}</td>
                    <td>{item.data.SoTC}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleEditSubjects(item)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteSubjects(item)}>
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
          createApi={createSubjects}
          handleUpdateTable={handleUpdateTable}
          title="Thêm Môn Học Mới"
          buttonText="Xác nhận"
          successMessage="A new Subject is created successfully!"
          errorMessage="Failed to create Subject."
          inputFields={inputFieldsAddNew}
        />
        <ModalEdit
          show={isShowModalEdit}
          dataEdit={dataSubjectsEdit}
          handleClose={handleClose}
          handleEditFromModal={handleEditSubjectsFromModal}
          updateApi={updateSubjects}
          title="Edit Subject"
          successMessage="Update Subject successfully"
          inputFields={inputFieldsEdit}
        />
        <ModalConfirm
          show={isShowModalDelete}
          handleClose={handleClose}
          dataDelete={dataSubjectsDelete}
          handleDeleteFromModal={handleDeleteSubjectsFromModal}
          deleteApi={deleteSubjects}
          title="Delete Subject"
          successMessage="Delete Subject successfully"
        />
      </div>
    </>
  );
};

export default TableSubjects;
