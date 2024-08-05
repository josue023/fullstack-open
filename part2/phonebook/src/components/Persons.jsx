const Persons = ({ persons, filter, removePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => removePerson(person.id)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
