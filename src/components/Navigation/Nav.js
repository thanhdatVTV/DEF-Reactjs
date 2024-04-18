import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../../assets/images/deflogo.png';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = (props) => {
  const { user, logoutContext } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [isShowHeader, setIsShowHeader] = useState(true);
  const handleLogout = () => {
    sessionStorage.removeItem('account');
    // navigate("/login");
    // setIsShowHeader(false);

    let data = {
      isAuthenticated: false,
      token: '',
      account: null,
    };
    logoutContext(data);
    navigate('/login');
    toast.success('Log out success!');
  };

  if ((user && user.isAuthenticated === true) || location.pathname === '/') {
    return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logoApp}
                width="90"
                height="30"
                className="d-inline-block align-top"
                alt="React Boostrap logo"
              />
              {/* <span>e-learning</span> */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/users" className="nav-link">
                  Manage Users
                </NavLink>
                <NavLink to="/upload" className="nav-link">
                  Upload
                </NavLink>
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
                <NavLink to="/purchase" className="nav-link">
                  Purchase
                </NavLink>
                <NavLink to="/lecturers" className="nav-link">
                  Lecturer
                </NavLink>
                <NavLink to="/faculty" className="nav-link">
                  Faculty
                </NavLink>
                <NavLink to="/building" className="nav-link">
                  Building
                </NavLink>
                <NavLink to="/major" className="nav-link">
                  Major
                </NavLink>
                <NavLink to="/nhomlop" className="nav-link">
                  NhomLop
                </NavLink>
                <NavLink to="/semester" className="nav-link">
                  Semester
                </NavLink>
                <NavLink to="/year" className="nav-link">
                  Year
                </NavLink>
                <NavLink to="/testschedules" className="nav-link">
                  Test Schedule
                </NavLink>
                <NavLink to="/subjects" className="nav-link">
                  Subject
                </NavLink>
                <NavLink to="/subjectgroups" className="nav-link">
                  Subject Group
                </NavLink>
              </Nav>

              <Nav>
                <NavDropdown title={user.account.fullName} id="basic-nav-dropdown">
                  {/* <NavLink to="/login" className="dropdown-item">Login</NavLink> */}
                  <NavLink to="/feature" className="dropdown-item">
                    Thông tin cá nhân
                  </NavLink>
                  <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else {
    return <></>;
  }
};

export default Header;
