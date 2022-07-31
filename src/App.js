import React, {useState, useEffect} from 'react'
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import contactsService from './contacts-service.js';
 

function App() {
  const [contacts, setContacts] =  useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact(){
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  }
  useEffect(() => {
    contactsService.get('/').then(({data}) => {
      if(!data) {
        setContacts([]);
      }else{
        setContacts(data);
      }
    });
  }, [])

  const deleteContact = (id) =>{
    contactsService.delete(`/${id}`);
    const newContacts = [...contacts.filter((contact) => contact.id !== id)]
      setContacts(newContacts);
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
    contactsService.post('/', contact).then(({data})=>{
      const newContacts = [...contacts, data]
    setContacts(newContacts);
    });
    setContactForEdit(createEmptyContact());
    
  };

  function updateContact(contact) {
		contactsService.put(`/${contact.id}`, contact).then(({ data }) => {
			const newContacts = contacts.map((item) => item.id === data.id ? data : item);
			setContacts(newContacts);
		})
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