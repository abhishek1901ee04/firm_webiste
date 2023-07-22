import React from "react";

const Header = () =>{
    return (
        <div className="bg-yellow-600  flex justify-between">
            <div className="flex"> 
                <div className="flex flex-col border-r-4  border-white">
                    <span className="font-serif text-white font-extrabold ml-4 mt-4 text-3xl mylogo pr-4"> Trivedi</span>
                    <span className="font-serif text-3xl text-white font-bold ml-12 mylogo  pr-4">Traders</span>
                </div>
            
                <div className="ml-4 mt-4  font-bold font-lunasima flex flex-col text-white">
                    <span className="text-lg">Have any Question ?</span>
                    <div className=" flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.314 28.323" className="h-8">
                        <path d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 0 0 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z" fill="white"/>
                    </svg>
                        <span className="text-md pt-1 ml-3">  +91-9893640608</span>
                    </div>
                    
                </div>
            </div>
            
            <div className="mx-28">
                <ul className="flex flex-row mt-3 text-white text-lg font-lunasima ">
                    <li className="mx-4 bg-yellow-500 p-4 rounded-md cursor-pointer ">About</li>
                    <li className="mx-4  bg-yellow-500 p-4 rounded-md cursor-pointer">Contact</li>
                    <li className="mx-4  bg-yellow-500 p-4 rounded-md cursor-pointer">Products</li>
                    <li className="mx-4  bg-yellow-500 p-4 rounded-md cursor-pointer">MasonEntry</li>
                </ul>
            </div>
        </div>
    )
}
export default Header ;