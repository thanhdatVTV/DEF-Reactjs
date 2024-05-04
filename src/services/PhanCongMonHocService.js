import axios from "../services/customize-axios";

const getPhanCongMonHocList = (keyword, MaDDK, pageNumber, perPage) => {
    console.log(`/api/phan-cong-mon-hoc/get-list?keyword=${keyword}&MaDDK=${MaDDK}&pageNumber=${pageNumber}&perPage=${perPage}`)
    //return axios.get(`/api/phan-cong-mon-hoc/get-list`, { keyword, MaDDK, pageNumber, perPage })
    return axios.get(`/api/phan-cong-mon-hoc/get-list?keyword=${keyword}&MaDDK=${MaDDK}&pageNumber=${pageNumber}&perPage=${perPage}`)
}

const createPhanCongMonHoc = ({ MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode }) => {
    return axios.post(`/api/phan-cong-mon-hoc/add-phan-cong-mon-hoc`, { MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode });
}

const updatePhanCongMonHoc = ({ Id, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode }) => {
    console.log('dddd', TuanHoc)
    return axios.post(`/api/phan-cong-mon-hoc/update-phan-cong-mon-hoc`, { Id, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, NhomLop, CoSo, ToaNha, Phong, TuanHoc, Thu, TietHoc, SiSo, TeacherCode });
}

const deletePhanCongMonHoc = (Id) => {
    return axios.post(`/api/phan-cong-mon-hoc/delete-phan-cong-mon-hoc`, { Id });
}

export { getPhanCongMonHocList, createPhanCongMonHoc, updatePhanCongMonHoc, deletePhanCongMonHoc };