import React, { useEffect, useState } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserListing = () => {
  const { currentUser } = useSelector(state => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        setUserListings(data); // Update userListings state with fetched data
      } catch (error) {
        console.error(error);
        setShowListingsError(true);
      }
    };

    if (currentUser?._id) {
      fetchData();
    }
  }, [currentUser._id]);

  const deleteListingHandler = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings(prevListings =>
        prevListings.filter(listing => listing._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='bg-white'>
    <div className='p-3 max-w-6xl mx-auto '>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 '>
          <h1 className='text-center text-blue-700 mt-2 text-2xl font-bold mb-6'>
            Your Listings
          </h1>

          <div className=" flex flex-wrap justify-between gap-4 max-w-full ">

          {userListings.map((listing,index) => (
            <div
              key={listing._id}
              className='max-w-6xl mx-auto flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                />
              </Link>
              <Link
                className='truncate text-xl font-semibold text-black'
                to={`/listing/${listing._id}`}
              >
                <p className='mt-4 ml-4 '>{listing.name}</p>
              </Link>

              {/* <div className='ml-3 flex items-center gap-1'>
                <MdLocationOn className='h-5 w-5 text-green-700' />
                <p className='mr-3 mt-2 truncate text-lg w-full'>{listing.address}</p>
              </div> */}

            <div className=' mx-3 mt-1 flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-blue-700' />
            <p className='text-lg text-black truncate w-full'>
              {listing.address}
            </p>

          </div>
            <p className='text-sm mx-4 text-black line-clamp-2'>
                <span className='font-medium'>Description -</span> 
            {listing.description}
          </p>

          <p className=' mx-4 text-black mt-2 font-semibold '>
            Rs{' '}
            {  listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
            {listing.type === 'sale' && ''}
          </p>

              <div className=' mx-7 my-4 flex gap-7 justify-between item-center flex-wrap'>
              <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-blue-700 uppercase font-medium hover:text-blue-600'>Edit</button>
                </Link>

                <button
                  onClick={() => deleteListingHandler(listing._id)}
                  className='text-red-700 uppercase font-medium hover:text-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default UserListing;
