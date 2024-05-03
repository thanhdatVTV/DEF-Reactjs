import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Table from 'react-bootstrap/Table';
import { getListByMajor } from '../../services/EduProgramService';
import '../TableUser.scss';

const TableEduProgram = (props) => {
    const [listEduProgram, setListEduProgram] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getListByMajor(user.account.majorName);
                console.log(res)
                if (res && res.response) {
                    setListEduProgram(res.response);
                    console.log(listEduProgram)
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
                            <th style={{width: '4%'}}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEduProgram && listEduProgram.length > 0 &&
                            listEduProgram.map((item, index) => {
                                if (item.data.GroupId === 'BatBuoc') {
                                    return (
                                        <tr key={`users-${item.id}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.data.MaMonHoc}</td>
                                            <td>{item.data.TenMonHoc}</td>
                                            <td>{item.data.SoTC}</td>
                                        </tr>
                                    )
                                }
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
                            <th style={{width: '4%'}}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEduProgram && listEduProgram.length > 0 &&
                            listEduProgram.map((item, index) => {
                                if (item.data.GroupId === 'BatBuocCN') {
                                    return (
                                        <tr key={`users-${item.id}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.data.MaMonHoc}</td>
                                            <td>{item.data.TenMonHoc}</td>
                                            <td>{item.data.SoTC}</td>
                                        </tr>
                                    )
                                }
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
                            <th style={{width: '4%'}}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEduProgram && listEduProgram.length > 0 &&
                            listEduProgram.map((item, index) => {
                                if (item.data.GroupId === 'A') {
                                    return (
                                        <tr key={`users-${item.id}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.data.MaMonHoc}</td>
                                            <td>{item.data.TenMonHoc}</td>
                                            <td>{item.data.SoTC}</td>
                                        </tr>
                                    )
                                }
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
                            <th style={{width: '4%'}}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEduProgram && listEduProgram.length > 0 &&
                            listEduProgram.map((item, index) => {
                                if (item.data.GroupId === 'B') {
                                    return (
                                        <tr key={`users-${item.id}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.data.MaMonHoc}</td>
                                            <td>{item.data.TenMonHoc}</td>
                                            <td>{item.data.SoTC}</td>
                                        </tr>
                                    )
                                }
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
                            <th style={{width: '4%'}}>
                                <div>
                                    <span>STT</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>MSMH</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Tên môn học</span>
                                </div>
                            </th>
                            <th style={{width: '10%'}}>
                                <div>
                                    <span>Tín chỉ</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listEduProgram && listEduProgram.length > 0 &&
                            listEduProgram.map((item, index) => {
                                if (item.data.GroupId === 'C') {
                                    return (
                                        <tr key={`users-${item.id}`}>
                                            <td>{index + 1}</td>
                                            <td>{item.data.MaMonHoc}</td>
                                            <td>{item.data.TenMonHoc}</td>
                                            <td>{item.data.SoTC}</td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </Table>
                
            </div>
        </>
    )
}

export default TableEduProgram;
