import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ViewCourse = (props) => {
    const { TenMH, MaMH, NhomLop } = useLocation().state;

    return (
        <div className='container text-center mt-5'>
            <h2>{TenMH}</h2>
            <h4>{MaMH}</h4>
            <h4>{NhomLop}</h4>
        </div>
    )
}

export default ViewCourse;
