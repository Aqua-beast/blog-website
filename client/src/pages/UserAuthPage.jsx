import React, {useEffect} from 'react'
import UserAuth from '../components/UserAuth/UserAuth'
import axios from 'axios';

function UserAuthPage() {

    // useEffect(() => {
      
    //   axios.get(`https://blog-website-server-tau.vercel.app/profile/${email}`,
    //     {
    //       headers: {
    //         "x-access-token": localStorage.getItem('token')
    //       }
    //     })
    //     .then((res) => {
    //       localStorage.setItem('userdata', JSON.stringify(res.data.details));
    //       console.log(JSON.parse(localStorage.getItem('userdata')));
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     })
    // }, [email])
    return (
        <UserAuth />
    )
}

export default UserAuthPage
