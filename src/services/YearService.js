import axios from "../services/customize-axios";

const getYearList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/Year/get-list`, {keyword, pageNumber, perPage})
}

const createYear = ({MaNamHoc, NamHoc}) => {
    return axios.post(`/api/Year/add-Year`, {MaNamHoc, NamHoc});
}

const updateYear = ({Id, MaNamHoc, NamHoc}) => {
    return axios.post(`/api/Year/update-Year`, {Id, MaNamHoc, NamHoc});
}

const deleteYear = (Id) => {
    return axios.post(`/api/Year/delete-Year`, {Id});
}

export { getYearList, createYear, updateYear, deleteYear };