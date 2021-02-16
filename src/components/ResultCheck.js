import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isReferenceResultValid } from "../utils";

/**
 * useResultCheck
 * @param {string} value
 * @param {object} result
 * @returns {boolean}
 */
function useResultCheck(value, result) {
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(isReferenceResultValid(value, result));
  }, [value, result]);
  return isValid;
}

/**
 * ResultCheck
 * @param {{inputValue: string=, result: object=}} props
 */
function ResultCheck(props) {
  const { inputValue, result } = props;
  const isValid = useResultCheck(inputValue, result);
  return <p>{isValid ? "✅" : "❌"}</p>;
}

ResultCheck.propTypes = {
  inputValue: PropTypes.string,
  result: PropTypes.object,
};

export default ResultCheck;
