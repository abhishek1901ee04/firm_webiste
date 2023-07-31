import React, { useState } from "react";
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import storage from "../firebase";

const NewMasonForm = (props) =>{
    const [selectedImage ,setSelectedImage] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState("");
    const [middleName,setMiddleName] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [aadharNo,setAadharNo] = useState("");
    const [villageName,setVillageName] = useState("");
    const [selectedValue,setSelectedValue] = useState("");
    const [email,setEmail] = useState("");
    const [uploaded,setUploaded] = useState(false);
 
    const sumbitForm = (event) =>{
       event.preventDefault();
       const data= {
        firstName  : firstName,
        middleName : middleName,
        lastName : lastName,
        village : villageName,
        phoneNo  : phoneNo,
        aadharNo : aadharNo,
        image  : imageUrls,
        occupation : selectedValue,
        email: email,
       }
       console.log("form is submitting");
       console.log(imageUrls);
       console.log(data);
       addMasonHandler(data);
       props.onClose();
    }
    const addMasonHandler = async(masonData) => {
        const response = await fetch("https://masonlist-6cc7d-default-rtdb.firebaseio.com/masonDetail.json",{
            method:"POST",
            body:JSON.stringify(masonData),
            headers :{
                'Content-Type' : 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }
    const firstNameHandler = (event)=>{
        setFirstName(event.target.value);
    }
    const lastNameHandler = (event) =>{
        setLastName(event.target.value);
    }
    const middleNameHandler = (event) =>{
        setMiddleName(event.target.value);
    }
    const villageNameHandler = (event) =>{
        setVillageName(event.target.value);
    }
    const phoneNoHandler = (event) =>{
        setPhoneNo(event.target.value);
    }
    const aadharNoHandler = (event) =>{
        setAadharNo(event.target.value);
    }
    const handleImageChange = (event) =>{
        const image  = event.target.files[0];
        setSelectedImage(image); 
    }
    const emailHandler = (event) =>{
        setEmail(event.target.value);
    }
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleImageUpload = async()=>{
        try{
            const imageRef = ref(storage,`images/${phoneNo}`);

            const snapShot = await uploadBytes(imageRef,selectedImage);
            // get the url 
            const url = await getDownloadURL(snapShot.ref);
            setImageUrls(url);
            setUploaded(true);
        } catch(error){
            console.error("Error uploading image :",error);
        }
    };
    const uploadImage = () =>{
        handleImageUpload();
    }
    return (
        <form onSubmit = {sumbitForm} className=" flex flex-col items-center">
            <div className="flex flex-col bg-slate-500 items-center justify-between" >

                <label htmlFor="fname">First Name</label>
                <input id = "fname" type ="text" className="w-[60%]" onChange={firstNameHandler} />
                <label htmlFor="mname">Middle Name</label>
                <input id ="mname" type = "text" className="w-[60%]" onChange={middleNameHandler} />
                <label htmlFor="lname">last Name</label>
                <input id = "lname" type = "text" className="w-[60%]" onChange={lastNameHandler}/>
                <label htmlFor="vname">village Name</label>
                <input id = "vname" type = "text" className="w-[60%]" onChange={villageNameHandler}/>
                <label htmlFor="occ">Occupation</label>
                <div>
                    <select value={selectedValue} onChange={handleChange}>
                        <option value="">Select an option</option>
                        <option value="option1">Karigar </option>
                        <option value="option2">ThekeDar</option>
                        <option value="option3">tractor owner</option>
                    </select>
                </div>
                <label htmlFor="mNum">Mobile Number </label>
                <input id = "mNum" type = "text" className="w-[60%]" onChange={phoneNoHandler}/>
                <label htmlFor="ANo">Aadhar Card No</label>
                <input id="ANo" type ="text" className="w-[60%]" onChange={aadharNoHandler}/>
                <label htmlFor="email">Email</label>
                <input id="email" type ="text" className="w-[60%]" onChange={emailHandler}/>
                <div className="flex flex-col items-center m-5">
                    <label htmlFor="imageInput">Select an image:</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <button onClick={uploadImage} className="bg-gray-200 p-4 font-bold mt-2 rounded-2xl"  type = "button">{uploaded ? "Uploaded" :"Upload Image" }</button>
                </div>
            </div>
          <button type = "submit" className="bg-sky-600 rounded-2xl p-4 cursor-pointer m-4 text-white font-bold"> Submit</button>
        </form>
    )
}
export default NewMasonForm;
