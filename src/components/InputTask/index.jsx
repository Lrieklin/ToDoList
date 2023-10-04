import React, { useLayoutEffect, useState, useRef } from "react";

import styles from "./index.module.css";

export const InputTask = ({ id, title, onDone, onRemove, onEdited }) => {
  const [checked, setChacked] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef(null);

  useLayoutEffect(() => {
    if (isEditMode && editTitleInputRef) {
      console.log(editTitleInputRef.current);
      editTitleInputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.Label}>
        <input
          type="checkbox"
          checked={checked}
          className={styles.Checkbox}
          onChange={(event) => {
            setChacked(event.target.checked);
            setTimeout(() => {
              onDone(id);
            }, 300);
          }}
        />
        {isEditMode ? (
          <input
            className={styles.TitleEdit}
            value={value}
            ref={editTitleInputRef}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        ) : (
          <h3 className={styles.Title}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          onClick={() => {
            onEdited(id, value);
            setEditMode(false);
          }}
          aria-label="Save"
          className={styles.Save}
        />
      ) : (
        <button
          onClick={() => {
            setEditMode(!isEditMode);
          }}
          aria-label="Edit"
          className={styles.Edit}
        />
      )}
      <button
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            onRemove(id);
          }
        }}
        aria-label="Remove"
        className={styles.Remove}
      />
    </div>
  );
};

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/
