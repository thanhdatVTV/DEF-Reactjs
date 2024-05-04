import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { getListByMaSV } from '../../services/DangKyMonHocService';
import '../TableUser.scss';
import './MyCourse.scss';
import image1 from '../../assets/images/bg1.png';
import image2 from '../../assets/images/bg2.png';
import image3 from '../../assets/images/bg3.png';
import image4 from '../../assets/images/bg4.png';
import image5 from '../../assets/images/bg5.png';
import image6 from '../../assets/images/bg6.png';
import image7 from '../../assets/images/bg7.png';
import image8 from '../../assets/images/bg8.png';
import image9 from '../../assets/images/bg9.png';
import image10 from '../../assets/images/bg10.png';
import image11 from '../../assets/images/bg11.png';

const MyCourse = (props) => {
    const navigate = useNavigate();

    const [listHocKy, setListHocKy] = useState([]);

    const { user } = useContext(UserContext);

    const imageList = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

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

    const handleClickCard = (item) => {
        navigate(`/user/view-course/${item.id}`, { state: { TenMH: item.data.TenMH, MaMH: item.data.MaMH, NhomLop: item.data.NhomLop } });
    }

    return (
        <>
            <div className='EduProgram-container'>
                <div className='text-center'>
                    <h5><b>CÁC KHÓA HỌC CỦA TÔI</b></h5>
                </div>
                <div className="container card" style={{maxWidth: '80%'}}>
                    {
                        listHocKy && listHocKy.length > 0 &&
                        listHocKy.map((hocKy, index) => {
                            return (
                                <div className='m-4' key={index}>
                                    <div className="my-3">
                                        <span><b>Học Kỳ {hocKy.hocKy} Năm học {hocKy.hocKyData[0].data.NamHoc}</b></span>
                                    </div>

                                    <div className='row g-3'>
                                        {
                                            hocKy.hocKyData.map((item, index) => {
                                                return (
                                                    <div className="card col-4">
                                                        <img src={imageList[index]} className="card-img-top" alt=""/>
                                                        <div className="card-body">
                                                            <h5 className="card-title link-primary" onClick={() => handleClickCard(item)}>{item.data.TenMH}</h5>
                                                            <p className="card-text">({item.data.MaMH}) [{item.data.NhomLop}]</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default MyCourse;
