import { Button } from "react-bootstrap";
import './Home.scss'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const redirectToOtherPage = (item) => {
        navigate(item);
    };

    if (user.account.type === 1) {
        return (
            <>
                <div className="home-container">
                    <div className="col-12 d-flex flex-wrap w-100">
                        <Button className="col-md-4 col-6 btn btn-primary btn-home" onClick={() => redirectToOtherPage("/dotdangky")}>
                            <span className="title"><i className="fa-solid fa-file"></i> Đợt đăng ký</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-secondary btn-home" onClick={() => redirectToOtherPage("/dotdangkysinhvien")}>
                            <span className="title"><i className="fa-solid fa-money-bill"></i> Đăng ký môn học</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-warning btn-home" onClick={() => redirectToOtherPage("/user/mycourse")}>
                            <span className="title"><i className="fa-solid fa-database"></i> Khoá học của tôi</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-success btn-home" onClick={() => redirectToOtherPage("/user/eduprogram")}>
                            <span className="title"><i className="fa-solid fa-clipboard"></i> Xem chương trình đào tạo</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-danger btn-home" onClick={() => redirectToOtherPage("/user/thoikhoabieu")}>
                            <span className="title"> <i className="fa-solid fa-table"></i> Thời khóa biểu</span>
                        </Button>
                        {/* <Button className="col-md-4 col-6 btn btn-warning btn-home" onClick={() => redirectToOtherPage("/feature")}>
                            <span className="title"><i className="fa-solid fa-database"></i> Xuất báo cáo</span>
                        </Button> */}
                        <Button className="col-md-4 col-6 btn btn-info btn-home" onClick={() => redirectToOtherPage("/category")}>
                            <span className="title"><i className="fa-solid fa-list-check"></i> Quản lý danh mục</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-dark btn-home" onClick={() => redirectToOtherPage("/profile")}>
                            <span className="title"><i className="fa-solid fa-id-card"></i> Thông tin cá nhân</span>
                        </Button>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="home-container">
                    <div className="col-12 d-flex flex-wrap w-100">
                        <Button className="col-md-4 col-6 btn btn-secondary btn-home" onClick={() => redirectToOtherPage("/dotdangkysinhvien")}>
                            <span className="title"><i className="fa-solid fa-money-bill"></i> Đăng ký môn học</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-warning btn-home" onClick={() => redirectToOtherPage("/user/mycourse")}>
                            <span className="title"><i className="fa-solid fa-database"></i> Khoá học của tôi</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-success btn-home" onClick={() => redirectToOtherPage("/user/eduprogram")}>
                            <span className="title"><i className="fa-solid fa-clipboard"></i> Xem chương trình đào tạo</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-danger btn-home" onClick={() => redirectToOtherPage("/user/thoikhoabieu")}>
                            <span className="title"> <i className="fa-solid fa-table"></i> Thời khóa biểu</span>
                        </Button>
                        <Button className="col-md-4 col-6 btn btn-dark btn-home" onClick={() => redirectToOtherPage("/profile")}>
                            <span className="title"><i className="fa-solid fa-id-card"></i> Thông tin cá nhân</span>
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;

