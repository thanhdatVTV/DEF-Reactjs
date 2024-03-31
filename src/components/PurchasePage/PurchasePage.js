// PaymentForm.js

import React, { useState } from 'react';
import './PurchasePage.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const PurchasePage = () => {
    const navigate = useNavigate();

    const [accountInfo, setAccountInfo] = useState({
        username: '',
        password: '',
        bankAccount: '',
    });
    const [numberOfPages, setNumberOfPages] = useState(0);

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setAccountInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handlePagesChange = (e) => {
        setNumberOfPages(parseInt(e.target.value, 10) || 0);
    };

    const handlePayment = () => {
        toast.success("Thanh toán mua trang in thành công.")
        navigate("/upload");
    }

    return (
        <div className="payment-container">
            <div className="account-info">
                <h2>Thông tin tài khoản</h2>
                <label htmlFor="username">Tên đăng nhập:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={accountInfo.username}
                    onChange={handleAccountChange}
                    className="account-input"
                />
                <label htmlFor="password">Mật khẩu:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={accountInfo.password}
                    onChange={handleAccountChange}
                    className="account-input"
                />
                <label htmlFor="bankAccount">Số tài khoản ngân hàng:</label>
                <input
                    type="text"
                    id="bankAccount"
                    name="bankAccount"
                    value={accountInfo.bankAccount}
                    onChange={handleAccountChange}
                    className="account-input"
                />
            </div>
            <div className="page-info">
                <h2>Thông tin trang giấy</h2>
                <label htmlFor="pages">Số trang cần mua:</label>
                <input
                    type="number"
                    id="pages"
                    name="pages"
                    value={numberOfPages}
                    onChange={handlePagesChange}
                    className="pages-input"
                />
                <button type="btn-thanhtoan" onClick={handlePayment}>
                    Thanh toán
                </button>
            </div>
        </div>
    );
};

export default PurchasePage;
