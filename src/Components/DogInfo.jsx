import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CgMenuHotdog } from "react-icons/cg";
import { GiDogHouse } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Spinner from './Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DogDetail = () => {
  const { dogId } = useParams();
  const [dog, setDog] = useState(null);
  const [breed, setBreed] = useState(null);
  const [nav, setNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getDogDetails() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "x-api-key": "live_ESwaEKS4J8I7KJEKYOeVKiqTlidF7gsRKIXGw0JSZu0VnSw7retJ54XyddI2LrkD"
    });

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`https://api.thedogapi.com/v1/images/${dogId}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDog(data);
      // Fetch breed details
      if (data.breeds && data.breeds.length > 0) {
        const breedId = data.breeds[0].id;
        const breedResponse = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, requestOptions);
        if (!breedResponse.ok) {
          throw new Error('Failed to fetch breed details');
        }
        const breedData = await breedResponse.json();
        setBreed(breedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDogDetails();
    AOS.init({ duration: 1000 });
  }, [dogId]);

  if (loading) {
    return <div className='mx-auto'><Spinner /></div>;
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-red-500 font-bold'>Error: {error}</p>
      </div>
    );
  }

  if (!dog || !breed) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p className='text-gray-500 font-bold'>No dog details found.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-auto'>
      <div className={nav ? 'z-30 header w-[100%] fixed mt-[0%] lg:hidden duration-700 h-full' : 'z-10 header w-[100%] fixed lg:hidden mt-[-100%] duration-700'}>
        <div className='ml-[93%] mt-5 cursor-pointer' onClick={() => setNav(!nav)}><ImCross /></div>
        <Link to='/' className='home w-[80%] mx-auto mt-10 flex items-center p-2 gap-3 rounded-[1.3rem] cursor-pointer text-center'>
          <div className='p-2 rounded-[1.3rem] navbar'><GiDogHouse size={20} /></div>
          <p className='text-center mx-auto font-bold'>Home</p>
        </Link>
      </div>
      <div className={!nav ? 'header py-3 flex lg:hidden w-[100%] items-center justify-between duration-700' : 'w-[100%] header py-3 flex items-center justify-between duration-700'}>
        <h1 className='text-center mx-auto font-bold text-[2.5rem] text-white'>Doogle</h1>
        <div className='mr-5 lg:hidden cursor-pointer' onClick={() => setNav(!nav)}><CgMenuHotdog size={30} /></div>
      </div>

      <div className="max-w-3xl p-4 flex mt-[1.2rem] items-center flex-col mx-auto lg:flex-row">
        <img
          src={dog.url}
          alt={breed.name}
          className="w-[95%] lg:w-[78%] h-[20rem] lg:h-[35rem] z-10 bg-gray-500 lg:object-cover object-top object-fill shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-5 rounded-md"
          data-aos="fade-down"
        />
        <div className="mt-4 ml-0 lg:ml-[-1rem] rounded-md dog-info bg-white p-6 w-[95%] lg:w-[60%] h-[30rem] lg:h-[35rem] shadow-lg" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-center mb-4">{breed.name}</h1>
          <div className="text-lg">
            <div className="flex items-center gap-2 my-2">
              <h2 className="font-semibold">Breed Group:</h2>
              <p>{breed.breed_group || "N/A"}</p>
            </div>
            <div className="flex items-center gap-2 my-2">
              <h2 className="font-semibold">Bred For:</h2>
              <p>{breed.bred_for || "N/A"}</p>
            </div>
            <div className="flex items-center gap-2 my-2">
              <h2 className="font-semibold">Life Span:</h2>
              <p>{breed.life_span}</p>
            </div>
            <div className="flex gap-2 my-2">
              <h2 className="font-semibold">Temperament:</h2>
              <p>{breed.temperament}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetail;

