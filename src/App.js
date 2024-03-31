import './App.scss';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Link } from "react-router-dom";
import Nav from './components/Navigation/Nav';
import Container from 'react-bootstrap/Container';
import Login from './components/Login';
import { useState } from 'react';
import { useEffect } from 'react';
import _ from "lodash"
import AppRoutes from './components/Routes/AppRoutes';

function App() {
  // const [account, setAccount] = useState();

  // useEffect(() => {
  //   let session = sessionStorage.getItem('account');
  //   if (session) {
  //     setAccount(JSON.parse(session));
  //   }
  // }, []);

  return (
    <>
      <div className='app-header'>
        <Nav />
      </div>
      <div className='app-container'>
        {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />} */}
        {/* <Header /> */}
        {/* <Container> */}
        <AppRoutes />
        {/* </Container> */}


      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
