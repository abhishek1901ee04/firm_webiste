import React, { useEffect,useCallback, useState } from "react";
import { useLocation,Link } from "react-router-dom";
// import CardDetail from "../UI/CardDetail";
import styles from "./profile.module.css";
import NewEntryForm from "../Form/NewEntryForm";

const Profile = (props) =>{
    const location = useLocation();
    const propsData = location.state;
    const[showForm,setShowForm] = useState(false);
    const showFormHandler = () =>{
        setShowForm(!showForm);
    }
    const hideFormHandler =() =>{
        setShowForm(false);
    }
    // console.log(propsData);
    const [pointsData ,setPointsData] = useState([]);
    const name = propsData.firstname +" "+ propsData.middlename +" "+ propsData.lastname ;
    const phone = propsData.phoneNo;
    const id = propsData.id;
    const data = {name: name,phoneNo:phone,id:id};
    const [totalPoints,setTotalPoints] = useState(0);
    const fetchPointsDetails = useCallback(async() =>{
      
        const response = await fetch(`https://masonlist-6cc7d-default-rtdb.firebaseio.com/masonDetail/${propsData.id}/pointsData.json`);
        try{
            if(!response.ok){
                throw new Error("Somehting Went Wrong!");
            }
            const data = await response.json();
            console.log(data);
            const transformData =[];
            let num =1;
            let value =0;
            for(const key in data){
                transformData.push({
                    id:num,
                    cement:data[key].cement + " Bag",
                    steel :data[key].steel + " kg",
                    date : data[key].date,
                    points: data[key].points,
                });
                num++;
                value +=data[key].points;
            }
            setTotalPoints(value);
            setPointsData(transformData);

        }catch(error){
            console.log(error.message);
        }
    },[propsData.id]);
    useEffect(()=>{
        fetchPointsDetails();
    },[fetchPointsDetails,showForm]);

   
    return (
        <React.Fragment >
            <div className="flex justify-center">
                <button className="bg-yellow-600 rounded-xl p-4 m-5" >
                    <Link to="/"> Back To Home   </Link> 
                </button>
                <button className="bg-yellow-600 rounded-xl p-4 m-5" >
                    <Link to="/masonListpage"> MasonList Page  </Link> 
                </button>
            </div>
            <div className={styles.overall}>
                <div className={styles.card}>
                    <h1 className={styles.h1}>{name}</h1>
                    <div className={styles.imagecrop}>
                        <img className={styles.avatar} src={propsData.image} alt="profileimage"></img>
                    </div>
                    <div className={styles.bio}>
                        <span>{`${propsData.firstname} ${propsData.middlename} ${propsData.lastname}`} </span>
                        <span className="text-lg">{propsData.occupation}</span>
                        <div className="flex items-center justify-center mt-2">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 2048 2048"
                            >
                            <g id="Layer_x0020_1" stroke="white"> 
                                <path
                                className="fil0"
                                d="M671.999 255.998H1376c44.033 0 84.041 17.992 113.026 46.975 28.983 28.984 46.975 68.993 46.975 113.026v95.997c0 17.673-14.328 32.001-32.001 32.001h-16.062v960H1504c17.673 0 32 14.328 32 32.001V1632c0 44.033-17.99 84.042-46.974 113.027C1460.042 1774.01 1420.033 1792 1376 1792H671.999c-44.033 0-84.041-17.991-113.026-46.974-28.983-28.985-46.975-68.993-46.975-113.026v-96.003c0-17.673 14.328-32 32.001-32h16.06v-960H544c-17.673 0-32-14.329-32-32.002V416c0-44.033 17.99-84.042 46.974-113.026 28.984-28.983 68.993-46.975 113.026-46.975zM1376 320H671.999c-26.367 0-50.361 10.81-67.775 28.223C586.81 365.637 576 389.631 576 415.998v63.997h16.06c17.674 0 32.002 14.328 32.002 32.001v1024c0 17.673-14.328 32-32.001 32H576v64.002c0 26.367 10.809 50.362 28.223 67.776 17.414 17.414 41.408 28.223 67.775 28.223H1376c26.367 0 50.361-10.81 67.775-28.223 17.414-17.414 28.224-41.409 28.224-67.775v-64.002h-16.062c-17.673 0-32-14.328-32-32v-1024c0-17.674 14.327-32.002 32-32.002h16.062v-63.997c0-26.367-10.81-50.36-28.224-67.775C1426.361 330.81 1402.367 320 1376 320z"
                                stroke="white" fill="white"/>
                                <path
                                className="fil0"
                                d="M550.966 479.998c-17.673 0-32 14.328-32 32 0 17.674 14.327 32.002 32 32.002H1497.036c17.673 0 32-14.328 32-32.001s-14.327-32.001-32-32.001H550.966zM550.966 1504c-17.673 0-32 14.328-32 32 0 17.674 14.327 32.002 32 32.002H1497.036c17.673 0 32-14.328 32-32.001s-14.327-32.001-32-32.001H550.966zM895.999 367.998c-17.673 0-32 14.328-32 32 0 17.674 14.327 32.002 32 32.002h256.002c17.673 0 32-14.328 32-32.001s-14.327-32.001-32-32.001H895.999zM971.672 1616c-17.673 0-32 14.328-32 32 0 17.674 14.327 32.002 32 32.002h104.655c17.673 0 32-14.328 32-32.001S1094 1616 1076.328 1616H971.672z"
                                stroke="white" fill="white"/>
                            </g>
                            <path d="M0 0h2048v2048H0z" stroke="white" strokeWidth={6} />
                            </svg>
                        <span className="text-lg text-gray-300 dark:text-gray-200 mx-4">{`+91${propsData.phoneNo}`}</span>
                        </div>
                    </div>
                    <div className={styles.stats}>
                      
                        <div className={styles.col}>
                            <p className={styles.stat}>457</p>
                            <p className={styles.label}>Total Points </p>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={showFormHandler}>Add Points</button>
                        <button className={styles.msg}>Message</button>
                    </div>
                </div>
                
            </div>
            <div>
                {showForm && <NewEntryForm data = {data} onClose = {hideFormHandler} ></NewEntryForm>}
            </div>
            <div className="text-white text-lg flex justify-center flex-col items-center m-16">
                 <h2 className="text-xl mb-6">Total Points : {totalPoints} </h2>
                    <table border="2" className="table-auto w-[50%] bg-[#7199A0]">
                        <thead>
                            <tr className="bg-slate-400">
                            <th className="border-4 border-slate-600 p-1">Id</th>
                            <th className="border-4 border-slate-600 px-1">Date</th>
                            <th className="border-4 border-slate-600 ">Cement</th>
                            <th className="border-4 border-slate-600 ">Steel</th>
                            <th className="border-4 border-slate-600 ">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pointsData.map((data) =>
                            <tr key={data.id}>
                                <td className="border-4 border-slate-700 ...">{data.id}</td>
                                <td className="border-4 border-slate-700 p-2">{data.date}</td>
                                <td className="border-4 border-slate-700 ...">{data.cement}</td>
                                <td className="border-4 border-slate-700 ...">{data.steel}</td>
                                <td className="border-4 border-slate-700 ...">{data.points}</td>
                            </tr>
                            )}
                           
                        </tbody>
                    </table>
            </div>
        </React.Fragment>
    //    <div>
    //     hello bros
    //    </div>
    )
}
export default Profile;


