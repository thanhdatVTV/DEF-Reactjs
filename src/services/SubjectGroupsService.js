import axios from '../services/customize-axios';

const getSubjectGroupList = (keyword, pageNumber, perPage) => {
  //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
  return axios.get(`/api/subjectgroups/get-list`, { keyword, pageNumber, perPage });
};

const createSubjectGroups = ({ SubjectGroupID, SubjectGroupName, SoTCYeuCau }) => {
  return axios.post(`/api/subjectgroups/add-subjectgroups`, {
    SubjectGroupID,
    SubjectGroupName,
    SoTCYeuCau,
  });
};

const updateSubjectGroups = ({ Id, SubjectGroupID, SubjectGroupName, SoTCYeuCau }) => {
  return axios.post(`/api/subjectgroups/update-subjectgroup`, {
    Id,
    SubjectGroupID,
    SubjectGroupName,
    SoTCYeuCau,
  });
};

const deleteSubjectGroups = (Id) => {
  return axios.post(`/api/subjectgroups/delete-subjectgroup`, { Id });
};

export { getSubjectGroupList, createSubjectGroups, updateSubjectGroups, deleteSubjectGroups };
