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
        if (item === 1) {
            navigate("/users")
        }
        if (item === 2) {
            navigate("/feature")
        }
        if (item === 3) {
            navigate("/feature")
        }
        if (item === 4) {
            navigate("/file-type")
        }
        if (item === 5) {
            navigate("/page-size")
        }
        if (item === 6) {
            navigate("/feature")
        }
        if (item === 7) {
            navigate("/printer")
        }
        if (item === 8) {
            navigate("/feature")
        }
        if (item === 9) {
            navigate("/feature")
        }
        if (item === 10) {
            navigate("/feature")
        }
        if (item === 11) {
            navigate("/feature")
        }
    };

    return (
        <>
            <div className='category-container'>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Quản lý thông tin người dùng</Divider>
                <Row
                    gutter={[16, 8]
                        // xs: 8,
                        // sm: 16,
                        // md: 24,
                        // lg: 32,
                    }
                >
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(1)} span={6}>
                        <div style={style} className='box-content'>Quản lý User</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(2)} span={6}>
                        <div style={style} className='box-content'>Quản lý quyền</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(3)} span={6}>
                        <div style={style} className='box-content'>Quản lý phân quyền</div>
                    </Col>
                    {/* <Col className="gutter-row" span={6}>
                <div style={style}></div>
            </Col> */}
                </Row>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Quản lý danh mục</Divider>
                <Row gutter={[16, 24]}>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(4)} span={6}>
                        <div style={style} className='box-content'>Quản lý loại tập tin</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(5)} span={6}>
                        <div style={style} className='box-content'>Quản lý loại giấy</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(6)} span={6}>
                        <div style={style} className='box-content'>Quản lý vị trí máy in</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(7)} span={6}>
                        <div style={style} className='box-content'>Quản lý Máy in</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(8)} span={6}>
                        <div style={style} className='box-content'>Quản lý tập tin hệ thống</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(9)} span={6}>
                        <div style={style} className='box-content'>Cấu hình chung cho hệ thống</div>
                    </Col>
                    {/* <Col className="gutter-row" span={6}>
                    <div style={style} className='box-content'>Quản lý loại file</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style} className='box-content'>Quản lý loại file</div>
                </Col> */}
                </Row>
                <Divider orientation="left" style={{ fontSize: '20px' }}>Báo cáo</Divider>
                <Row gutter={16}>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(10)} span={6}>
                        <div style={style} className='box-content'>Báo cáo người dùng</div>
                    </Col>
                    <Col className="gutter-row" onClick={() => redirectToOtherPage(11)} span={6}>
                        <div style={style} className='box-content'>Báo cáo máy in</div>
                    </Col>
                    {/* <Col className="gutter-row" span={6}>
                <div style={style}></div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
            </Col> */}
                </Row>
            </div>
        </>
    )
}
export default Category;