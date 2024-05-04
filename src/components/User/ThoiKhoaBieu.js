import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Table from 'react-bootstrap/Table';
import { getListByMaSV } from '../../services/DangKyMonHocService';
import '../TableUser.scss';

const ThoiKhoaBieu = (props) => {
    const [listHocKy, setListHocKy] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getListByMaSV(user.account.maSV);
                if (res && res.response) {
                    const hocKySorted = res.response.reduce((acc, curr) => {
                        if (acc[curr.data.HocKy]) {
                            acc[curr.data.HocKy].push(curr);
                        } else {
                            acc[curr.data.HocKy] = [curr];
                        }
                        return acc;
                    }, {});
                    const listByHocKy = Object.entries(hocKySorted).map(([key, value]) => ({
                        hocKy: key,
                        hocKyData: value
                    }));

                    setListHocKy(listByHocKy);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [user.account.maSV]);

    return (
        <>
            <div className='EduProgram-container'>
                <div className="my-3">
                    <span><b>THỜI KHÓA BIỂU</b></span>
                </div>
                {
                    listHocKy && listHocKy.length > 0 &&
                    listHocKy.map((hocKy, index) => {
                        return (
                            <div key={index}>
                                <div className="my-3">
                                    <span><b>Học Kỳ {hocKy.hocKy} Năm học {hocKy.hocKyData[0].data.NamHoc}</b></span>
                                </div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Mã MH</th>
                                            <th>Tên môn học</th>
                                            <th>Nhóm - tổ</th>
                                            <th>Thứ</th>
                                            <th>Tiết</th>
                                            <th>Cơ sở</th>
                                            <th>Phòng</th>
                                            <th>Tuần học</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hocKy.hocKyData.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.data.MaMH}</td>
                                                <td>{data.data.TenMH}</td>
                                                <td>{data.data.NhomLop}</td>
                                                <td>{data.data.Thu}</td>
                                                <td>{data.data.TietHoc}</td>
                                                <td>{data.data.CoSo}</td>
                                                <td>{`${data.data.ToaNha}-${data.data.Phong}`}</td>
                                                <td>{data.data.TuanHoc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ThoiKhoaBieu;
