import "./Header.css"
import React, { useEffect, useRef, useState } from 'react';
import {FaSearch} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const {currentUser} = useSelector( state => state.user);
    const dropdownRef = useRef(null);


     // Function to handle the click event of the "Sign In" button
  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    const submitHandler = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

      useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsHovered(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
      
    const closeDropdown = () => {
        setIsHovered(false);
    };

    const signOutHandler = async () =>{
        setIsHovered(false);
        try{
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout');
          const data = res.json();
          if(data.success === false){
            dispatch(signOutUserFailure(data.message));
            return;
          }
          setIsHovered(false);
          dispatch(signOutUserSuccess(data));
          navigate('/');
        }
        catch(error){
            console.log(error);
        }
      };

  return (
    <header className='bg-white shadow-lg'>
        

        <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
            <Link to='/'>
                <div className=''>
                    <img src='https://urban-homes.s3.ap-south-1.amazonaws.com/black+logo.png'
                    className='h-[45px] w-[145px]'></img>
                    {/* <img src='https://urban-homes.s3.ap-south-1.amazonaws.com/logo+3.png'
                    className='h-[30px] w-[120px]'></img> */}
                </div>
            </Link>

            <form onSubmit={submitHandler} 
            className='bg-white border shadow-inner p-2 rounded-lg flex items-center  w-40 sm:w-64'>
                <input type='text' placeholder='search...' 
                 onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-transparent focus:outline-none px-2'></input>
                <button type='submit'>
                <FaSearch className='text-slate-600' />
                </button>
            </form>

            <ul className='flex gap-4 mt-3 flex-wrap'>
                <Link to='/'>
                <li className='hidden font-medium sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden font-medium sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                
                <div
                    ref={dropdownRef}
                    onClick={() => setIsHovered(true)}
                    className="relative inline-block space-x-2" >
                    <button >
                        {
                            currentUser ? (
                                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
                            ) : (
                                // <Link to='/sign-in'
                                //  className='text-slate-700 hover:underline'>Sign in</Link>
                                <Link to='/sign-in'
                                 className='text-white font-medium bg-blue-700 w-fit rounded-md px-4 py-2 ml-2 hover:underline'>Sign in</Link>
                            )
                        }
                    </button>
                    {
                      currentUser &&  isHovered && (
                            <div
                            
                            className="parent absolute w-40 z-10 top-full left-0 bg-white shadow-lg rounded-md p-2 mt-2 flex flex-col">

                                <Link to="/profile" 
                                className="w-full">
                                <p className="block child w-full font-medium text-left py-1 px-3 hover:bg-gray-200 group">Profile</p>
                                </Link>

                                <Link to='/show-listing' 
                                className="w-full">
                                <p className="block font-medium child w-full text-left py-1 px-3 hover:bg-gray-200 ">My listing</p>
                                </Link>

                                <Link to="/create-listing" 
                                 className="block font-medium w-full text-left py-1 px-3 hover:bg-gray-200">Create Listing</Link>

                                <button
                                type="button"
                                onClick={signOutHandler}  className="block w-full text-left py-1 px-3 hover:bg-gray-200 font-medium">Sign Out</button>
                            </div>
                        )
                    }
                </div>
                {/* <Link to='/profile'>
                    {
                        currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'></img>
                        ) : (
                            <li className=' text-slate-700 hover:underline'>Sign in</li>
                        )
                    }
                </Link> */}


                {/* <div className="ml-10 h-10 w-10 mt-1">
                <BiMessageSquareAdd />
            </div> */}
            </ul>
        </div>
    </header>
  )
}
