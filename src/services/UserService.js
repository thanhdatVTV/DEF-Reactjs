import axios from '../services/customize-axios';

const fetchAllUser = (keyword, pageNumber, perPage) => {
    return axios.get(`/api/User/get-list-user?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`);
}

const postCreateUser = (codeId, lastName, firstName, fullName, dateOfBirth, facultyName, courseName, type) => {
    return axios.post("/api/User", { codeId, lastName, firstName, fullName, dateOfBirth, facultyName, courseName, type });
}

const putUpdateUser = (name, job) => {
    return axios.post("/api/users/2", { name, job });
}

const deleteUser = (id) => {
    return axios.post(`/api/user/${id}`)
}

const loginApi = (username, password) => {
    return axios.get(`/api/User/login?userName=${username}&passWord=${password}`);
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi };