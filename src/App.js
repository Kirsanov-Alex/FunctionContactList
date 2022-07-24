import React, {useState, useEffect} from 'react'
import './App.css' 

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
 

function App() {
  const [contacts, setContacts] =  useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact(){
    return {
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
    }
  }
  useEffect(() => {
    const newContacts = JSON.parse(localStorage.getItem('contacts'))
    if (!newContacts){
      setContacts([])
    }
    else {
      setContacts(newContacts)
    }
  }, [])

  function saveToStorage(contacts){
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  const deleteContact = (id) =>{
    const newContacts = [...contacts.filter((contact) => contact.id !== id)]
      setContacts(newContacts);
      saveToStorage(newContacts);
  }

  const saveContact = (contact) => {
    if (!contact.id){
      createContact(contact)
    }else {
      updateContact(contact)
    }
  };

  const addNewContact = () => {
    setContactForEdit(createEmptyContact());
  };

  const selectContact = (contact) => {
    setContactForEdit(contact);
  };

  function createContact(contact){
    contact.id = Date.now();
    const newContacts = [...contacts, contact]
    saveToStorage(newContacts);
    setContacts(newContacts);
    setContactForEdit(createEmptyContact());
    
  };

  function updateContact(contact){
      const newContacts = contacts.map((item) => 
      item.id === contact.id ? contact : item
      );
      setContacts(newContacts);
      setContactForEdit(createEmptyContact());
  };

    return (
    
        <div className="container">
          <div className='content'>
          <header>
            <h1>Contact List</h1>
          </header>     
          <main>
          <ContactList 
          contacts = {contacts}
          onDelete = {deleteContact}
          onAddContact = {addNewContact}
          onEditContact = {selectContact} 
          />
    
          <ContactForm 
          key={contactForEdit.id}
          contactForEdit = {contactForEdit}
          onSubmit = {saveContact}
          onDelete = {deleteContact}  
          />
          </main>
          </div>
      </div>
      
    )
  }

export default App