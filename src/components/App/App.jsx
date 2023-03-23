import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

import { Container } from 'components/App/App.styled';

const contacts = 'contacts';
export class App extends Component {
  state = {
    [contacts]: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromStorage = localStorage.getItem(contacts);

    if (contactsFromStorage) {
      const parsedContacts = JSON.parse(contactsFromStorage);

      this.setState({
        [contacts]: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState[contacts].length !== this.state[contacts].length) {
      localStorage.setItem(contacts, JSON.stringify(this.state[contacts]));
    }
  }

  handleChange = e => {
    const nameOfInput = e.target.name;

    this.setState({
      [nameOfInput]: e.target.value,
    });
  };

  getDataFromForm = contact => {
    this.setState(prevState => {
      const prevContacts = [...prevState.contacts];

      prevContacts.map(prevContact => {
        if (contact.name !== prevContact.name) {
          return undefined;
        }
        alert(`${contact.name} is already in contacts.`);
        return {
          contacts: [...prevState.contacts],
        };
      });

      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  handleDeleteClick = e => {
    this.setState(prevState => {
      const prevContacts = prevState.contacts;
      const newContacts = prevContacts.reduce((acc, contact) => {
        if (e.target.id !== contact.id) {
          return [...acc, contact];
        } else {
          return [...acc];
        }
      }, []);

      return {
        contacts: newContacts,
      };
    });
  };

  render() {
    const { filter } = this.state;

    const normalizedFilter = this.state.filter.toLowerCase();

    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm getDataFromForm={this.getDataFromForm} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={this.handleChange} />

        <ContactList
          filteredContacts={filteredContacts}
          handleDeleteClick={this.handleDeleteClick}
        />
      </Container>
    );
  }
}
