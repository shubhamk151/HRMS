import React from 'react'
import Navbar from '../../components/navbar.jsx'
import welcome from '../../assets/welcome.png'

export default function EmpDashbord() {
    return (
        <div>
            <Navbar />
            <div className='empDashbord'>

                <div className='sidebar-container'>
                    <div className='sidebar'>

                        <p><i className="fa-solid fa-window-maximize"></i> Dashbord</p>
                        <p><i className="fa-solid fa-user"></i> Profile</p>
                        <p><i className="fa-solid fa-calendar-days"></i> Leave</p>
                        <p><i className="fa-solid fa-bullhorn"></i> Announcement</p>
                        <p><i className="fa-solid fa-gear"></i> Setting</p>
                    </div>
                </div>
                <div className='hero-container'>
                    <div className='hero-welcome'>
                        <img src={welcome} alt='welcome' />
                        <div className='emp-hero-text'>
                            <p><i className="fa-solid fa-check"></i> Marked attendance</p>
                            <p><i className="fa-solid fa-calendar-check"></i> Apply leave</p>
                            <p><i className="fa-solid fa-file-lines"></i> View payslip</p>
                        </div>
                    </div>
                    <div className='emp-description'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </div>

            </div>
        </div>
    )
}
