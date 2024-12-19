import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import { app } from '../firebase';
  

const CreateListing = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 2000,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
      });

      const [imageUploadError, setImageUploadError] = useState(false);
      const [uploading, setUploading] = useState(false);
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);
    console.log(formData);

    const imageSubmitHandler = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError('Image upload failed (2 mb max per image)');
              setUploading(false);
            });
        } else {
          setImageUploadError('You can only upload 6 images per listing');
          setUploading(false);
        }
      };

      const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      const deleteImageHandler = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
      };

      const changeHandler = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
          setFormData({
            ...formData,
            type: e.target.id,
          });
        }
    
        if (
          e.target.id === 'parking' ||
          e.target.id === 'furnished' ||
          e.target.id === 'offer'
        ) {
          setFormData({
            ...formData,
            [e.target.id]: e.target.checked,
          });
        }
    
        if (
          e.target.type === 'number' ||
          e.target.type === 'text' ||
          e.target.type === 'textarea'
        ) {
          setFormData({
            ...formData,
            [e.target.id]: e.target.value,
          });
        }
      };

      const submitHandler = async (e) => {
        e.preventDefault();
        try {
          if (formData.imageUrls.length < 1)
            return setError('You must upload at least one image');
          if (+formData.regularPrice < +formData.discountPrice)
            return setError('Discount price must be lower than regular price');
          setLoading(true);
          setError(false);
          const res = await fetch('/api/listing/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              userRef: currentUser._id,
            }),
          });
          const data = await res.json();
          setLoading(false);
          if (data.success === false) {
            setError(data.message);
          }
          navigate(`/listing/${data._id}`);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

  return (
    // className='p-3 max-w-4xl mx-auto'
    <main className='bg-white overflow-hidden'> 
      <div className='text-white bg-white overflow-x-hidden h-full w-screen flex justify-center  bg-cover bg-no-repeat py-14' 
      >
      
      <div className="bg-white max-w-6xl overflow-hidden  border border-s1ate-400 rounded-md px-8 shadow-2xl backdrop-filter backdrop-blur-2xl bg-opacity-2 relative pb-6 ">

        <h1 className='text-3xl text-blue-700 font-semibold text-center mt-7  mb-10'>Create a Listing</h1>

        <form onSubmit={submitHandler} className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input 
                type='text' placeholder='Name' id='name' maxLength='62' minLength='10'  required
                className='border p-3 rounded-lg text-black '
                onChange={changeHandler}
                value={formData.name}
                ></input>
                <textarea 
                type='text' placeholder='Description' id='description'  required
                className='border p-3 rounded-lg text-black'
                onChange={changeHandler}
                value={formData.description}
                ></textarea>
                <input 
                type='text' placeholder='Address' id='address' required
                className='border p-3 rounded-lg text-black'
                onChange={changeHandler}
                value={formData.address}
                ></input>
            

                <div className='flex flex-wrap gap-6 text-black'>
                <div className="flex gap-2">
                    <input type='checkbox' id='sale' className='w-5' 
                    onChange={changeHandler}
                    checked={formData.type === 'sale'}/>
                    <span>Sell</span>
                </div>
                <div className="flex gap-2">
                    <input type='checkbox' id='rent' className='w-5'
                    onChange={changeHandler}
                    checked={formData.type === 'rent'} />
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type='checkbox' id='parking' className='w-5'
                    onChange={changeHandler}
                    checked={formData.parking} />
                    <span>Parking spot</span>
                </div>
                <div className="flex gap-2">
                    <input type='checkbox' id='furnished' className='w-5'
                    onChange={changeHandler}
                    checked={formData.furnished} />
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input type='checkbox' id='offer' className='w-5'
                    onChange={changeHandler}
                    checked={formData.offer} />
                    <span>Offer</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-6 text-black">
                <div className="flex items-center gap-2">
                    <input type='number' id='bedrooms' min='1' max='10' required
                    className='border p-3 rounded-lg border-gray-300'
                    onChange={changeHandler}
                    value={formData.bedrooms}></input>
                    <span>Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                    <input type='number' id='bathrooms' min='1' max='10' required
                    className='border p-3 rounded-lg border-gray-300'
                    onChange={changeHandler}
                    value={formData.bathrooms}></input>
                    <span>Bathrooms</span>
                    <br/>
                </div>
                <div className="flex items-center gap-2">
                    <input type='number' id='regularPrice'  required
                    className='border p-3 rounded-lg border-gray-300'
                    onChange={changeHandler}
                    value={formData.regularPrice}></input>

                    <div className="flex flex-col items-center">
                        <p>Regular price</p>
                        <span className='text-xs'>(Rs / month)</span>
                    </div>
                    
                </div>

                {
                    formData.offer && (
                      
                    <div className="flex items-center gap-2">
                        <input type='number' id='discountPrice'  required
                        className='border p-3 rounded-lg border-gray-300'
                        onChange={changeHandler}
                        value={formData.discountPrice}></input>

                        <div className="flex flex-col items-center">
                            <p>Discounted price</p>
                            <span className='text-xs'>(Rs / month)</span>
                        </div>
                    </div>
                    )
                }
            </div>
         </div>

         <div className="flex  flex-col gap-4 flex-1">
            <p className='font-semibold'>Images:
            <span className='font-normal ml-2 text-gray-600'>The first image will be the cover (max 6)</span>
            </p>

            <div className="flex gap-4">
                <input
                onChange={(e) => setFiles(e.target.files)}
                type='file' id='images' accept='image/*' multiple
                className='p-3 border border-gray-300 rounded w-full text-black'></input>
                <button
                disabled={uploading}
                type='button' onClick={imageSubmitHandler}
                 className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                >
                    {uploading ? 'Uploading...' : 'Upload'}</button>
            </div>
            <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => deleteImageHandler(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
            <button 
            disabled={loading || uploading}
            className='p-3 font-medium bg-blue-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            > {loading ? 'Creating...' : 'Create listing'}</button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
         </div>

        </form>
      </div>
      </div>
    </main>
  )
}

export default CreateListing
