import react, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [userData, setUserData]=useState(null);
  const Navigate = useNavigate();

  const handlelogOut=()=>{

 // Remove the user data and access token from localStorage
 localStorage.removeItem('user');
 localStorage.removeItem('authToken');
 localStorage.removeItem('refreshToken');

 Navigate('/');

  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData)); 
    } else {
      Navigate('/'); 
    }
  }, [Navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
    <div className='flexCol logoutLayout'>
      <div className=' flexCol logoutWidth'>
        <div className=' flexCol heading alignItems'>
          <span className='font36 pdngHXXS'>Welcome to</span>
          <span className='unstop font46 pdngHXXS'>Unstop</span>
        </div>
        <div className='logoutCard flexCol pdng16 txtCntr'>
          <span className='imgAvatarMD pdng8'>
            <img src='./profile.svg' />
          </span>
          <div className='flexCol txtCntr pdng8'>
            <span className='mailTxt pdngHXXS'>
              {userData.firstName}
            </span>
            <span className='logoutTxt pdngHXXS'>
            {userData.email}
            </span>
            <span className='logoutTxt pdngHXXS'>
            {userData.gender}
            </span>
            <div className='flexRow logoutBtn pdng8'>
              <button onClick={handlelogOut}>
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default Home;
