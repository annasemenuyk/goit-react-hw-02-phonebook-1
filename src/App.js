import React, { Component } from 'react';
import Form from './components/Form';
import { nanoid } from 'nanoid';

export default class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = formData => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, formData],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFiltredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  InputId = nanoid();

  render() {
    const { filter } = this.state;
    const filtredContacts = this.getFiltredContacts();

    return (
      <div className="App">
        <Form formData={this.formSubmitHandler} />
        {/* Contacts */}
        <div className="contacts">
          <h1 className="title">Contacts</h1>
          <label className="label" htmlFor={this.InputId}>
            Find contact by name
          </label>
          <input
            type="text"
            name="name"
            id={this.InputId}
            value={filter}
            onChange={this.changeFilter}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ul className="contacts-list">
            {filtredContacts.map(contact => (
              <li key={contact.id} className="item">
                {contact.name}: {contact.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
