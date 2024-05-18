import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';

const Hero = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchDogs = useCallback(async (page) => {
    setLoading(true);
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
      const response = await fetch(`https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=10`, requestOptions);
      const data = await response.json();
      setDogs(prevDogs => [...prevDogs, ...data]);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDogs(page);
    AOS.init({ duration: 1000 });
  }, [page, fetchDogs]);

  const lastDogElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleImageLoad = (index) => {
    setImageLoaded((prevState) => ({ ...prevState, [index]: true }));
  };

  if (loading && page === 1) {
    return <Spinner />;
  }

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1'>
      {dogs.map((dog, index) => (
        <div
          key={index}
          ref={dogs.length === index + 1 ? lastDogElementRef : null}
          className='bg-white p-2'
          data-aos="fade-up"
        >
          {dog.breeds.map((breed, breedIndex) => (
            <Popover key={breedIndex}>
              <PopoverTrigger asChild>
                <Link to={`/dog/${dog.id}`} className='cursor-pointer'>
                  <div className='relative'>
                    {!imageLoaded[index] && (
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='spinner w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin'></div>
                      </div>
                    )}
                    <img
                      src={dog.url}
                      alt={breed.name}
                      className={`w-full h-52 object-cover object-top ${!imageLoaded[index] ? 'hidden' : ''}`}
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                  <div className='flex flex-col text-center text-style'>
                    <div className='font-bold'>{breed.name}</div>
                    <div>{breed.bred_for}</div>
                  </div>
                </Link>
              </PopoverTrigger>
              <PopoverContent className='p-4 bg-white shadow-lg rounded-lg'>
                <h3 className='font-bold mb-2'>{breed.name}</h3>
                <p><strong>Bred for:</strong> {breed.bred_for}</p>
                <p><strong>Life Span:</strong> {breed.life_span}</p>
                <p><strong>Temperament:</strong> {breed.temperament}</p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      ))}
      {loading && <Spinner />}
    </div>
  );
};

export default Hero;
