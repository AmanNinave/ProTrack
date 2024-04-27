import React from "react";
import { useState, useEffect } from "react";
import "./Style/home.css";
import Shift_box from "../Components/Shift_box";
import {useDispatch, useSelector} from 'react-redux'
import getData from "../Redux/Action/getData.action";
import ManpowerStatus from "../Components/ManpowerStatus";



function Home(props) {


  let Shift_list = ["First Shift", "Second Shift", "Night Shift" , "No Shift"];

  let task_list = [
    "No Task",
    "Cluster",
    "Packing", 
    "Odd/Case",  
    "Absent", 
    "Break",
    "Other"
  ]
  
  let dispatch = useDispatch();

  useEffect( () => {

    getData(dispatch ); 

  }, [] ) 


  return (
    <>
    
    <div id="home_parent_box">
      <div>
        

        {/* <div className="home_left_dummy_box"></div> */}

        <div className="home_left_box">

          <ManpowerStatus Shift_list={Shift_list} task_list={task_list}  />
         
        </div>

        <div className="home_right_box">
          {Shift_list.map((elem, index) => {
            return <Shift_box task_list={task_list}  shift={elem} key={index + 1} />;
          })}
        </div>



      </div>
    </div>


    </>
  );
}

export default Home;
