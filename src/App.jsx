import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import { nanoid } from 'nanoid';
const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputNumberChange = e => {
    setNumber(e.target.value);
  };
  const inputNameChange = e => {
    setName(e.target.value);
  };
  const handlerSubmit = e => {
    e.preventDefault();
    const dataContacts = {
      id: nanoid(),
      name,
      number,
    };
    const isInContacts = contacts.some(
      el =>
        el.name.toLowerCase() ===
        e.currentTarget.elements.name.value.toLowerCase()
    );
    if (isInContacts) {
      alert(`${e.currentTarget.elements.name.value} is already in contacts`);
      e.currentTarget.elements.name.value = '';
      e.currentTarget.elements.number.value = '';
      return;
    }

    setContacts(s => [...s, dataContacts]);

    e.currentTarget.elements.name.value = '';
    e.currentTarget.elements.number.value = '';
  };

  const removeContact = id => setContacts(s => s.filter(el => el.id !== id));

  const showFilteredInput = () =>
    filter === ''
      ? contacts
      : contacts.filter(el =>
          el.name.toLowerCase().includes(filter.toLowerCase())
        );

  const filterChange = e => setFilter(e.target.value);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  });
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm
        inputNumberChange={inputNumberChange}
        inputNameChange={inputNameChange}
        handlerSubmit={handlerSubmit}
      />
      <h2>Contacts</h2>
      <Filter filterChange={filterChange} />
      <ContactList
        contactsList={showFilteredInput}
        removeContact={removeContact}
      />
    </div>
  );
};

export default App;
