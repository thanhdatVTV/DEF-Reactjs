import { useState, useContext } from 'react'
import './Login.scss'
import { toast } from 'react-toastify';
import { loginApi } from '../../services/UserService';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import logoApp from '../../assets/images/logobachkhoa.png';


const Login = () => {
    const { loginContext, user } = useContext(UserContext)

    const navigate = useNavigate();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        setLoading(true);
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false })
            toast.error("Vui lòng nhập Email!")
            setLoading(false);

            return;
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(valueLogin)) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false })
            toast.error("Vui lòng nhập đúng định dạng email!")
            setLoading(false);
            return;
        }

        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false })
            toast.error("Vui lòng nhật mật khẩu!")
            setLoading(false);

            return;
        }

        try {
            let resLogin = true;//await loginApi(valueLogin, password);
            if (resLogin) {
                toast.success("Đăng nhập thành công.");
                let codeId = "2233167"; //resLogin.response.type == 0 ? resLogin.response.studentId : resLogin.response.studentId.teacherId;
                let fullName = "Nguyen Thanh Dat";//resLogin.response.fullName;
                let data = {
                    isAuthenticated: true,
                    token: 'fake token',
                    account: {
                        fullName, codeId
                    }
                }
                sessionStorage.setItem('account', JSON.stringify(data));
                loginContext(data);
                navigate("/")
                //window.location.reload();
            }
            else {
                toast.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setLoading(false); // Set loading to false after login attempt
        }
    }

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === "Enter") {
            handleLogin();
        }
    }

    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='logo-container'>
                            {/* <img src={logoApp} alt="Logo" className="logo" /> */}
                            <div className="brand">
                                SSPS PRINT
                            </div>
                        </div>
                        <div className="detail">
                            SSPS PRINT giúp bạn in ấn và chia sẻ tài liệu với mọi người một cách dể dàng.
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            SSPS PRINT
                        </div>
                        <input
                            type="text"
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            placeholder="Email or username..."
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <div className="input-2">
                            <input
                                type={isShowPassword === true ? "text" : "password"}
                                className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                                placeholder="Password..."
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                            <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            ></i>
                        </div>
                        <button className='btn btn-primary' onClick={() => handleLogin()}>
                            {loading ? (
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login