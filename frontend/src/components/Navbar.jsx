import React from 'react'
import '../App.css'
import profile from '../assets/profile.jpeg'
import Button from '@mui/material/Button';

export default function Navbar() {
    return (
            <div className='navbar'>
                <div>
                    <h2>HRMS</h2>
                </div>
                <div className='navLink'>
                    <img src={profile} alt='profile' />
                    <p>Employee Name <br /> Epmloyee</p>
                    <div>
                    <Button variant="contained">Button</Button>


                    </div>
                </div>
            </div>

    )
}
