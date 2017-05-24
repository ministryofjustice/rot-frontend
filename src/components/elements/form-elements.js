import React from 'react';
import ReactSelect from 'react-select';

export const Input = ({ name, label, value, error, onChange, type = 'text' }) => {
  const divClassName = ! error ? "form-group" : "form-group form-group-error";
  const inputClassName = ! error ? "form-control" : "form-control form-control-error";
  return (
    <div className={ divClassName }>
      <label className="form-label-bold" htmlFor={ name }>{ label }</label>
      {
        ! error ? null : (
            <span className="error-message">{ error }</span>
        )
      }
      <input
        id={ name }
        className={ inputClassName }
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
      />
    </div>
  );
};


export const TextArea = ({ name, label, value, error, onChange }) => {
  const divClassName = ! error ? "form-group" : "form-group form-group-error";
  const textAreaClassName = ! error ? "form-control" : "form-control form-control-error";
  return (
    <div className={ divClassName }>
      <label className="form-label-bold" htmlFor={ name }>{ label }</label>
      {
        ! error ? null : (
            <span className="error-message">{ error }</span>
        )
      }
      <textarea
        id={ name }
        className={ textAreaClassName }
        type="text"
        name={ name }
        value={ value }
        onChange={ onChange }
      />
    </div>
  );
};


export const SelectOne = ({ name, label, value, options, onChange }) => {
  return (
    <div className="form-group">
      <label className="form-label-bold" htmlFor={ name }>{ label }</label>
      <select
        id={ name }
        className="form-control"
        type="text"
        name="parent"
        value={ value }
        onChange={ onChange }
      >
        <option value={ null }></option>
        {
          options.map(
            option => (
              <option key={ option.id } value={ option.id }>
                { option.label }
              </option> )
          )
        }
      </select>
    </div>
  );
};


// TODO: create css
export const Select = ({ name, label, value, options, onChange, isMulti = false }) => (
  <div className="form-group">
    <label className="form-label-bold" htmlFor={ name }>{ label }</label>
    <ReactSelect
      name={ name }
      value={ value }
      options={ options }
      style={ { border: '2px solid #0b0c0c', width: '50%' } }
      menuContainerStyle={ { width: '50%' } }
      onChange={ onChange }
      multi={ isMulti }
    />
  </div>
);



export const Button = ({ type, value, onClick, disabled }) => {
  return (
    <div className="form-group">
      <input
        className="button"
        type={ type }
        value={ value }
        onClick={ onClick }
        disabled={ disabled ? 'disabled' : null }
      />
    </div>
  );
};
