import React , {useEffect, useState}from 'react';
import Productivity from './../assets/images/productivity.png'
import './Style/login.css'
import Google from './../assets/images/google.jpg'
import parameters from '../config';
import {useNavigate} from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
    const navigate = useNavigate();
    const [user_id , setUserID ] = useState("");
    const [password , setPassword ] = useState("");
    const [loading , setLoding ] = useState(false);

    useEffect(()=> {

        toast.info('Username :- amanninave  Password :- 12345', {
            position: "top-right",
            autoClose: 500000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

    }, [] )

    function submitLogin(e) {
        setLoding(true);
        e.preventDefault();
        const reqbody = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id,
                password
            })
        }

        fetch(`${parameters.backend_ip}/user/login`, reqbody)
            .then((res) => { return res.json() })
            .then((res) => {
                setLoding(false);
                if (res.token != undefined) {

                    localStorage.setItem("token", JSON.stringify(res.token))
                    localStorage.setItem('userDetails' , JSON.stringify(res));
                    navigate('/');
                }else {
                    toast.info('Wrong User ID or Password !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
            });

    }

  
    return (
        <>
        <div className='login_parent_div'>
            <div className='menu_logo login_logo'>
                <img className='logo_icon' src={Productivity} alt="" />
                <h2>ProTrack</h2>
            </div>

            <div className='login_main_div' >
                <br />
                <h3> Sign in to your proTrack account </h3>
                
                <div className="inner_div_login">
                    
                        <label htmlFor="login_user_name">Username : </label>{" "}
                        <br />
                        <input
                            type="text"
                            id="login_user_name"
                            className="input_box_login"
                            placeholder="Enter Username"
                            onChange={(e) => { setUserID(e.target.value)}}
                        />
                  
                </div>

                <div className="inner_div_login">
                    
                        <label htmlFor="login_password">Password : </label>{" "}
                        <br />
                        <input
                            type="password"
                            id="login_password"
                            className="input_box_login"
                            placeholder="Enter Password"
                            onChange={(e) => { setPassword(e.target.value )}}
                        />
                  
                </div>

                <button disabled={loading} className="login_button" onClick={(e)=> {submitLogin(e)}}> { loading ?  <ClipLoader  color="#36d7b7"  size={20} /> : "Login"} </button>
                
                {/* <button  className=" google_button"> <img src={Google} alt="" className='google_icon' /> Continue with Google </button> */}
                <div className='forgot_password'>
                     <h5 >Forgot Password ? </h5>
                </div>

            </div>

            
        </div>

        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

        </>
    );
}

export default Login;