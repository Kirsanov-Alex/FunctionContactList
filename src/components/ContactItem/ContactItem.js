import React, {} from 'react'
import './ContactItem.css'

function ContactItem ({contact, onEdit, onDelete}) {

  const onItemDelete = (e) => {
    e.stopPropagation();
    onDelete(contact.id)
  }

  const onContactEdit = () => {
    onEdit(contact)
  }
  
   return (
      <div className='contact-item'
      onDoubleClick={onContactEdit}>
        <p className='group-name'>
          {contact.firstName} {contact.lastName}
        </p>
        <span 
        className='delete-btn'
        onClick= {onItemDelete}>
          X</span>
      </div>
    )
  }

export default ContactItem