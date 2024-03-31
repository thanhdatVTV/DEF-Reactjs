import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const PrivateRoutes = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            navigate("/Login");
            //window.location.reload();
        }
        if (session) {
            //check role
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path={props.path} element={props.element} />
            </Routes>
        </>
    )
}

export default PrivateRoutes;