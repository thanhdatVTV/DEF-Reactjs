import React from 'react';
import './Category.scss'
import { Col, Divider, Row } from 'antd';
import { useNavigate } from 'react-router';
const style = {
    // background: '#0092ff',
    padding: '20px 0'
};
const Category = () => {
    const navigate = useNavigate();
    const redirectToOtherPage = (item) => {
        navigate(item)
    };

    return (
        <>
            <div className='category-container'>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Quản lý thông tin người dùng</Divider>
                <Row
                    gutter={[16, 8]
                    }
                >
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/feature")} span={6}>
                        <div style={style} className='box-content'>Quản lý User</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/feature")} span={6}>
                        <div style={style} className='box-content'>Quản lý quyền</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/feature")} span={6}>
                        <div style={style} className='box-content'>Quản lý phân quyền</div>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Quản lý Cơ sở vật chất</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/coso")} span={6}>
                        <div style={style} className='box-content'>Quản lý Cơ sở</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/building")} span={6}>
                        <div style={style} className='box-content'>Quản lý Tòa nhà</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/room")} span={6}>
                        <div style={style} className='box-content'>Quản lý Phòng học</div>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Quản lý danh mục</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/year")} span={6}>
                        <div style={style} className='box-content'>Quản lý Năm học</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/semester")} span={6}>
                        <div style={style} className='box-content'>Quản lý Học Kỳ</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/faculty")} span={6}>
                        <div style={style} className='box-content'>Quản lý Khoa</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/major")} span={6}>
                        <div style={style} className='box-content'>Quản lý Ngành học</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/subjectgroups")} span={6}>
                        <div style={style} className='box-content'>Quản lý Nhóm môn</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/subjects")} span={6}>
                        <div style={style} className='box-content'>Quản lý Môn học</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/nhomlop")} span={6}>
                        <div style={style} className='box-content'>Quản lý Nhóm lớp</div>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Quản lý học vụ</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/dotdangky")} span={6}>
                        <div style={style} className='box-content'>Quản lý Đợt đăng ký</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/eduprogram")} span={6}>
                        <div style={style} className='box-content'>Quản lý chương trình đào tạo</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/testschedules")} span={6}>
                        <div style={style} className='box-content'>Quản lý lịch thi</div>
                    </Col>
                </Row>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Thống kê</Divider>
                <Row gutter={16}>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/lecturers")} span={6}>
                        <div style={style} className='box-content'>Danh sách giảng viên</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage("/feature")} span={6}>
                        <div style={style} className='box-content'>Danh sách sinh viên</div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Category;