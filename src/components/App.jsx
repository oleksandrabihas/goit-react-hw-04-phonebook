import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ConctactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Wrapper } from 'App.styled';
import { NotificationMessage } from './NotificationMessage/NotificationMessage';

export const App = () => {
  const [contacts, setContants] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) setContants(JSON.parse(savedContacts));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    setContants([...contacts, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const deleteContact = contactId => {
    setContants(prev => prev.filter(contact => contact.id !== contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      {contacts.length !== 0 ? (
        <>
          <Filter
            contacts={contacts}
            filter={filter}
            onChangeFilter={changeFilter}
          />
          <ContactList
            filteredContacts={filteredContacts}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        <NotificationMessage />
      )}
    </Wrapper>
  );
};
