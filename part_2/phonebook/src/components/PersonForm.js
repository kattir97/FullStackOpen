import React from "react";

export const PersonForm = ({ newName, newNumber, addNote, onNoteChange, onNumberChange }) => {
  return (
    <div>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={onNoteChange} />
          <br />
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
