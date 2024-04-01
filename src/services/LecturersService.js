import axios from "../services/customize-axios";

const getLecturersList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
}

const createLecturers = (typeName) => {
    return axios.post(`/api/lecturers/add-lecturers?typeName=${typeName}`);
}

const updateLecturers = (id, typeName) => {
    return axios.post(`/api/lecturers/update-lecturer?id=${id}&typeName=${typeName}`);
}

const deleteLecturers = (id) => {
    return axios.post(`/api/lecturers/delete-lecturer?id=${id}`);
}

export { getLecturersList, createLecturers, updateLecturers, deleteLecturers };