import React, { useEffect } from 'react'
import axios from 'axios'
import './UserPage.css'

function UserPage() {
  const email = localStorage.getItem('email');
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  return (
    <div>
      {console.log()}
    </div>
  )
}

export default UserPage
