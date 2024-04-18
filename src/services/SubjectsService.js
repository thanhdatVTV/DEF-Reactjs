import axios from '../services/customize-axios';

const getSubjectList = (keyword, pageNumber, perPage) => {
  //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
  return axios.get(`/api/subjects/get-list`, { keyword, pageNumber, perPage });
};

const createSubjects = ({ MaMonHoc, TenMonHoc, PrerequisiteCourseID, SoTC }) => {
  return axios.post(`/api/subjects/add-subjects`, {
    MaMonHoc,
    TenMonHoc,
    PrerequisiteCourseID,
    SoTC,
  });
};

const updateSubjects = ({ Id, MaMonHoc, TenMonHoc, PrerequisiteCourseID, SoTC }) => {
  return axios.post(`/api/subjects/update-subject`, {
    Id,
    MaMonHoc,
    TenMonHoc,
    PrerequisiteCourseID,
    SoTC,
  });
};

const deleteSubjects = (Id) => {
  return axios.post(`/api/subjects/delete-subject`, { Id });
};

export { getSubjectList, createSubjects, updateSubjects, deleteSubjects };
