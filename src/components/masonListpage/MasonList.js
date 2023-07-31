import React,{Fragment, useEffect, useState,useCallback} from "react";
import MasonData from "./MasonData";
import NewMasonForm from "./NewMasonForm"
import { Link } from "react-router-dom";
const MasonList = () =>{
   const [showForm, setShowForm] = useState(false);
   const [showList,setShowList] = useState(true);
   const [masonlist,setMasonList] = useState([]);
   const [isLoading,setIsLoading] = useState(false);
   const [error,setError] = useState(null);

   const fetchMasonDatahandler = useCallback(async() =>{
    setIsLoading(true);
    setError(null);
    try{
        const response = await fetch("https://masonlist-6cc7d-default-rtdb.firebaseio.com/masonDetail.json");
        if(!response.ok){
            throw new Error("Something Went Wrong!!!!");
        }
        const data = await response.json();
       const transformData = [];
       for (const key in data){
        transformData.push({
            id: key,
            firstname: data[key].firstName,
            middlename: data[key].middleName,
            lastname: data[key].lastName,
            phoneNo :data[key].phoneNo,
            aadharNo: data[key].aadharNo,
            village: data[key].village,
            image: data[key].image,
            occupation: data[key].occupation,
            email : data[key].email,
        });
    }
    setMasonList(transformData);
    console.log(transformData);
    }catch(error){
        setError(error.message);
    }
    setIsLoading(false);
   },[]);
   
   useEffect( () =>{
    fetchMasonDatahandler();
   },[fetchMasonDatahandler])

   const toggleFormVisibilityHandler = () =>{
        setShowForm(!showForm);
   }
//    const listVisibilityHandler = () =>{
//          setShowForm(false);
//          setShowList(true);
//    }
   
    return (
        <Fragment>

        <div className=" flex  justify-center items-center">
            <button className="bg-yellow-600 rounded-xl p-4 m-5" onClick={toggleFormVisibilityHandler}> {showForm ? "hide Form " : "Add New Member"}  </button>
            <button className="bg-yellow-600 rounded-xl p-4 m-5" > show all Mason List </button>
            <button className="bg-yellow-600 rounded-xl p-4 m-5" >
                <Link to="/"> Back To Home   </Link> 
            </button>
        </div>
        <div>
            {showForm && <NewMasonForm onClose = {toggleFormVisibilityHandler}></NewMasonForm>}
            {showList && <div className="flex justify-center flex-wrap">
                    {masonlist.map((data) => 
                     <MasonData data = {data} ></MasonData>)}
                    </div>
            }
        </div>
        </Fragment>
    )
}
export default MasonList;