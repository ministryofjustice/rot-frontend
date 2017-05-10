import React from 'react';

const CreateButton = ({ onClick, disabled }) => {
  return (
    <div className="form-group">
      <input
        className="button"
        type="submit"
        value="Create"
        onClick={ onClick }
        disabled={ disabled ? 'disabled' : null }
      />
    </div>
  );
}


export default CreateButton;
