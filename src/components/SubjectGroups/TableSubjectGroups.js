import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {
  getSubjectGroupList,
  createSubjectGroups,
  updateSubjectGroups,
  deleteSubjectGroups,
} from '../../services/SubjectGroupsService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../Modal/AddNew';
import ModalEdit from '../Modal/Edit';
import ModalConfirm from '../Modal/Confirm';
import '../TableUser.scss';
import _, { debounce } from 'lodash';
import './SubjectGroups.scss';

const TableSubjectGroups = (props) => {
  const [listSubjectGroups, setListSubjectGroups] = useState([]);
  const [totalSubjectGroups, setTotalSubjectGroups] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataSubjectGroupsEdit, setDataSubjectGroupsEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataSubjectGroupsDelete, setDataSubjectGroupsDelete] = useState({});

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');

  const [keyword, setKeyword] = useState('');

  const inputFieldsAddNew = [
    { name: 'SubjectGroupID', label: 'SubjectGroupID', type: 'text' },
    { name: 'SubjectGroupName', label: 'SubjectGroupName', type: 'text' },
    { name: 'SoTCYeuCau', label: 'SoTCYeuCau', type: 'text' },
  ];
  const inputFieldsEdit = [
    { name: 'Id', label: 'Id', type: 'text' },
    { name: 'SubjectGroupID', label: 'SubjectGroupID', type: 'text' },
    { name: 'SubjectGroupName', label: 'SubjectGroupName', type: 'text' },
    { name: 'SoTCYeuCau', label: 'SoTCYeuCau', type: 'text' },
  ];

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = () => {
    // setListSubjectGroups([SubjectGroups, ...listSubjectGroups]);
    getSubjectGroups('', 1, 6);
  };

  const handleEditSubjectGroupsFromModal = (SubjectGroups) => {
    // let cloneListSubjectGroupss = _.cloneDeep(listSubjectGroups);
    // let index = listSubjectGroups.findIndex(item => item.id === SubjectGroups.id);
    // cloneListSubjectGroupss[index].typeName = SubjectGroups.typeName;
    // setListSubjectGroups(cloneListSubjectGroupss);
    getSubjectGroups('', 1, 6);
  };

  useEffect(() => {
    //call api
    getSubjectGroups('', 1, 6);
  }, []);

  const getSubjectGroups = async (keyword, pageNumber, perPage) => {
    let res = await getSubjectGroupList(keyword, pageNumber, perPage);
    console.log(res);
    console.log(res.response);
    if (res && res.response) {
      setTotalSubjectGroups(res.response.total);
      setTotalPages(res.response.totalPages);
      setListSubjectGroups(res.response);
    }
  };

  const handlePageClick = (event) => {
    getSubjectGroups('', +event.selected + 1, 6);
  };

  const handleEditSubjectGroups = (SubjectGroups) => {
    setDataSubjectGroupsEdit(SubjectGroups);
    setIsShowModalEdit(true);
  };

  const handleDeleteSubjectGroups = (SubjectGroups) => {
    setIsShowModalDelete(true);
    setDataSubjectGroupsDelete(SubjectGroups);
  };

  const handleDeleteSubjectGroupsFromModal = (SubjectGroups) => {
    // let cloneListSubjectGroupss = _.cloneDeep(listSubjectGroups);
    // cloneListSubjectGroupss = cloneListSubjectGroupss.filter(item => item.id !== SubjectGroups.id);
    // setListSubjectGroups(cloneListSubjectGroupss);
    getSubjectGroups('', 1, 6);
    console.log('d1', listSubjectGroups);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListSubjectGroups = _.cloneDeep(listSubjectGroups);
    cloneListSubjectGroups = _.orderBy(cloneListSubjectGroups, [sortField], [sortBy]);
    setListSubjectGroups(cloneListSubjectGroups);
    console.log('d1', listSubjectGroups);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListSubjectGroups = _.cloneDeep(listSubjectGroups);
      cloneListSubjectGroups = cloneListSubjectGroups.filter(item => {
        return (
          item.data.SubjectGroupID.includes(term) ||
          item.data.SubjectGroupName.includes(term) ||
          item.data.SoTCYeuCau.includes(term)
          // Thêm các điều kiện khác nếu cần
        );
      });
      setListSubjectGroups(cloneListSubjectGroups);
    }
    else {
      getSubjectGroups("", 1, 6);
    }
  }, 500)

  return (
    <>
      <div className="SubjectGroups-container">
        <div class="box-header">
          <h3 class="box-title">
            NHÓM MÔN HỌC
          </h3>
        </div>
        <div className="my-3 add-new">
          <span>
            <b></b>
          </span>
          <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
            Thêm nhóm môn học mới
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
                  <span>Mã Nhóm Môn Học</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'SubjectGroupID')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'SubjectGroupID')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Tên Nhóm môn Học</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'SubjectGroupName')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'SubjectGroupName')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>
                <div className="sort-header">
                  <span>Số Tín Chỉ Yêu Cầu</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort('desc', 'SoTCYeuCau')}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort('asc', 'SoTCYeuCau')}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listSubjectGroups &&
              listSubjectGroups.length > 0 &&
              listSubjectGroups.map((item, index) => {
                return (
                  <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.data.SubjectGroupID}</td>
                    <td>{item.data.SubjectGroupName}</td>
                    <td>{item.data.SoTCYeuCau}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleEditSubjectGroups(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteSubjectGroups(item)}
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
          createApi={createSubjectGroups}
          handleUpdateTable={handleUpdateTable}
          title="Add new SubjectGroup"
          buttonText="Save changes"
          successMessage="A new SubjectGroup is created successfully!"
          errorMessage="Failed to create SubjectGroup."
          inputFields={inputFieldsAddNew}
        />
        <ModalEdit
          show={isShowModalEdit}
          dataEdit={dataSubjectGroupsEdit}
          handleClose={handleClose}
          handleEditFromModal={handleEditSubjectGroupsFromModal}
          updateApi={updateSubjectGroups}
          title="Edit SubjectGroup"
          successMessage="Update SubjectGroup successfully"
          inputFields={inputFieldsEdit}
        />
        <ModalConfirm
          show={isShowModalDelete}
          handleClose={handleClose}
          dataDelete={dataSubjectGroupsDelete}
          handleDeleteFromModal={handleDeleteSubjectGroupsFromModal}
          deleteApi={deleteSubjectGroups}
          title="Delete SubjectGroup"
          successMessage="Delete SubjectGroup successfully"
        />
      </div>
    </>
  );
};

export default TableSubjectGroups;
