import React, {useState} from 'react'

import './ContactForm.css'

function ContactForm ({contactForEdit, onSubmit, onDelete}) {

  const [editContact, setEditContact] = useState(contactForEdit);

  function createEmptyContact(){
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }
    }
    
    const onInputChange = (e) => {
      setEditContact({...editContact,
        [e.target.name]: e.target.value,
      });
    }

    const onClearField = (e) => {
      const sibling = e.target.parentNode.firstChild;
      setEditContact({...editContact,
        [sibling.name]: '',
      });
    }

    const onFormSubmit = (e) =>{
      e.preventDefault();
      onSubmit(editContact)
      setEditContact(createEmptyContact());
    }

    const onContactDelete = () =>{
      onDelete(contactForEdit.id)
      setEditContact(createEmptyContact())
    }

    return (
      <form id ='contact-form' onSubmit={onFormSubmit}>
        <div className='form-container'>
          <div className='contact-info'>
            <input
              type='text'
              className = 'text-field'
              placeholder='First Name'
              name='firstName'
              value={editContact.firstName}
              onChange={onInputChange} >
              </input>
              <span className='clear' onClick={onClearField}>X</span>
          </div>
          <div className='contact-info'>
            <input
              type='text'
              className = 'text-field'
              placeholder='Last Name'
              name='lastName'
              value={editContact.lastName}
              onChange={onInputChange} >
              </input>
              <span className='clear' onClick={onClearField}>X</span>
          </div>
          <div className='contact-info'>
            <input
              type='text'
              className = 'text-field'
              placeholder='Email'
              name='email'
              value={editContact.email}
              onChange={onInputChange} >
              </input>
              <span className='clear' onClick={onClearField}>X</span>
          </div>
          <div className='contact-info'>
            <input
              type='text'
              className = 'text-field'
              placeholder='Phone'
              name='phone'
              value={editContact.phone}
              onChange={onInputChange} >
              </input>
              <span className='clear' onClick={onClearField}>X</span>
          </div>
        </div>
        <div className='btns'>
          <button id='save' type='submit'>
            Save
          </button>
          {editContact.id ? (
            <button
            id='delete'
            type='delete'
            onClick={onContactDelete}>
              Delete
            </button>
          ):(
            ''
          )}
        </div> 
      </form>
    )
  }

export default ContactForm;