import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Table from 'react-bootstrap/Table';
import { getListByMajor } from '../../services/EduProgramService';
import '../TableUser.scss';

const UserEduProgram = (props) => {
    const [listBatBuoc, setListBatBuoc] = useState([]);
    const [listBatBuocCN, setListBatBuocCN] = useState([
        {
            data: {
                TenMonHoc: 'Tự chọn tự do (Tối thiểu 9 TC)',
                SoTC: 9,
                GroupId: 'BatBuocCN'
            }
        },
        {
            data: {
                TenMonHoc: 'Các môn tự chọn nhóm A (Tối thiểu 1 TC)',
                SoTC: 1,
                GroupId: 'BatBuocCN'
            }
        },
        {
            data: {
                TenMonHoc: 'Các môn tự chọn nhóm B (Tối thiểu 1 TC)',
                SoTC: 1,
                GroupId: 'BatBuocCN'
            }
        },
        {
            data: {
                TenMonHoc: 'Các môn tự chọn nhóm C (Tối thiểu 15 TC)',
                SoTC: 15,
                GroupId: 'BatBuocCN'
            }
        },
        {
            data: {
                TenMonHoc: 'Các môn tự chọn nhóm D (Tối thiểu 3 TC)',
                SoTC: 3,
                GroupId: 'BatBuocCN'
            }
        }
    ]);
    const [listA, setListA] = useState([]);
    const [listB, setListB] = useState([]);
    const [listC, setListC] = useState([]);
    const [listD, setListD] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getListByMajor(user.account.majorName);
                console.log(res)
                if (res && res.response) {
                    setListBatBuoc(res.response.filter(item => item.data.GroupId === 'BatBuoc'));
                    setListBatBuocCN(prev => [...prev, ...res.response.filter(item => item.data.GroupId === 'BatBuocCN')]);
                    setListA(res.response.filter(item => item.data.GroupId === 'A'));
                    setListB(res.response.filter(item => item.data.GroupId === 'B'));
                    setListC(res.response.filter(item => item.data.GroupId === 'C'));
                    setListD(res.response.filter(item => item.data.GroupId === 'D'));
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [user.account.majorName]);

    return (
        <>
            <div className='EduProgram-container'>
                <div className="my-3">
                    <span><b>CHƯƠNG TRÌNH ĐÀO TẠO</b></span>
                </div>
                <div className="my-3">
                    <span><b>Ngành: {user.account.majorName} - 128.0 Tín chỉ</b></span>
                </div>
                <div className="my-3">
                    <span><b>I. Các môn bắt buộc</b></span>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '4%' }}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listBatBuoc && listBatBuoc.length > 0 &&
                            listBatBuoc.map((item, index) => {
                                return (
                                    <tr key={`users-${item.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.data.MaMonHoc}</td>
                                        <td>{item.data.TenMonHoc}</td>
                                        <td>{item.data.SoTC}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>



                <div className="my-3">
                    <span><b>II. Các môn bắt buộc và tự chọn của chuyên ngành</b></span>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '4%' }}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBatBuocCN && listBatBuocCN.length > 0 &&
                            listBatBuocCN.map((item, index) => {
                                return (
                                    <tr key={`users-${item.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.data.MaMonHoc}</td>
                                        <td>{item.data.TenMonHoc}</td>
                                        <td>{item.data.SoTC}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <div className="my-3">
                    <span><b>Các môn tự chọn nhóm A</b></span>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '4%' }}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listA && listA.length > 0 &&
                            listA.map((item, index) => {
                                return (
                                    <tr key={`users-${item.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.data.MaMonHoc}</td>
                                        <td>{item.data.TenMonHoc}</td>
                                        <td>{item.data.SoTC}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <div className="my-3">
                    <span><b>Các môn tự chọn nhóm B</b></span>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '4%' }}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listB && listB.length > 0 &&
                            listB.map((item, index) => {
                                return (
                                    <tr key={`users-${item.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.data.MaMonHoc}</td>
                                        <td>{item.data.TenMonHoc}</td>
                                        <td>{item.data.SoTC}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <div className="my-3">
                    <span><b>Các môn tự chọn nhóm C</b></span>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '4%' }}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listC && listC.length > 0 &&
                            listC.map((item, index) => {
                                return (
                                    <tr key={`users-${item.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.data.MaMonHoc}</td>
                                        <td>{item.data.TenMonHoc}</td>
                                        <td>{item.data.SoTC}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

                <div className="my-3">
                    <span><b>Các môn tự chọn nhóm D</b></span>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '4%' }}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{ width: '10%' }}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listD && listD.length > 0 &&
                            listD.map((item, index) => {
                                return (
                                    <tr key={`users-${item.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.data.MaMonHoc}</td>
                                        <td>{item.data.TenMonHoc}</td>
                                        <td>{item.data.SoTC}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default UserEduProgram;
