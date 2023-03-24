import { useEffect, useRef, useState } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

import { Container } from 'components/App/App.styled';

const contactsStorageName = 'contacts';

export function App() {
    const [contacts, setContacts] = useState(() => {
        const contactsFromStorage = localStorage.getItem(contactsStorageName);
        return contactsFromStorage ? JSON.parse(contactsFromStorage) : [];
    });
    const [filter, setFilter] = useState('');

    let isFirstUpdate = useRef(true);

    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return () => {};
        }
        localStorage.setItem(contactsStorageName, JSON.stringify(contacts));
    }, [contacts, contacts.length]);

    function handleChange(e) {
        setFilter(e.target.value);
    }

    function getDataFromForm(contact) {
        setContacts(prevContacts => {
            let isNameRepeat = false;
            prevContacts.map(prevContact => {
                if (
                    contact.name.toLowerCase() ===
                    prevContact.name.toLowerCase()
                ) {
                    alert(`${contact.name} is already in contacts.`);
                    isNameRepeat = true;
                }
                return null;
            });

            if (isNameRepeat) {
                return [...prevContacts];
            } else {
                return [...prevContacts, contact];
            }
        });
    }

    function handleDeleteClick(e) {
        setContacts(prevContacts => {
            const newContacts = prevContacts.reduce((acc, contact) => {
                if (e.target.id !== contact.id) {
                    return [...acc, contact];
                } else {
                    return [...acc];
                }
            }, []);

            return newContacts;
        });
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
        <Container>
            <h1>Phonebook</h1>
            <ContactForm getDataFromForm={getDataFromForm} />

            <h2>Contacts</h2>
            <Filter filter={filter} handleChange={handleChange} />

            <ContactList
                filteredContacts={filteredContacts}
                handleDeleteClick={handleDeleteClick}
            />
        </Container>
    );
}
