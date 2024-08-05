import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import api from "./services/api";
import Notification from "./components/Notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({
    content: null,
    type: null,
  });

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    api.getAll().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        api
          .update(existingPerson.id, personObject)
          .then((data) => {
            setPersons(persons.map((p) => (p.id !== data.id ? p : data)));
            setNewName("");
            setNewNumber("");
            setMessage({
              content: `number changed for ${newName}`,
              type: "success",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              content: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            console.log(error);
          });
      }
    } else {
      api
        .create(personObject)
        .then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
          setMessage({
            content: `Added ${newName}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            content: `Error: ${error.response.data.error}`,
            type: "error",
          });
          console.log(error);
        });
    }
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      api
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({
            content: `Deleted ${person.name}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            content: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  );
};

export default App;
