import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./store";
import { addUserThunk } from "./store";

function Users(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users) || [];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleAddUser = (evt) => {
    evt.preventDefault();
    dispatch(addUserThunk({ firstName, lastName, email }));
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleChange = (evt, nameToSet) => {
    nameToSet(evt.target.value);
  };

  return (
    <>
      <h1>Users</h1>
      {users.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{`${user.lastname}, ${user.firstname}`}</li>
          ))}
        </ul>
      )}
      Add User
      <form onSubmit={handleAddUser}>
        <input
          value={firstName}
          onChange={(evt) => handleChange(evt, setFirstName)}
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={(evt) => handleChange(evt, setLastName)}
          placeholder="Last Name"
        />
        <input
          value={email}
          onChange={(evt) => handleChange(evt, setEmail)}
          placeholder="email"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Users;
