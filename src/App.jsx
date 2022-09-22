import React from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import { nanoid } from 'nanoid';
class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  handlerInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handlerSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;
    const dataContacts = {
      id: nanoid(),
      name,
      number,
    };
    const isInContacts = this.state.contacts.some(
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

    this.setState(prevState => ({
      contacts: [...prevState.contacts, dataContacts],
    }));

    e.currentTarget.elements.name.value = '';
    e.currentTarget.elements.number.value = '';
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  showFilteredInput = () => {
    if (this.state.filter === '') {
      return this.state.contacts;
    } else {
      return this.state.contacts.filter(el =>
        el.name.toLowerCase().includes(this.state.filter.toLowerCase())
      );
    }
  };

  filterChange = e => {
    let input = e.currentTarget.value;
    this.setState({ filter: input });
  };
  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          handlerInputChange={this.handlerInputChange}
          handlerSubmit={this.handlerSubmit}
        />
        <h2>Contacts</h2>
        <Filter filterChange={this.filterChange} />
        <ContactList
          contactsList={this.showFilteredInput}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
