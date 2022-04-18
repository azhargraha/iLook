import React, { useRef, useState, useEffect } from 'react';

import '../style/Plan.scss';

import Button from '../component/Button';
import Textfield from '../component/Textfield';

import gsap from 'gsap';
import axios from 'axios';

const fadeIn = () => {
  return {
    y: 10,
    opacity: 0,
    ease: 'Power3.easeOut',
    delay: .2,
    duration: 1.2
  };
};

const expand = () => {
  return {
    opacity: 0,
    ease: 'Power3.easeOut',
    width: 0,
    delay: .4,
    duration: 1.2
  };
};

const Plan = () => {
  const [modalActive, setModalActive] = useState(false);
  const [planData, setPlanData] = useState([]);

  const showModal = (e) => {
    e.preventDefault();
    setModalActive(true);
  }

  const editPlan = (e) => {
    e.preventDefault();
  }

  const deletePlan = (e, id) => {
    e.preventDefault();

    axios.get('sanctum/csrf-cookie').then(response => {
      axios.delete(`api/planner/delete/${id}`)
          .then(res => {
              if (res.data.status === 200) {
                console.log(res.data);
                setPlanData(planData.filter(data => data.planID !== id))
              }
          })
          .catch(err => console.log(err));
    });
  }

  useEffect(() => { 
    axios.get('api/planner')
      .then(res => {
        console.log(res)
        if (res.data.status === 200) {
          setPlanData(res.data.planner);
        }
      })
  }, [planData.length, modalActive]);

  return (
    <div className="plan-container">
      <Button label='Create new plan' onClick={showModal}/>
      {modalActive && <CreateModal modalState={setModalActive} />}
      <div className="plans-wrapper">
        {
          planData.map((item, i) => {
            return (
              <div key={i}>
                <h1>{item.nama}</h1>
                <h4>{item.end_at}</h4>
                <h4>{item.start_at}</h4>
                <button type="button" id="delete-btn" onClick={e => deletePlan(e, item.planID)}>
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19L5 5" strokeWidth="5" strokeLinecap="round"/>
                    <path d="M5 19L19 5" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button type='button' onClick={editPlan}>Edit</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const CreateModal = ({ modalState }) => {
  const heading = useRef();
  const label1Ref = useRef();
  const label2Ref = useRef();
  const input1Ref = useRef();
  const input2Ref = useRef();

  const [planData, setPlanData] = useState({
    nama: '',
    start_at: '',
    end_at: ''
  });

  const closeModal = (e) => {
    e.preventDefault();
    modalState(false);
  }

  const setName = (e) => {
      setPlanData({
          ...planData,
          nama: e
      });
  }

  const setStart = (e) => {
      let value = e.target.value.split('-');
      let year = value[0];
      let month = value[1];
      let day = value[2];
      value = year + '-' + month + '-' + day;

      setPlanData({
          ...planData,
          start_at: value
      });
  }

  const setEnd = (e) => {
    let value = e.target.value.split('-');
    let year = value[0];
    let month = value[1];
    let day = value[2];
    value = year + '-' + month + '-' + day;

    setPlanData({
        ...planData,
        end_at: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get('sanctum/csrf-cookie').then(response => {
        axios.post(`api/planner/create`, planData)
            .then(res => {
                if (res.data.status === 200) {
                  console.log(res.data);
                  modalState(false);
                }
            })
            .catch(err => console.log(err));
    });
  }

  useEffect(() => {
    gsap.from(heading.current, fadeIn());
    gsap.from(label1Ref.current, fadeIn());
    gsap.from(input1Ref.current, expand());
    gsap.from(label2Ref.current, fadeIn());
    gsap.from(input2Ref.current, expand());
}, []);

  return (
    <div className="modal-container" onClick={closeModal} >
      <div className="modal-card" onClick={e => e.stopPropagation()}>
          <div ref={heading} className="heading-container">
              <h1>Create plan</h1>
              <button type="button" onClick={closeModal}>close</button>
          </div>

          <form onSubmit={handleSubmit}>
              <div className="section">
                  <div className="fields-container">
                      <Textfield type='text' label="Plan name" placeholder='Enter plan name' getInput={setName} required />
                      <div className="date-container">
                          <label ref={label1Ref} htmlFor="start">Start at</label>
                          <input ref={input1Ref} type="date" id="start" onChange={setStart} />
                      </div>
                      <div className="date-container">
                          <label ref={label2Ref} htmlFor="end">End at</label>
                          <input ref={input2Ref} type="date" id="end" onChange={setEnd} />
                      </div>
                  </div>
              </div>

              <div className="submit-section-wrapper">
                  <Button type="submit" label="Create" />
              </div>
          </form>
      </div>
    </div>
  )
}

export default Plan;