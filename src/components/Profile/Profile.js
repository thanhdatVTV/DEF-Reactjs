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
          <h3>{user.account.fullName}</h3>
        </div>
        <div className="info">
          <p>Date Of Birth: {user.account.dateOfBirth}</p>
          <p>Last Name: {user.account.lastName}</p>
          <p>First Name: {user.account.firstName}</p>
          <p>ID: {user.account.codeId}</p>
          {user.account.majorName ? <p>Major: {user.account.majorName}</p> : <p>Faculty: {user.account.facultyName}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
