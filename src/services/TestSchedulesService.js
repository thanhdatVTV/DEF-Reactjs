import axios from '../services/customize-axios';

const getTestScheduleList = (keyword, pageNumber, perPage) => {
  //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
  return axios.get(`/api/testschedules/get-list`, { keyword, pageNumber, perPage });
};

const createTestSchedules = ({ TenLichThi, PhanCongMonHocId, MaCS, MaTN, MaPhong, MaNhom }) => {
  return axios.post(`/api/testschedules/add-testschedules`, {
    TenLichThi,
    PhanCongMonHocId,
    MaCS,
    MaTN,
    MaPhong,
    MaNhom,
  });
};

const updateTestSchedules = ({ Id, TenLichThi, PhanCongMonHocId, MaCS, MaTN, MaPhong, MaNhom }) => {
  return axios.post(`/api/testschedules/update-testschedules`, {
    Id,
    TenLichThi,
    PhanCongMonHocId,
    MaCS,
    MaTN,
    MaPhong,
    MaNhom,
  });
};

const deleteTestSchedules = (Id) => {
  return axios.post(`/api/testschedules/delete-testschedules`, { Id });
};

export { getTestScheduleList, createTestSchedules, updateTestSchedules, deleteTestSchedules };
