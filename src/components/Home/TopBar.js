import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

const Header = () =>{
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showDropMenu,setShowDropMenu] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          // Get the current window width
          

          const windowWidth = window.innerWidth;
    
          // Check if the window width is less than or equal to the small (sm) breakpoint (640px)
          const isSmScreen = windowWidth <= 640;
    
          // Update the state variable based on the screen width
          setIsSmallScreen(isSmScreen);
        };
    
        // Call handleResize on initial mount and whenever the window is resized
        handleResize();
        window.addEventListener("resize", handleResize);
    
        // Clean up the event listener on component unmount
        console.log(isSmallScreen);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [isSmallScreen]);
    const menuHandler = ()=>{
        setShowDropMenu(!showDropMenu);
    }
   const menu =  <div className="mx-28">
                <ul className="flex flex-col sm:flex-row  mt-3 text-white text-lg font-lunasima ">
                    <li className="mx-4 bg-yellow-500 p-4 rounded-md cursor-pointer ">
                        <Link to ="/">Home</Link>
                    </li>
                    <li className="mx-4 bg-yellow-500 p-4 rounded-md cursor-pointer ">About</li>
                    <li className="mx-4  bg-yellow-500 p-4 rounded-md cursor-pointer">Contact</li>
                    <li className="mx-4  bg-yellow-500 p-4 rounded-md cursor-pointer">Products</li>
                    <li className="mx-4  bg-yellow-500 p-4 rounded-md cursor-pointer" >
                        <Link to ="/masonListpage">MasonEntry</Link>
                    </li>
                </ul>
                </div>;
    const dropMenu = <div className="absolute right-0 top-14  mr-6">
                        <ul className="flex flex-col justify-between mt-3 text-white text-lg font-lunasima ">
                            <li className="my-2 bg-yellow-500 p-4 rounded-md cursor-pointer ">
                                <Link to ="/">Home</Link>
                            </li>
                            <li className="my-2 bg-yellow-500 p-4 rounded-md cursor-pointer ">About</li>
                            <li className="my-2  bg-yellow-500 p-4 rounded-md cursor-pointer">Contact</li>
                            <li className="my-2  bg-yellow-500 p-4 rounded-md cursor-pointer">Products</li>
                            <li className="my-2  bg-yellow-500 p-4 rounded-md cursor-pointer" >
                                <Link to ="/masonListpage">MasonEntry</Link>
                            </li>
                        </ul>
                    </div>;
    const dropDowmMenu = <div>
                            <button className="bg-yellow-400 p-3 rounded-full flex justify-center mt-5" onClick={menuHandler}>
                                <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z" fill="#4A5568" fill-rule="evenodd"/>
                                    <path clip-rule="evenodd" d="M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z" fill="#4A5568" fill-rule="evenodd"/>
                                    <path clip-rule="evenodd" d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z" fill="#4A5568" fill-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>;
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
                        <path d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 00 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z" fill="white"/>
                    </svg>
                        <span className="text-md pt-1 ml-3">  +91-9893640608</span>
                    </div>
                    
                </div>
            </div>
            {isSmallScreen && dropDowmMenu}
            {( isSmallScreen && showDropMenu) && dropMenu}
            {!isSmallScreen && menu}
            
        </div>
    )
}
export default Header ;