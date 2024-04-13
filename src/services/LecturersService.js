import axios from "../services/customize-axios";

const getLecturersList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/lecturers/get-list`, {keyword, pageNumber, perPage})
}

const createLecturers = ({MaGV, TenGV}) => {
    return axios.post(`/api/lecturers/add-lecturers`, {MaGV, TenGV});
}

const updateLecturers = ({Id, MaGV, TenGV}) => {
    return axios.post(`/api/lecturers/update-lecturer`, {Id, MaGV, TenGV});
}

const deleteLecturers = (Id) => {
    return axios.post(`/api/lecturers/delete-lecturer`, {Id});
}

export { getLecturersList, createLecturers, updateLecturers, deleteLecturers };