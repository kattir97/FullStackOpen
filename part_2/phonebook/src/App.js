import axios from "axios";
import React, { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, SetNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState(null);

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

  const displayMessage = () => {
    if (!message) {
      return null;
    }

    setTimeout(() => setMessage(false), 3000);

    return <h3>{message}</h3>;
  };

  const addNote = async (e) => {
    e.preventDefault();

    try {
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
        setMessage("Number is updated");
        displayMessage();
        emptyFields();
      } else {
        const data = await personService.create(newObj);
        setPersons([...persons, data]);
        setMessage(`${newObj.name} is added`);
        setMessageClass("message");
        displayMessage();
        emptyFields();
      }
    } catch (error) {
      setMessage(`This person is already deleted`);
      setMessageClass("delerr");
      displayMessage();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("You sure you want to delete?")) {
      await personService.remove(id).catch((err) => {
        return err;
      });
      const arr = persons.filter((per) => per.id !== id);
      setPersons(arr);
      setMessage("Number is deleted");
      setMessageClass("delerr");
      displayMessage();
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
      <div className="container">
        {message ? (
          <div className={messageClass === "delerr" ? "delerr" : "message"}>
            {message ? displayMessage() : ""}
          </div>
        ) : null}
      </div>
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
