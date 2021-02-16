import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Input
 * @param {{children: array|object}=} props
 */
function Input(props) {
  const { children } = props;
  const [value, setValue] = useState();

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const elements =
    children &&
    React.Children.toArray(children).map((child) =>
      React.cloneElement(child, {
        inputValue: value,
      })
    );
  return (
    <>
      <label htmlFor="input">
        <input
          id="input"
          type="text"
          placeholder="Paste reference"
          autoComplete="off"
          onChange={handleChange}
        />
      </label>
      {elements}
    </>
  );
}

Input.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Input;
