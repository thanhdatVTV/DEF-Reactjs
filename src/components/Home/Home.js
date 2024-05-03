import { Button } from "react-bootstrap";
import './Home.scss'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const redirectToOtherPage = (item) => {
        if (item === 1) {
            navigate("/dotdangky")
        }
        if (item === 2) {
            navigate("/purchase")
        }
        if (item === 3) {
            navigate("/feature")
        }
        if (item === 4) {
            navigate("/feature")
        }
        if (item === 5) {
            navigate("/feature")
        }
        if (item === 6) {
            navigate("/category")
        }
        if (item === 7) {
            navigate("/feature")
        }
    };

    return (
        <>
            <div className="home-container">
                <div className="col-12 d-flex flex-wrap w-100">
                    <Button className="col-md-4 col-6 btn btn-primary btn-home" onClick={() => redirectToOtherPage(1)}>
                        <span className="title"><i className="fa-solid fa-file"></i> Đợt đăng ký</span>
                    </Button>
                    <Button className="col-md-4 col-6 btn btn-secondary btn-home" onClick={() => redirectToOtherPage(2)}>
                        <span className="title"><i className="fa-solid fa-money-bill"></i> Mua trang in</span>
                    </Button>
                    <Button className="col-md-4 col-6 btn btn-success btn-home" onClick={() => redirectToOtherPage(3)}>
                        <span className="title"><i className="fa-solid fa-clipboard"></i> Lịch sử in ấn</span>
                    </Button>
                    <Button className="col-md-4 col-6 btn btn-danger btn-home" onClick={() => redirectToOtherPage(4)}>
                        <span className="title"> <i className="fa-solid fa-database"></i> Kho tài liệu</span>
                    </Button>
                    <Button className="col-md-4 col-6 btn btn-warning btn-home" onClick={() => redirectToOtherPage(5)}>
                        <span className="title"><i className="fa-solid fa-table"></i> Xuất báo cáo</span>
                    </Button>
                    <Button className="col-md-4 col-6 btn btn-info btn-home" onClick={() => redirectToOtherPage(6)}>
                        <span className="title"><i className="fa-solid fa-list-check"></i> Quản lý danh mục</span>
                    </Button>
                    <Button className="col-md-4 col-6 btn btn-dark btn-home" onClick={() => redirectToOtherPage(7)}>
                        <span className="title"><i className="fa-solid fa-id-card"></i> Thông tin cá nhân</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Home;

