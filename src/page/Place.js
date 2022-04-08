import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Searchbar from '../component/Searchbar';

import PlaceCard from '../component/PlaceCard';
import gsap from 'gsap';

import '../style/Place.scss';
import axios from 'axios';

function useWindowSize() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return width;
}

const Place = () => {
  const windowWidth = useWindowSize();

  const [placeData, setPlaceData] = useState(null);
  const [colNum, setColNum] = useState(5);
  const [inputValue, setInputValue] = useState(null);

  const { state } = useLocation();

  const searchSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get('api/pariwisata/', {
      cancelToken: source.token
    })
      .then(res => {
        setPlaceData(res.data.pariwisata);
      })
      .catch(err => console.log(err));

    return () => {
      source.cancel();
    }
  }, []);

  useEffect(() => {
    if (windowWidth < 620) {
      setColNum(1);
    } else if (windowWidth < 840) {
      setColNum(2);
    } else if (windowWidth < 1100) {
      setColNum(3);
    } else if (windowWidth < 1200) {
      setColNum(4);
    } else {
      setColNum(5);
    }
  }, [windowWidth]);

  return (
    <div className="place-container">
      <Searchbar placeholder="Search place here" getInput={setInputValue} value={state ? state : ''} onSubmit={searchSubmit} />
      {placeData ? <Results columnsNumber={colNum} posts={placeData} /> : <p>Loading...</p>}
      <Outlet />
    </div>
  )
}

const Results = ({ columnsNumber, posts }) => {
  let [data, setData] = useState(null);
  let container = useRef(null);

  useEffect(() => {
    let dataTemp = [];

    for (let i = 0; i < columnsNumber; i++) {
      let object = {};
      object[`column-${i}`] = [];
      dataTemp.push(object);
    }

    posts.forEach((post, idx) => {
      let col = idx % columnsNumber;
      dataTemp[col][`column-${col}`].push(post);
    });

    setData(dataTemp);
  }, [columnsNumber]);
  
  useEffect(() => {
    if (data) {
      gsap.fromTo(container.current.childNodes, {
        y: 70,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: 'Power3.easeOut',
        duration: 1,
        stagger: {
            each: .08
        }
      });
    }
  }, [data]);
  


  return (
    <div id="places-wrapper" ref={container}>
      { 
        data &&
        data.map((post, i) => {
          return(
            <div key={i} className="col">
              {
                post[`column-${i}`].map((props, key) => {
                  return (
                    <PlaceCard key={key} src={props.urlGambar} name={props.nama} location={props.lokasi} />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Place;