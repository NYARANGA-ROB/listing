import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signInStart, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import {Link, Navigate, useNavigate} from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate()
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector(state => state.user);
  const [file,setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(false);
  const [FormData,setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);

  useEffect(()=> {
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, avatar: downloadURL })
        );
      }
    );
  };

  const changeHandler = (event) =>{
    setFormData({...FormData, [event.target.id]: event.target.value });
    console.log(event.target.id);
    console.log(event.target.value);
  }

  const submitHandler = async (e) => {
    console.log("updated...");
    e.preventDefault();   
     try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const deleteUserHandler = async () => {

    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    }
    catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  };

  const signOutHandler = async () =>{
    try{
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      naviagte('/')
    }
    catch(error){
      console.log(error);
    }
  };


  
  return (
    // className='p-3 max-w-lg mx-auto'
    <div className='overflow-hidden fixed' >
      <div className='text-white overflow-y-hidden w-screen flex justify-center  bg-cover bg-no-repeat py-6  ' 
    style={{backgroundImage: 'url(https://urban-homes.s3.ap-south-1.amazonaws.com/sign+bg.png)'}}>
      
      <div className="bg-white max-w-lg mx-auto overflow-hidden  border border-s1ate-400 rounded-md px-8 shadow-2xl backdrop-filter backdrop-blur-2xl bg-opacity-2 relative  flex flex-col justify-center item-center w-[1400px] ml-[500px]">

      <h1 className='text-3xl text-black font-semibold my-7 text-center'>Profile</h1>

      <form 
       onSubmit={submitHandler} 
       className='flex flex-col gap-3'>

        <input onChange={(event)=> setFile(event.target.files[0])} type='file'  ref={fileRef} hidden accept='image/*' multiple
        id='avatar'
        >
        </input>

        <img onClick={() => fileRef.current.click()} src={FormData.avatar ||currentUser.avatar}
        className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2 mb-4'
        ></img>

          <p className='self-center text-sm font-medium'>
            { 
              fileUploadError ? <span className='text-red-500'>Error Image upload (image must be less then 2 MB)</span> :
              filePercentage>0 && filePercentage < 100 ?
              <span className='text-slate-700'> {`Image uploading ${filePercentage} %`}</span> :
              filePercentage ===100 ? <span className='text-green-700'>
                Image successfully uploaded !
              </span> :
              ""         
            }
          </p>

          <input type='text' 
        placeholder='username' 
        id='username' 
        defaultValue={currentUser.username}
        onChange={changeHandler}
        className='border p-3 rounded-lg text-black'></input>

        <input type='email' 
        placeholder='email'
        id='email' 
        defaultValue={currentUser.email}
         onChange={changeHandler}
         className='border p-3 rounded-lg text-black'></input>

        <input type='password' 
        placeholder='password' 
        id='password' 
        onChange={changeHandler}
        className='border p-3 rounded-lg text-black`'
        autocomplete="current-password"></input>

        <button 
          disabled={loading}
          className='bg-black font-bold text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'updating...' : 'Update'}
        </button>

        <Link className='bg-blue-700 font-bold text-white text-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80' 
        to="/create-listing">
          Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={deleteUserHandler} className='text-red-600 font-medium cursor-pointer'>Delete account</span>
        
        <span onClick={signOutHandler} className='text-red-600 font-medium cursor-pointer'>Sign out</span>
    </div>
      

      {userListings && userListings.length > 0 && (
        <UserListing userListings={userListings} />
      )}
      </div>
  </div>
  </div>
  )
}

export default Profile
