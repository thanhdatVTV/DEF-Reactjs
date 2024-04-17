import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LoginNew from '../../components/Login/Login';
import Users from '../../components/ManageUsers/Users';
import Home from '../../components/Home/Home';
import PrivateRoutes from './PrivateRoutes';
import UploadFile from '../UploadFile/UploadFile';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Category from '../Category/Category';
import PurchasePage from '../../components/PurchasePage/PurchasePage';
import TableUsers from '../TableUsers';
import Feature from '../Feature/Feature';
import TableLecturers from '../../components/Lecturers/TableLecturers';
import TableFaculty from '../../components/Faculty/TableFaculty';
import TableBuilding from '../../components/Building/TableBuilding';
import TableMajor from '../../components/Major/TableMajor';
import TableNhomLop from '../../components/NhomLop/TableNhomLop';
import TableSemester from '../../components/Semester/TableSemester';
import TableYear from '../../components/Year/TableYear';
import TableTestSchedules from '../TestSchedules/TableTestSchedules';

const AppRoutes = () => {
  const { user } = useContext(UserContext);
  console.log('App rou', user);

  const navigate = useNavigate();
  useEffect(() => {
    console.log('aaaaaaaaaaaaaaaaa');
    let session = sessionStorage.getItem('account');
    if (!session) {
      navigate('/Login');
    }
    // if (user.isAuthenticated === false) {
    //     console.log('bbbbbbbbbbbbbb');
    //     navigate("/Login")
    // }
  }, []);

  const onFileChange = (files) => {
    console.log(files);
  };

  if (user && user.isAuthenticated === true) {
    return (
      <>
        {/* <PrivateRoutes path="/users" element={Users} /> */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/users" element={<TableUsers />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/Login" element={<LoginNew />} />

          <Route path="/users" element={<Users />} />
          <Route
            path="/upload"
            element={<UploadFile onFileChange={(files) => onFileChange(files)} />}
          />
          <Route path="/category" element={<Category />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/lecturers" element={<TableLecturers />} />
          <Route path="/faculty" element={<TableFaculty />} />
          <Route path="/building" element={<TableBuilding />} />
          <Route path="/major" element={<TableMajor />} />
          <Route path="/nhomlop" element={<TableNhomLop />} />
          <Route path="/semester" element={<TableSemester />} />
          <Route path="/year" element={<TableYear />} />
          <Route path="/testschedules" element={<TableTestSchedules />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Login" element={<LoginNew />} />
        </Routes>
      </>
    );
  }
};

export default AppRoutes;
