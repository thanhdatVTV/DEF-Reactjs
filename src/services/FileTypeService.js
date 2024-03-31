import axios from "../services/customize-axios";

const getFileTypeList = (keyword, pageNumber, perPage) => {
    console.log('keyword, pageNumber, perPage', `/api/FileType/get-list-file-type?keyword=${keyword}&page=${pageNumber}&per_page=${perPage}`);
    return axios.get(`/api/FileType/get-list-file-type?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
}

const createFileType = (typeName) => {
    return axios.post(`/api/FileType/create-file-type?typeName=${typeName}`);
}

const updateFileType = (id, typeName) => {
    return axios.post(`/api/FileType/update-file-type?id=${id}&typeName=${typeName}`);
}

const deleteFileType = (id) => {
    return axios.post(`/api/FileType/delete-file-type?id=${id}`);
}

export { getFileTypeList, createFileType, updateFileType, deleteFileType };