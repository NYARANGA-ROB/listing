import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickGoogleHandler = async () =>{
        try{
            const provider =new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);

            const res = await fetch('api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName, 
                    email: result.user.email, 
                    photo: result.user.photoURL})
                })

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        }
        catch(error){
            console.log("could not sign in with google", error)
;        }
    }
  return (
    <button onClick={clickGoogleHandler} type='button' className='bg-blue-700 font-bold text-white border rounded-lg uppercase p-3 hover:opacity-95'>
      Continue with Google
    </button>
  )
}

export default OAuth;
