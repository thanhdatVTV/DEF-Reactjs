import axios from "../services/customize-axios";

const getFacultyList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/Khoa/get-list`, {keyword, pageNumber, perPage})
}

const createFaculty = ({MaKhoa, TenKhoa}) => {
    return axios.post(`/api/Khoa/add-Khoa`, {MaKhoa, TenKhoa});
}

const updateFaculty = ({Id, MaKhoa, TenKhoa}) => {
    return axios.post(`/api/Khoa/update-Khoa`, {Id, MaKhoa, TenKhoa});
}

const deleteFaculty = (Id) => {
    return axios.post(`/api/Khoa/delete-Khoa`, {Id});
}

export { getFacultyList, createFaculty, updateFaculty, deleteFaculty };