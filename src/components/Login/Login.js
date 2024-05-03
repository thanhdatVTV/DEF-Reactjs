import { useState, useContext } from 'react';
import './Login.scss';
import { toast } from 'react-toastify';
import { loginApi } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import logoApp from '../../assets/images/deflogo.png';

const Login = () => {
  const { loginContext, user } = useContext(UserContext);

  const navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    setLoading(true);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error('Vui lòng nhập Email!');
      setLoading(false);

      return;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(valueLogin)) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
      toast.error('Vui lòng nhập đúng định dạng email!');
      setLoading(false);
      return;
    }

    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error('Vui lòng nhật mật khẩu!');
      setLoading(false);

      return;
    }

    try {
      let resLogin = await loginApi(valueLogin, password);
      if (resLogin && +resLogin.status == 1) {
        toast.success('Đăng nhập thành công.');
        console.log('haha');
        console.log(resLogin);
        console.log(resLogin.response);
        let codeId =
          resLogin.response.Type == 0 ? resLogin.response.StudentId : resLogin.response.TeacherId;
        let fullName = resLogin.response.FullName;
        let dateOfBirth = resLogin.response.DateOfBirth;
        let firstName = resLogin.response.FirstName;
        let lastName = resLogin.response.LastName;
        let majorName;
        let facultyName;
        if(resLogin.response.Type == 0) {
          majorName = resLogin.response.MajorName;
        } else {
          facultyName = resLogin.response.FacultyName;
        }
        let data = {
          isAuthenticated: true,
          token: 'fake token',
          account: {
            fullName,
            codeId,
            dateOfBirth,
            firstName,
            lastName,
            majorName,
            facultyName
          },
        };
        sessionStorage.setItem('account', JSON.stringify(data));
        console.log(data);
        loginContext(data);
        navigate('/');
        //window.location.reload();
      } else {
        toast.error('Đăng nhập thất bại!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="logo-container">
              {/* <img src={logoApp} alt="Logo" className="logo" /> */}
              <img src={logoApp} width="300" height="100" alt="logo" />
              <div className="brand">e-learning</div>
            </div>
            <div className="detail">Unlock Learning. Anywhere. Anytime</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">DEF e-learning</div>
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'
              }
              placeholder="Email or username..."
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <div className="input-2">
              <input
                type={isShowPassword === true ? 'text' : 'password'}
                className={
                  objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'
                }
                placeholder="Password..."
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onKeyPress={(event) => handlePressEnter(event)}
              />
              <i
                className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                onClick={() => setIsShowPassword(!isShowPassword)}
              ></i>
            </div>
            <button className="btn btn-primary" onClick={() => handleLogin()}>
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
  );
};

export default Login;
