import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {findByName} from "../../redux/actions"
import styles from "./SearchBar.module.css"



function SearchBar() {

  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findByName(input));
    setInput("");
  };

  return (
    <div className={styles.search}>
      <input type="text" placeholder="Find your pokemon..." onChange={(e) => handleInput(e)} value={input} className={styles.input}/>
      <button type="submit" onClick={(e) => handleSubmit(e)} className={styles.searchButton}>Search</button>
    </div>
  );
}

export default SearchBar;