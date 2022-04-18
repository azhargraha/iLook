import React, { useState, useEffect, useRef } from 'react';
import '../style/CreatePlan.scss';
import Textfield from '../component/Textfield';
import Button from '../component/Button';
import axios from 'axios';
import gsap from 'gsap';

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

const CreatePlan = () => {
    const heading = useRef();
    const label1Ref = useRef();
    const label2Ref = useRef();
    const input1Ref = useRef();
    const input2Ref = useRef();

    const [planData, setPlanData] = useState({
        nama: '',
        start_at: '',
        end_at: ''
    })

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
        console.log(planData)
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/planner/create`, planData)
                .then(res => {
                    console.log(res);
                //   if (res.data.status === 200) {
                //       navigate('/place');
                //   } else {
                //       console.log('false validation');
                //   }
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
    <div className="create-plan-container">
        <div className="form-wrapper">
        <div className="heading-container">
            <h1 ref={heading} >Create plan</h1>
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
                <Button type="submit" label="Create plan" />
            </div>
        </form>
        </div>
    </div>
  )
}

export default CreatePlan;