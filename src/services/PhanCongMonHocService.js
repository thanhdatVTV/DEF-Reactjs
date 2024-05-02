import axios from "../services/customize-axios";

const getPhanCongMonHocs = (keyword, pageNumber, perPage) => {
    return axios.get(`/api/phan-cong-mon-hoc/get-list`, {keyword, pageNumber, perPage})
}

const createPhanCongMonHoc = ({MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, CoSo, ToaNha, Phong, TuanHocBatDau, TuanHocKetThuc, Thu, TietHocBatDau, TietHocKetThuc, SiSo, TeacherCode}) => {
    return axios.post(`/api/phan-cong-mon-hoc/add-phan-cong-mon-hoc`, {MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, CoSo, ToaNha, Phong, TuanHocBatDau, TuanHocKetThuc, Thu, TietHocBatDau, TietHocKetThuc, SiSo, TeacherCode});
}

const updatePhanCongMonHoc = ({Id, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, CoSo, ToaNha, Phong, TuanHocBatDau, TuanHocKetThuc, Thu, TietHocBatDau, TietHocKetThuc, SiSo, TeacherCode}) => {
    return axios.post(`/api/phan-cong-mon-hoc/update-phan-cong-mon-hoc`, {Id, MaDDK, NganhHoc, MaMH, TenMH, NamHoc, HocKy, CoSo, ToaNha, Phong, TuanHocBatDau, TuanHocKetThuc, Thu, TietHocBatDau, TietHocKetThuc, SiSo, TeacherCode});
}

const deletePhanCongMonHoc = (Id) => {
    return axios.post(`/api/phan-cong-mon-hoc/delete-phan-cong-mon-hoc`, {Id});
}

export { getPhanCongMonHocs, createPhanCongMonHoc, updatePhanCongMonHoc, deletePhanCongMonHoc };