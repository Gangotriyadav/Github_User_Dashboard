import React, { useState } from "react";
import "./UserSearchBar.css";
import UserProfile from "./UserProfile";


function UserSearchBar() {
  const [user, setUser] = useState("");
  const [searchUser, setSearchUser] = useState("");

  function handleClickChange(e) {
    e.preventDefault();
    if (user.trim() !== "") {
      setSearchUser(user);
    } else {
      alert("Please enter a valid username!");
    }
  }

  return (
    <>
      <div className="user">
        <h1 className="head">GitHub User Dashboard</h1>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button className="btn" onClick={handleClickChange}>
          Search
        </button>
      </div>
      {searchUser && <UserProfile username={searchUser} />}
    </>
  );
}

export default UserSearchBar;
