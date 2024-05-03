import axios from "../services/customize-axios";

const getDotDangKyList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/dot-dang-ky/get-list`, { keyword, pageNumber, perPage })
}

const createDotDangKy = ({ MaDDK, MoTa, NamHoc, HocKy, ThoiGianBatDau, ThoiGianKetThuc }) => {
    return axios.post(`/api/dot-dang-ky/add-dot-dang-ky`, { MaDDK, MoTa, NamHoc, HocKy, ThoiGianBatDau, ThoiGianKetThuc });
}

const updateDotDangKy = ({ Id, MaDDK, MoTa, NamHoc, HocKy, ThoiGianBatDau, ThoiGianKetThuc }) => {
    return axios.post(`/api/dot-dang-ky/update-dot-dang-ky`, { Id, MaDDK, MoTa, NamHoc, HocKy, ThoiGianBatDau, ThoiGianKetThuc });
}

const deleteDotDangKy = (Id) => {
    return axios.post(`/api/dot-dang-ky/delete-dot-dang-ky`, { Id });
}

export { getDotDangKyList, createDotDangKy, updateDotDangKy, deleteDotDangKy };