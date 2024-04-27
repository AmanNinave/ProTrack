import React, { useEffect, useState } from "react";
import Dashboard_Child1 from "../Components/Dashboard_Child1";
import {useDispatch, useSelector} from 'react-redux'
import getData from "../Redux/Action/getData.action";
import Notification_Dashboard from "../Components/Notification_Dashboard";
import './Style/dashboard.css'
import Add from './../assets/images/plus.png';
import Dash_Model from "../Components/Dash_Model";
import parameters from "../config";

/////////////////////////////////////////////////    This Page is build from Home Page   ///////////////////////////////////////////////////////////////////

function Dashboard(props) {

    const [showModel , setShowModel ] = useState(false);

    let pickerData = useSelector((state) => {
        return state.Pickers
    })
    
    let dispatch = useDispatch();

    const [notificationsArray , setNotificationsArray ] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(()=> {
        
        const reqData = {
            method : "GET",
            headers : {"Content-Type" : "application/json" , "authorization" : `Bearer ${token}`}
        }
        let dta = fetch(`${parameters.backend_ip}/notification/get` , reqData )
        .then((res) => {return res.json()})
        .then((res) => { console.log(res); setNotificationsArray(res)})
    },[])

    useEffect(() => {
        if(pickerData.length <= 0 ){

            getData(dispatch);
        }
    }, [] )

    function handleSubmit(notification) {
      const reqData = {
          method : "POST",
          headers : { "Content-Type" : "application/json" , "authorization" : `Bearer ${token}`},
          body : JSON.stringify(notification)
      }

      fetch(`${parameters.backend_ip}/notification/add` , reqData )
      .then((res) => {return res.json()})
      .then((res) => { setNotificationsArray(res)});
      setShowModel(false);
  }

    function handleDelete(id) {
      const reqData = {
          method : "DELETE" ,
          headers : { "Content-Type" : "application/json" , "authorization" : `Bearer ${token}`},
          body : JSON.stringify({ id })
      }
      fetch(`${parameters.backend_ip}/notification/delete` , reqData )
      .then((res)=> {return res.json()})
      .then((res) => { setNotificationsArray(res)});
  }

  return (
    <div id="home_parent_box">
      <div>
        {/* <div className="home_left_dummy_box"></div> */}

        <div className="home_left_box dash_left_box">
          { notificationsArray.length > 0 && 

              notificationsArray.map((elem , index ) => {
                return  <Notification_Dashboard handleDelete={handleDelete} key={index} elem={elem}  />
              })

          }
          
          { showModel && <div className="noti_dash_model"><Dash_Model handleSubmit={handleSubmit} setShowModel={setShowModel} /></div>}
          <div onClick={()=> {setShowModel(true)}} className="add_icon_dash"><img src={Add} alt="" /></div>
        </div>
        
        <div className="home_right_box">
          {pickerData.map((elem, index) => {
            return (
              <Dashboard_Child1 pickerObj={ elem } key={index + 1} />
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
