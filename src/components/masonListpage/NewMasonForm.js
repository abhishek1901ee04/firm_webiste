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
 
    const submitForm = (event) =>{
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
      <form onSubmit={submitForm} className="flex flex-col items-center space-y-8 my-5">
      <div className="bg-slate-500 p-6 rounded-lg shadow-md w-96 space-y-4">
        <div className="text-white font-bold">
          <label htmlFor="fname">First Name</label>
          <input
            id="fname"
            type="text"
            className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600"
            onChange={firstNameHandler}
            required
          />
        </div>
    
        <div className="text-white font-bold">
          <label htmlFor="mname">Middle Name</label>
          <input
            id="mname"
            type="text"
            className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600"
            onChange={middleNameHandler}
            required
          />
        </div>
    
        <div className="text-white font-bold">
          <label htmlFor="lname">Last Name</label>
          <input
            id="lname"
            type="text"
            className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600"
            onChange={lastNameHandler}
            required
          />
        </div>
    
        <div className="text-white font-bold">
          <label htmlFor="vname">Village Name</label>
          <input
            id="vname"
            type="text"
            className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600"
            onChange={villageNameHandler}
            required
          />
        </div>
    
        <div className="text-white font-bold">
          <label htmlFor="occ">Occupation</label>
          <div className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600">
            <select
              value={selectedValue}
              onChange={handleChange}
              className="w-full bg-white text-gray-900 rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="option1">Karigar</option>
              <option value="option2">ThekeDar</option>
              <option value="option3">Tractor Owner</option>
            </select>
          </div>
        </div>
    
        <div className="text-white font-bold">
          <label htmlFor="mNum">Mobile Number</label>
          <input
            id="mNum"
            type="text"
            className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600"
            onChange={phoneNoHandler}
            required
          />
        </div>
    
        <div className="text-white font-bold">
          <label htmlFor="ANo">Aadhar Card No</label>
          <input
            id="ANo"
            type="text"
            className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600"
            onChange={aadharNoHandler}
            required
          />
        </div>
    
        <div className="text-white font-bold">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600"
            onChange={emailHandler}
            required
          />
        </div>
    
        <div className="flex flex-col items-center">
          <label htmlFor="imageInput" className="text-white font-bold">
            Select an image:
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
            required
          />
          <button
            onClick={uploadImage}
            className={`p-4 rounded-2xl ${
              uploaded ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            } font-bold hover:bg-opacity-80 transition-all duration-300 ease-in-out`}
            type="button"
          >
            {uploaded ? 'Uploaded' : 'Upload Image'}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="bg-sky-600 rounded-2xl p-4 mt-4 text-white font-bold shadow-md hover:bg-sky-700 cursor-pointer transition-all duration-300 ease-in-out"
      >
        Submit
      </button>
    </form>
    
          )
}
export default NewMasonForm;
