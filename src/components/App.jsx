import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { VertFlexSection, OneLine } from './App.styled';
import { nanoid } from 'nanoid';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleContactFormSubmit = ({ contact }) => {
    const { name, number } = contact;

    this.setState(state => {
      return {
        contacts: [...state.contacts, { id: nanoid(), name, number }],
      };
    });
  };

  filterContacts = () =>
    this.state.contacts.filter(c =>
      c.name.toLowerCase().includes(this.state.filter)
    );

  handleFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  deleteContact = id => {
    this.setState(state => {
      return {
        contacts: state.contacts.filter(c => c.id !== id),
      };
    });
  };

  render() {
    const nameList = this.state.contacts.map(({ name }) => name);

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#010101',
          backgroundColor: 'var(--back-color-2)',
        }}
      >
        <VertFlexSection>
          <OneLine>
            <h2>Phonebook</h2>
          </OneLine>
          <ContactForm
            onSubmit={this.handleContactFormSubmit}
            nameList={nameList}
          />
          <h3>Contacts</h3>
          <Filter onChange={this.handleFilterChange} />
          <ContactList
            contacts={this.filterContacts()}
            onDelete={this.deleteContact}
          />
        </VertFlexSection>
      </div>
    );
  }
}
