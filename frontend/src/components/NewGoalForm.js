import React from 'react';
import { useState } from "react";



const NewGoalForm = () => {

  const [ text, setText ] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    
  }
  return (
    <><div>New Goal</div>
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)} />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section></>
    )
  }
  


export default NewGoalForm