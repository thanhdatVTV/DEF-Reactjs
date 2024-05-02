import axios from "../services/customize-axios";

const getRoomList = (keyword, pageNumber, perPage) => {
    //console.log("ddddddd", `/api/lecturers/get-list?keyword=${keyword}&pageNumber=${pageNumber}&per_page=${perPage}`)
    return axios.get(`/api/phong/get-list`, {keyword, pageNumber, perPage})
}

const createRoom = ({MaPhong, TenPhong, ToaNhaId, TenTN}) => {
    return axios.post(`/api/phong/add-phong`, {MaPhong, TenPhong, ToaNhaId, TenTN});
}

const updateRoom = ({Id, MaPhong, TenPhong, ToaNhaId, TenTN}) => {
    return axios.post(`/api/phong/update-phong`, {Id, MaPhong, TenPhong, ToaNhaId, TenTN});
}

const deleteRoom = (Id) => {
    return axios.post(`/api/phong/delete-phong`, {Id});
}

export { getRoomList, createRoom, updateRoom, deleteRoom };

