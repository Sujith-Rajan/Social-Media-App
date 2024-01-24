import React, { Fragment } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import './home.css'

function Home() {
  return (
    <Fragment>
    <Topbar/>
    <div className="homeContainer">
      
        <Sidebar/>
        <Feed/>
        <Rightbar/>
    </div>
    </Fragment>
  )
}

export default Home