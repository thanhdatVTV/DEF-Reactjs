import axios from "../services/customize-axios";

const getDangKyMonHocList = (keyword, MaDDK, MaSV, pageNumber, perPage) => {
    console.log(`/api/dang-ky-mon-hoc/get-list?keyword=${keyword}&MaDDK=${MaDDK}&MaSV=${MaSV}&pageNumber=${pageNumber}&perPage=${perPage}`)
    //return axios.get(`/api/phan-cong-mon-hoc/get-list`, { keyword, MaDDK, pageNumber, perPage })
    return axios.get(`/api/dang-ky-mon-hoc/get-list?keyword=${keyword}&MaDDK=${MaDDK}&MaSV=${MaSV}&pageNumber=${pageNumber}&perPage=${perPage}`)
}

const getListByMaSV = (MaSV) => {
    //return axios.get(`/api/dang-ky-mon-hoc/get-list-by-ma-sv`, {MaSV});
    return axios.get(`/api/dang-ky-mon-hoc/get-list-by-ma-sv?MaSV=${MaSV}`);
}

const createDangKyMonHoc = ({ MaSV, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode }) => {
    console.log('logdata createDangKyMonHoc', MaSV, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode)
    return axios.post(`/api/dang-ky-mon-hoc/add-dang-ky-mon-hoc`, { MaSV, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode });
}

const updateDangKyMonHoc = ({ Id, MaSV, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode }) => {
    console.log('dddd', TuanHoc)
    return axios.post(`/api/dang-ky-mon-hoc/update-dang-ky-mon-hoc`, { Id, MaSV, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode });
}

const deleteDangKyMonHoc = (Id) => {
    return axios.post(`/api/dang-ky-mon-hoc/delete-dang-ky-mon-hoc`, { Id });
}

export { getDangKyMonHocList, getListByMaSV, createDangKyMonHoc, updateDangKyMonHoc, deleteDangKyMonHoc };

