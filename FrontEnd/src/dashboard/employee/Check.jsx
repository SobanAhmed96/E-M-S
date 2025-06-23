import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Check = () => {
    const navigate = useNavigate()
      useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get("/api/v1/isLoggedIn")
        console.log(res.data);
        if(!res.data.success || res.data.success === false){
          navigate("/")

        }
        else if(res.data.employees.email === "admin@gmail.com"){
           await axios.get("/api/v1/logOut");
           navigate("/")
        }
        
      } catch (error) {
         console.log("Login check error:", error);
        navigate("/");
        
      }
    }
    check()
  },[navigate])
  return (
    <div></div>
  )
}

export default Check