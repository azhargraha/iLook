import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

import '../style/PlaceDetails.scss';
import Rating from '../component/Rating';

const fadeIn = ({ y = -10, duration = .5, stagger = .2, staggerDirection = 1, delay = .2 }) => {
  return {
    y: y,
    opacity: 0,
    ease: 'Power3.easeOut',
    delay: delay,
    duration: duration,
    stagger: {
        each: stagger * staggerDirection
    }
  };
};

const PlaceDetails = () => {
  const { id } = useParams();

  const header = useRef();
  const subheader = useRef();
  const image = useRef();
  const details = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [placeData, setPlaceData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    location: '',
    rating: '',
    imgSrc: '',
    avgRating: 0.0
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    setIsLoading(true);

    axios.get(`api/pariwisata/${id}`, {
      cancelToken: source.token
    })
      .then(res => {
        let data = res.data.pariwisata;
        let avgRating = res.data.rating ? res.data.rating : 0;
        console.log(avgRating)
        setPlaceData({
          name: data.nama,
          price: data.harga,
          category: data.kategori.nama,
          description: data.deskripsi,
          location: data.lokasi,
          rating: data.rating,
          imgSrc: data.urlGambar,
          avgRating: parseFloat(avgRating)
        });
        setIsLoading(false);

        gsap.from(header.current, fadeIn({ y: 0, duration: 1.4 }));
        gsap.from(subheader.current.childNodes, fadeIn({ y: 20 }));
        gsap.from(image.current, fadeIn({ y: 20, delay: .4 }));
        gsap.from(details.current.childNodes, fadeIn({ y: 20, delay: .8 }));
      })
      .catch(err => console.log(err));

    return () => {
      source.cancel();
    }
  }, []);

  return (
    <div className="place-details-container">
      {
        isLoading === false && (
          <>
            <section id="left">
              <img ref={image} src={placeData.imgSrc} alt={placeData.name} />
            </section>

            <section id="right">
              <div className="headings">
                <h1 ref={header}>{placeData.name}</h1>
                <Rating value={placeData.avgRating} />
                <div ref={subheader} className="subheader">
                  <h4>{placeData.location}</h4>
                  <h4>{placeData.category}</h4>
                  <h4>Rp. {placeData.price}</h4>
                </div>
              </div>
              <div className="details-wrapper" ref={details}>
                <h2>Place Details</h2>
                <div className="desc-wrapper">
                  <p>{placeData.description}</p>
                </div>
              </div>
            </section>
          </>  
        )
      }
    </div>
  )
}

export default PlaceDetails;