import React,{Fragment, useEffect, useState,useCallback,useRef} from "react";
import { getDatabase, ref, onValue,get } from "firebase/database";
import MasonData from "./MasonData";
import NewMasonForm from "./NewMasonForm"
import { Link } from "react-router-dom";
import app from "../firebase";
const MasonList = () =>{
   const [showForm, setShowForm] = useState(false);
   const database = getDatabase(app);
   const [showList,setShowList] = useState(true);
   const [masonlist,setMasonList] = useState([]);
   const [isLoading,setIsLoading] = useState(false);
   const [error,setError] = useState(null);
   const [masonIdPhoneMap,setMasonIdPhoneMap] = useState({});
    const phoneRef = useRef();
    // const getMasonDetails = (phoneno,callback) => {
    //     // Construct the path to the "masonDetail" folder for a specific masonId
    //     const masonId = masonIdPhoneMap[phoneno];
    //     const masonDetailRef = ref(database, `masonDetail/${masonId}`);
      
    //     // Listen for value changes in the specific masonDetail location
    //     onValue(masonDetailRef, (snapshot) => {
    //       // The snapshot will contain the data inside the masonDetail folder for the given masonId
    //       const masonData = snapshot.val();
      
    //       // Do something with the data...
    //     //   console.log("Mason Data:", masonData);
    //       callback(masonData);
    //     }, (error) => {
    //       console.error("Error fetching mason detail:", error);
    //     });
    // };
    const getAllMasonDetails = useCallback(() => {
        return new Promise((resolve, reject) => {
          const masonDetailRef = ref(database, "masonDetail");
      
          // Listen for value changes in the "masonDetail" folder
          onValue(masonDetailRef, (snapshot) => {
            // The snapshot will contain the data inside the "masonDetail" folder
            const masonData = snapshot.val();
            resolve(masonData); // Resolve the Promise with masonData
          }, (error) => {
            console.error("Error fetching mason details:", error);
            reject(error); // Reject the Promise in case of an error
          });
        });
      },[database]);
   const fetchMasonDatahandler = useCallback(async() =>{
    setIsLoading(true);
    setError(null);
    try{
        // const response = await fetch("https://masonlist-6cc7d-default-rtdb.firebaseio.com/masonDetail.json");
        // if(!response.ok){
        //     throw new Error("Something Went Wrong!!!!");
        // }
        
        let data =  [];
        const transformData = [];
        const handleData = async()=>{
            try{
               const  data = await getAllMasonDetails();
                // console.log(data);
                return data;
            }catch(error){
                console.error(error.message);
                return null;
            }
        }
        data = await handleData();
        
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
    const mapData = {};
    transformData.forEach((obj)=>{
        mapData[obj.phoneNo] = obj;
    });
    setMasonIdPhoneMap(mapData)
    // console.log(transformData);
    }catch(error){
        setError(error.message);
        console.log(error.message);
    }
    setIsLoading(false);
   },[getAllMasonDetails]);

  
   useEffect( () =>{
    fetchMasonDatahandler();
   },[fetchMasonDatahandler]);


   const toggleFormVisibilityHandler = () =>{
        setShowForm(!showForm);
   }
   const searchByNumberHandler = () =>{
    const val =  phoneRef.current.value;
    console.log(val);
    
    console.log(masonIdPhoneMap);
    console.log(masonIdPhoneMap[val]);
    const obj =[];
    obj.push(masonIdPhoneMap[val]);
    setMasonList(obj);
    console.log(masonlist);
   
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
        <div className="flex justify-center">
            <form onSubmit={searchByNumberHandler} className="flex justify-center">
                <label className="mx-4 my-2 text-lg font-lunasima">Search by number : </label>
                <input className="  text-center p-2 px-4 text-lg font-lunasima rounded-lg " type ="text" placeholder="Number"  ref={phoneRef}/>
                <button className="bg-sky-600 mx-4 px-4 py-2  rounded-xl hover:bg-yellow-500" onClick={searchByNumberHandler} > 
                    <svg class="feather feather-search" fill="none" height="32" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" >
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" x2="16.65" y1="21" y2="16.65"/>
                    </svg>
                </button>
            </form>
        </div>
     
        <div>
            {showForm && <NewMasonForm onClose = {toggleFormVisibilityHandler}></NewMasonForm>}
            {showList && <div className="flex justify-center flex-wrap">
                    {masonlist.map((data) => 
                     <MasonData key = {data.id} data = {data} ></MasonData>)}
                    </div>
            }
        </div>
        </Fragment>
    )
}
export default MasonList;