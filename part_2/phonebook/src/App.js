import axios from "axios";
import React, { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, SetNewNumber] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await personService.getAll();
      setPersons(data);
    };
    loadData();
  }, []);

  const emptyFields = () => {
    setNewName("");
    SetNewNumber("");
  };

  const addNote = async (e) => {
    e.preventDefault();

    let nameMatchObj = persons.find(
      (obj) => obj.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    let numberMatchObj = persons.find((obj) => obj.number === newNumber);

    const newObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (nameMatchObj && numberMatchObj) {
      alert(`${newName} already is already added to the phonebook`);
    } else if (nameMatchObj && !numberMatchObj) {
      const updatedPerson = await personService.update(nameMatchObj.id, nameMatchObj, newNumber);
      setPersons(persons.map((per) => (per.id !== updatedPerson.id ? per : updatedPerson)));
      emptyFields();
    } else {
      const data = await personService.create(newObj);
      setPersons([...persons, data]);
      emptyFields();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("You sure you want to delete?")) {
      await personService.remove(id);
      const arr = persons.filter((per) => per.id !== id);
      setPersons(arr);
      emptyFields();
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
          {usr.name} : {usr.number} <button onClick={() => handleDelete(usr.id)}>delete</button>
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
