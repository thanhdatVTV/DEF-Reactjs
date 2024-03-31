import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import LoginNew from '../../components/Login/Login';
import TablePageSize from '../../components/PageSize/TablePageSize';
import TablePrinter from '../../components/Printer/TablePrinter';
import Users from '../../components/ManageUsers/Users';
import Home from '../../components/Home/Home';
import TableFileType from '../../components/FileType/TableFileType';
import PrivateRoutes from "./PrivateRoutes";
import UploadFile from "../UploadFile/UploadFile";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Category from "../Category/Category";
import PurchasePage from '../../components/PurchasePage/PurchasePage';
import TableUsers from '../TableUsers'
import Feature from "../Feature/Feature";

const AppRoutes = () => {
    const { user } = useContext(UserContext);
    console.log('App rou', user)

    const navigate = useNavigate();
    useEffect(() => {
        console.log('aaaaaaaaaaaaaaaaa');
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate("/Login")
        }
        // if (user.isAuthenticated === false) {
        //     console.log('bbbbbbbbbbbbbb');
        //     navigate("/Login")
        // }
    }, [])

    const onFileChange = (files) => {
        console.log(files);
    }

    if (user && user.isAuthenticated === true) {
        return (
            <>
                {/* <PrivateRoutes path="/users" element={Users} /> */}
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/users" element={<TableUsers />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/Login" element={<LoginNew />} />

                    <Route path="/printer" element={<TablePrinter />} />
                    <Route path="/file-type" element={<TableFileType />} />
                    <Route path="/page-size" element={<TablePageSize />} />

                    <Route path='/users' element={<Users />} />
                    <Route
                        path="/upload"
                        element={
                            <UploadFile onFileChange={(files) => onFileChange(files)} />
                        }
                    />
                    <Route path='/category' element={<Category />} />
                    <Route path='/purchase' element={<PurchasePage />} />
                    <Route path='/feature' element={<Feature />} />
                </Routes>
            </>
        )
    }
    else {
        return (
            <>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/Login" element={<LoginNew />} />
                </Routes>
            </>
        )
    }


}

export default AppRoutes;