import axios from "../services/customize-axios";

const getMajorList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/Major/get-list`, {keyword, pageNumber, perPage})
}

const createMajor = ({MaNganh, TenNganh}) => {
    return axios.post(`/api/Major/add-Major`, {MaNganh, TenNganh});
}

const updateMajor = ({Id, MaNganh, TenNganh}) => {
    return axios.post(`/api/Major/update-Major`, {Id, MaNganh, TenNganh});
}

const deleteMajor = (Id) => {
    return axios.post(`/api/Major/delete-Major`, {Id});
}

export { getMajorList, createMajor, updateMajor, deleteMajor };