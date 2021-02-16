import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { parseReference } from "../utils";
import ResultCheck from "./ResultCheck";

/**
 * useParser
 * @param {string} [value=""]
 * @returns {{author: string, title: string, publisher: string, href: string|null}}
 */
function useParser(value = "") {
  const [result, setResult] = useState({});
  useEffect(() => {
    setResult(parseReference(value));
  }, [value]);
  return result;
}

/**
 * ParserResult
 * @param {{inputValue: string=}} props
 */
function ParserResult(props) {
  const { inputValue } = props;
  const result = useParser(inputValue);
  return (
    <>
      <ResultCheck inputValue={inputValue} result={result} />
      <p>{JSON.stringify(result)}</p>
    </>
  );
}

ParserResult.propTypes = {
  inputValue: PropTypes.string,
};

export default ParserResult;
