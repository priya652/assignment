import react from 'react'
const LogoutPage = () => {
  const handlelogOut=()=>{
  // localStorage.setItem('username':, JSON.stringify(score));
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
              Michael Dam
            </span>
            <span className='logoutTxt pdngHXXS'>
              example@gmail.com
            </span>
            <span className='logoutTxt pdngHXXS'>
              Female
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

export default LogoutPage;
