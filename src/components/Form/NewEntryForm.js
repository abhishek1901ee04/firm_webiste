import React, { useRef } from "react";
import sendSMS from "../smsService";
const NewEntryForm = (props) =>{
    
    // const handleChange = (event) => {
    //     setInputValue(Number(event.target.value)); // Convert the input value back to a number
    //   };
    const submitFormHandler =()=>{
        
        const data = {
            name: nameRef.current.value,
            phone : phoneRef.current.value,
            date : dateRef.current.value,
            cement : cementRef.current.value,
            steel : steelRef.current.value,
            points : Number((Number(cementRef.current.value) *5)+((Number(steelRef.current.value)/100 )* 40))
        }
        
        addPointsData(data);
        const message = `  श्री ${data.name}, आपके प्रोफाइल बिंदुओं को सफलतापूर्वक अपडेट कर दिया गया है। आपके खाते में ${data.points} नए पॉइंट्स जोड़े गए हैं। हम आपको त्रिवेदी ट्रेडर्स वेबसाइट के सदस्य बनने के लिए धन्यवादी हैं।

        आपको और जानकारी प्राप्त करने के लिए कृपया हमारी वेबसाइट पर जाएं या हमें +91 9893640608 पर कॉल करें।
        
        हमें आशा है कि आप हमारे साथ एक सुखद अनुभव प्राप्त करेंगे।`;
        const reqphoneNo = `+91${data.phone}`;
        try {
          sendSMS(reqphoneNo,message);
        } catch (error) {
          console.error(error.message);
        }
        
        props.onClose();
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
        <form onSubmit={submitFormHandler} className="flex justify-center">
  <div className="border-4 border-sky-900 w-[50%] bg-[#] p-8 rounded-lg">
    <div className="flex flex-col mb-4">
      <label htmlFor="name" className="text-lg text-white font-lunasima font-bold">
        Name
      </label>
      <input type="text" id="name" value={props.data.name} className="text-center p-2 rounded-md" ref={nameRef} />
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="phoneno" className="text-lg text-white font-lunasima font-bold">
        Phone No
      </label>
      <input type="text" id="phoneno" value={props.data.phoneNo} className="text-center p-2 rounded-md" ref={phoneRef} />
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="date" className="text-lg text-white font-lunasima font-bold">
        Date
      </label>
      <input type="date" id="date" className="text-center p-2 rounded-md" ref={dateRef} required />
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="cement" className="text-lg text-white font-lunasima font-bold">
        Cement Quantity
      </label>
      <input type="number" id="cement" className="text-center p-2 rounded-md" ref={cementRef} required />
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="steel" className="text-lg text-white font-lunasima font-bold">
        Steel Quantity
      </label>
      <input type="number" id="steel" className="text-center p-2 rounded-md" ref={steelRef} required />
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="points" className="text-lg text-white font-lunasima font-bold">
        Points
      </label>
      <input type="number" id="points" className="text-center p-2 rounded-md" disabled />
    </div>
    <button type="submit" className="bg-sky-500 rounded-xl text-white text-lg font-bold p-4 mt-5">
      Submit
    </button>
  </div>
</form>

    )
};
export default NewEntryForm;