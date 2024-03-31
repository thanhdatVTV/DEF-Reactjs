import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../../assets/images/logobachkhoa.png';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";

const Header = (props) => {
    const { user, logoutContext } = useContext(UserContext);


    const navigate = useNavigate();
    const location = useLocation();
    const [isShowHeader, setIsShowHeader] = useState(true);
    const handleLogout = () => {
        sessionStorage.removeItem("account");
        // navigate("/login");
        // setIsShowHeader(false);

        let data = {
            isAuthenticated: false,
            token: '',
            account: null
        }
        logoutContext(data);
        navigate("/login");
        toast.success("Log out success!")
    }



    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logoApp}
                                width="40"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Boostrap logo"
                            />
                            <span>SSPS Print</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                                <NavLink to="/users" className="nav-link">Manage Users</NavLink>
                                <NavLink to="/file-type" className="nav-link">File Type</NavLink>
                                <NavLink to="/page-size" className="nav-link">Page Size</NavLink>
                                <NavLink to="/printer" className="nav-link">Printer</NavLink>
                                <NavLink to="/upload" className="nav-link">Upload</NavLink>
                                <NavLink to="/category" className="nav-link">Category</NavLink>
                                <NavLink to="/purchase" className="nav-link">Purchase</NavLink>
                            </Nav>
                            <Nav>
                                <NavDropdown title={user.account.fullName} id="basic-nav-dropdown">
                                    {/* <NavLink to="/login" className="dropdown-item">Login</NavLink> */}
                                    <NavLink to="/feature" className="dropdown-item">Thông tin cá nhân</NavLink>
                                    <NavDropdown.Item onClick={() => handleLogout()}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
    else {
        return <></>
    }

}

export default Header;