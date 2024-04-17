import axios from "../services/customize-axios";

const getNhomLopList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/NhomLop/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/nhom-lop/get-list`, {keyword, pageNumber, perPage})
}

const createNhomLop = ({MaHK, MaNhom, TenNhom, MaMH}) => {
    return axios.post(`/api/nhom-lop/add-nhom-lop`, {MaHK, MaNhom, TenNhom, MaMH});
}

const updateNhomLop = ({Id, MaHK, MaNhom, TenNhom, MaMH}) => {
    return axios.post(`/api/nhom-lop/update-nhom-lop`, {Id, MaHK, MaNhom, TenNhom, MaMH});
}

const deleteNhomLop = (Id) => {
    return axios.post(`/api/nhom-lop/delete-nhom-lop`, {Id});
}

export { getNhomLopList, createNhomLop, updateNhomLop, deleteNhomLop };