import axios from "../services/customize-axios";

const getSemesterList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/Semester/get-list`, {keyword, pageNumber, perPage})
}

const createSemester = ({MaHocKy, HocKy}) => {
    return axios.post(`/api/Semester/add-Semester`, {MaHocKy, HocKy});
}

const updateSemester = ({Id, MaHocKy, HocKy}) => {
    return axios.post(`/api/Semester/update-Semester`, {Id, MaHocKy, HocKy});
}

const deleteSemester = (Id) => {
    return axios.post(`/api/Semester/delete-Semester`, {Id});
}

export { getSemesterList, createSemester, updateSemester, deleteSemester };