import axios from "axios";
import React, { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  // const [searchResults, setSearchResults] = useState(persons);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, SetNewNumber] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const promise = await axios.get("http://localhost:3010/persons");
      const response = await promise;
      console.log(response.data);
      setPersons(response.data);
    };
    loadData();
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const newObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.find((obj) => obj.name.toLocaleLowerCase() === newName.toLocaleLowerCase())) {
      alert(`${newName} already is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newObj));
      setNewName("");
      SetNewNumber("");
    }
  };

  const onNoteChange = (e) => {
    setNewName(e.target.value);
  };
  const onNumberChange = (e) => {
    SetNewNumber(e.target.value);
  };
  const onSearch = (e) => {
    return setQuery(e.target.value);
  };

  const renderSearch = () => {
    return persons
      .filter((per) => per.name.toLowerCase().includes(query.toLowerCase()))
      .map((usr) => (
        <li key={usr.id}>
          {usr.name} : {usr.number}
        </li>
      ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearch={onSearch} />
      <br />
      <br />
      <PersonForm
        addNote={addNote}
        newName={newName}
        onNoteChange={onNoteChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />
      <h2>Numbers</h2>
      <Persons renderSearch={renderSearch} />
    </div>
  );
};

export default App;
