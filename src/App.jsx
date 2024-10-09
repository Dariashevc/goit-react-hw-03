import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import initialContacts from "./data/data.json";

function App() {
  const [contacts, setContacts] = useState(() => {
    const contactsFromLSData = JSON.parse(
      window.localStorage.getItem("contacts")
    );
    if (contactsFromLSData !== null && contactsFromLSData.contacts.length > 4) {
      return contactsFromLSData.contacts;
    }
    return initialContacts;
  });

  const [searchValue, setSearchValue] = useState("");

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const addContact = (newContact) => {
    setContacts((prevContactList) => {
      return [...prevContactList, newContact];
    });
  };

  const deleteContacts = (contactId) => {
    setContacts((prevContactList) =>
      prevContactList.filter((contact) => contact.id !== contactId)
    );
  };

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify({ contacts }));
  }, [contacts]);

  return (
    <div className="phonebookWrap">
      <h1>Phonebook</h1>

      <ContactForm addContact={addContact} />
      <SearchBox
        searchValue={searchValue}
        handleSearchChange={setSearchValue}
      />
      <ContactList
        contacts={filteredContacts}
        deleteContacts={deleteContacts}
      />
    </div>
  );
}

export default App;
