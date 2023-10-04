import React from "react";

import styles from "./index.module.css";
import { useState, useCallback } from "react";

export const InputPlus = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");

  const onAddMemoized = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        value={inputValue}
        className={styles.Value}
        placeholder="Type here..."
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onAddMemoized();
          }
        }}
      />
      <button
        onClick={onAddMemoized}
        aria-label="Add"
        className={styles.Button}
      />
    </div>
  );
};
