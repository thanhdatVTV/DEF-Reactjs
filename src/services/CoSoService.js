import axios from "../services/customize-axios";

const getCoSoList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    //return axios.get(`/api/co-so/get-list`, {keyword, pageNumber, perPage})
    return axios.get(`/api/co-so/get-list?keyword=${keyword}&pageNumber=${pageNumber}&perPage=${perPage}`)
}

const createCoSo = ({ MaCS, TenCS }) => {
    return axios.post(`/api/co-so/add-co-so`, { MaCS, TenCS });
}

const updateCoSo = ({ Id, MaCS, TenCS }) => {
    return axios.post(`/api/co-so/update-co-so`, { Id, MaCS, TenCS });
}

const deleteCoSo = (Id) => {
    return axios.post(`/api/co-so/delete-co-so`, { Id });
}

export { getCoSoList, createCoSo, updateCoSo, deleteCoSo };