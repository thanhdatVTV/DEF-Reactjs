import axios from "../services/customize-axios";

const getEduProgramList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/EducationProgram/get-list`, {keyword, pageNumber, perPage})
}

const createEduProgram = ({NganhId, TenNganh, MaMonHoc, TenMonHoc, GroupId, IsCompulsory}) => {
    return axios.post(`/api/EducationProgram/add-EducationProgram`, {NganhId, TenNganh, MaMonHoc, TenMonHoc, GroupId, IsCompulsory});
}

const updateEduProgram = ({Id, NganhId, TenNganh, MaMonHoc, TenMonHoc, GroupId, IsCompulsory}) => {
    return axios.post(`/api/EducationProgram/update-EducationProgram`, {Id, NganhId, TenNganh, MaMonHoc, TenMonHoc, GroupId, IsCompulsory});
}

const deleteEduProgram = (Id) => {
    return axios.post(`/api/EducationProgram/delete-EducationProgram`, {Id});
}

export { getEduProgramList, createEduProgram, updateEduProgram, deleteEduProgram };