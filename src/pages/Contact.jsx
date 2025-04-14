import React from 'react'
import PizzaLeft from '../assets/pizzaLeft.jpg'
import '../styles/Contact.css'

function Contact() {
  return (
    <div className='contact'>
        <div className='leftSide' style={{ backgroundImage:`url(${PizzaLeft})` }}>
        </div>
        <div className='rightSide'>
            <h1> Contect Us</h1>
            <form id='contect-form' method='POST'>
                <label htmlFor='name'>Full Name</label>
                <input name='name' placeholder='Enter full name...' type='text'/>
                <label htmlFor='email'>Email</label>
                <input name='email' placeholder='Enter email...' type='email'/>
                <label htmlFor='message'>Message</label>
                <textarea name='message' rows='6' placeholder='Enter message...' required></textarea>
                <button type='submit'>Sand Message</button>
            </form>
        </div>
    </div>
  )
}

export default Contact