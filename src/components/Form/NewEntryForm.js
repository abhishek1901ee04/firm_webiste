import React, { useRef, useState } from "react";

const NewEntryForm = (props) =>{
    const [inputValue,setInputValue] = useState(0);
    // const handleChange = (event) => {
    //     setInputValue(Number(event.target.value)); // Convert the input value back to a number
    //   };
    const submitFormHandler =()=>{
        props.onClose();
        const data = {
            name: nameRef.current.value,
            phone : phoneRef.current.value,
            date : dateRef.current.value,
            cement : cementRef.current.value,
            steel : steelRef.current.value,
            points : Number((Number(cementRef.current.value) *5)+((Number(steelRef.current.value)/100 )* 40))
        }
        
        addPointsData(data);
    };
    const addPointsData = async(pointsData) =>{
        const response = await fetch(`https://masonlist-6cc7d-default-rtdb.firebaseio.com/masonDetail/${props.data.id}/pointsData.json`,{
         method:"POST",
        body : JSON.stringify(pointsData),
        headers :{
            'Content-Type' : 'application/json'
        }
        });
        const data = await response.json();
        console.log(data);
    }
   
    const nameRef = useRef();
    const phoneRef = useRef();
    const dateRef = useRef();
    const cementRef = useRef();
    const steelRef = useRef();
 
    return (
        <form onSubmit = {submitFormHandler} className=" flex justify-center ">
            <div className="flex flex-col justify-center items-center border-4 border-sky-900 w-[50%] bg-[#]">
                <div className="flex flex-col w-[50%]">
                    <label htmlFor="name" className="text-lg text-white font-lunasima font-bold"> Name</label>
                    <input type ="text" id="name" value={props.data.name} className="text-center " ref={nameRef}/>
                </div>
                <div className="flex flex-col justify-around w-[50%]">
                    <label htmlFor="phoneno"> Phone No</label>
                    <input type ="text" id="phoneno" value={props.data.phoneNo} className="text-center" ref={phoneRef}/>
                </div>
                <div className="flex flex-col justify-around w-[50%]">
                    <label htmlFor="date"> Date</label>
                    <input type ="date" id="date" className="text-center" ref={dateRef}/>
                </div>
                <div className="flex flex-col justify-around w-[50%]">
                    <label htmlFor="cement"> Cement Quantity</label>
                    <input type ="number" id="cement" className="text-center" ref={cementRef}/>
                </div>
                <div className="flex flex-col justify-around w-[50%]">
                    <label htmlFor="steel"> steel Quantity</label>
                    <input type ="" id="steel" className="text-center" ref={steelRef}/>
                </div>
                <div className="flex flex-col justify-around w-[50%]">
                    <label htmlFor="points"> Points</label>
                    <input type ="number" id="points"  className="text-center" disabled />
                </div>
                <button type="submit" className="bg-sky-500 rounded-xl text-white text-lg font-bold p-4 mt-5"> Submit </button>
            </div>
        </form>
    )
};
export default NewEntryForm;