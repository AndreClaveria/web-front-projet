import React from "react";
import styles from "./index.module.scss";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <Input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <Button
        type="submit"
        title="Chercher un freelance"
        btn="btn"
        className="btn__primary"
      />
    </div>
  );
};

export default SearchBar;
