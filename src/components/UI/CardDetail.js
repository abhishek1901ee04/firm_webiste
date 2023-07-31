import React from "react";

const CardDetail = (props) =>{
    
    const {firstname,middlename,lastname,phoneNo,aadharNo,village} = props.data;
    
    return (
        <div className="flex flex-col "> 
            <div>
                <span className="">Name : </span>
                <span>{`${firstname} ${middlename} ${lastname}`}</span>
            </div>
            <div>
                <span>Phone NO:</span>
                <span>{phoneNo}</span>
            </div>
            <div>
                <span>Village: </span>
                <span>{village}</span>
            </div>
            <div>
                <span>Aadhar NO :</span>
                <span>{aadharNo}</span>
            </div>
        </div>
    )
}
export default CardDetail;