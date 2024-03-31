import Reat, { useState } from "react";
import { useEffect } from "react";

const UserContext = Reat.createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        token: '',
        account: {}
    });

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser(userData)
    };

    // Logout updates the user data to default
    const logoutContext = (userData) => {
        setUser(userData)
    };


    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            let account = JSON.parse(session);
            let codeId = account.account.codeId;
            let fullName = account.account.fullName;
            let data = {
                isAuthenticated: true,
                token: 'fake token',
                account: {
                    fullName, codeId
                }
            }
            setUser(data);
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };