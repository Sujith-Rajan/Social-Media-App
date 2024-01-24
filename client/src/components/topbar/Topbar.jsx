import React, { useContext } from 'react'
import {Search,Person,Chat,Notifications} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './topbar.css'
import { AuthContext } from '../../context/AuthContext';

function Topbar() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext)
  // console.log(user)
  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
            <Link to="/" className='logo'>
                <span className='logo'>ChatNext</span>
            </Link>
        </div>

        <div className="topbarCenter">
          <div className="searchbar">
            <Search className='searchIcon' />
              <input type="text" 
              placeholder='Search for friend ,post or video'
              className='searchInput'
              />
          </div>
        </div>

        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink"><Link to='/' className='topbarLinkHome'>Homepage</Link></span>
            <span className="topbarLink">Timeline</span>
          </div>

          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person/>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat/>
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`} >
            <img crossOrigin='anonymous' src={user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/noavatar.png"} alt="no avatar" className='topbarImg'/>
              
          </Link>
        </div>

    </div>
  )
}

export default Topbar