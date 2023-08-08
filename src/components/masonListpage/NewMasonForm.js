import React, { useState,useRef } from "react";
import {ref,uploadBytes,getDownloadURL,getStorage} from "firebase/storage";
import sendSMS from "../smsService";
import app from "../firebase";
const storage = getStorage(app);

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
    const[error,setError] = useState("");
    const [imageError,setImageError] = useState("");

   
  
    const checkIfImageExists = async () => {
      try {
        const imageRef = ref(storage, `images/${phoneNo}`);
        await getDownloadURL(imageRef);
        return true; // Image exists at the given location
      } catch (error) {
        return false; // Image doesn't exist or there was an error fetching the download URL
      }
    };
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
       
       
       const message =  `बधाई हो! Mr.${data.firstName} ${data.middleName} ${data.lastName} आपका नंबर Trivedi Traders वेबसाइट पर सफलतापूर्वक पंजीकृत हो गया है। हम आपको हमारे समुदाय का हिस्सा बनने के लिए खुश हैं।

       अधिक जानकारी के लिए कृपया हमारी वेबसाइट पर जाएं या हमें +91 9893640608 पर कॉल करें।
       
       हम आशा करते हैं कि आप हमारे साथ एक सुखद अनुभव प्राप्त करेंगे।`;
       
       
      //  handleSendSMS(data.phoneNo , message);
      const reqphoneNo = `+91${phoneNo}`;
      
      addMasonHandler(data);
      try {
        sendSMS(reqphoneNo,message);
      } catch (error) {
        console.error(error.message);
      }
      
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
        // const data = await response.json();
        // console.log(data);
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
      const phone = event.target.value;
      setPhoneNo(phone);
      if(phone.length === 10){
        setError("");
      }
    }
    const aadharNoHandler = (event) =>{
        setAadharNo(event.target.value);
    }
    const emailHandler = (event) =>{
        setEmail(event.target.value);
    }
    
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleImageChange = (event) =>{
        const image  = event.target.files[0];
        console.log(image);
        setSelectedImage(image); 
    }

    const handleImageUpload = async () => {
      try {
        if (!selectedImage) {

          setImageError('Please select an image to upload.');
          return;
        }
    
        if (!phoneNo || phoneNo.length !== 10) {
          setError('Please enter a valid 10-digit mobile number.');
          return;
        }
        const imageExists = await checkIfImageExists();
        if (imageExists) {
          setError('This Mobile Number is already registered!!! Please choose a different number.');
          return;
        }
    
        const imageRef = ref(storage, `images/${phoneNo}`);
        const snapShot = await uploadBytes(imageRef, selectedImage);
        const url = await getDownloadURL(snapShot.ref);
        setImageUrls(url);
        setUploaded(true);
      } catch (error) {
        console.error('Error uploading image:', error);
        // setError('An error occurred while uploading the image.');
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
              className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black capitalize font-bold focus:text-left text-center"
              onChange={firstNameHandler}
              required
            />
          </div>
      
          <div className="text-white font-bold">
            <label htmlFor="mname">Middle Name</label>
            <input
              id="mname"
              type="text"
              className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black capitalize font-bold focus:text-left text-center"
              onChange={middleNameHandler}
              
            />
          </div>
      
          <div className="text-white font-bold">
            <label htmlFor="lname">Last Name</label>
            <input
              id="lname"
              type="text"
              className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black capitalize font-bold focus:text-left text-center"
              onChange={lastNameHandler}
              required
            />
          </div>
      
          <div className="text-white font-bold">
            <label htmlFor="vname">Village Name</label>
            <input
              id="vname"
              type="text"
              className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black capitalize font-bold focus:text-left text-center"
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
                className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black capitalize font-bold  text-center"
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
          className={`w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black focus:text-left text-center  ${
            error ? 'bg-red-200' : 'bg-white '
          }`}
          onChange={phoneNoHandler}
          value={phoneNo}
          required
          disabled={uploaded}
        />
        {error && <p className="text-red-600">{error}</p>}
          </div>
      
          <div className="text-white font-bold">
            <label htmlFor="ANo">Aadhar Card No</label>
            <input
              id="ANo"
              type="text"
              className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black capitalize font-bold focus:text-left text-center"
              onChange={aadharNoHandler}
              
            />
          </div>
      
          <div className="text-white font-bold">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="w-full p-2 rounded-md border focus:outline-none focus:border-sky-600 text-black   focus:text-left text-center"
              onChange={emailHandler}
              
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
              className={`my-2 ${
                imageError ?" border-red-600 border-4  p-2":""
              }`}
            />
            {imageError && <p className="text-red-600 text-xl mb-2 font-bold">{imageError}</p>}
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
