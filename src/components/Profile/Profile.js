import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Profile.scss';
import userimage from '../../assets/images/user.png';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="flex-container">
        <div className="col">
          <img src={userimage} alt="user" style={{ width: '100%' }} />
          <h1>{user.account.fullName}</h1>
        </div>
        <div className="info">
          <p>Date Of Birth: {user.account.dateOfBirth}</p>
          <p>First Name: {user.account.firstName}</p>
          <p>Last Name: {user.account.lastName}</p>
          <p>Code ID: {user.account.codeId}</p>
          <p>Major ID: {user.account.majorId}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
