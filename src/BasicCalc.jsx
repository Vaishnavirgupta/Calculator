import React, { useState } from "react";
import "./CalcStyle.css";

const BasicCalc = () => {
  const [current, setCurrent] = useState("");
  const [previous, setprevious] = useState("");
  const [operations, setOperations] = useState("");
  const [history, setHistory] = useState([]);
  const [historyShow, setHistoryShow] = useState(false);
  const [isValue, setIsValue] = useState(false);
  let result;

  const appendValueHandler = (el) => {
    const value = el.target.getAttribute("data");
    if (value === "." && current.includes(".")) return;
    if (isValue) return;
    setCurrent(current + value);
  };

  const deleteHandler = () => {
    if (isValue) return;
    setCurrent(String(current).slice(0, -1));
  };

  const allclearHandler = () => {
    setCurrent("");
    setOperations("");
    setprevious("");
    setIsValue(false);
  };

  const chooseOperationHandler = (el) => {
    if (current === "") return;
    if (previous !== "") {
      let value = compute();
      setprevious(value);
    } else {
      setprevious(current);
    }
    setCurrent("");
    setIsValue(false);
    setOperations(el.target.getAttribute("data"));
  };

  const equalHandler = () => {
    let value = compute();
    if (value === undefined || value == null) return;
    setCurrent(value);
    setIsValue(true);
    setprevious("");
    setOperations("");
    setHistory((preval) => {
      return [...preval, previous, operations, current, value];
    });
  };

  const compute = () => {
    let previousNumber = parseFloat(previous);
    let currentNumber = parseFloat(current);
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (operations) {
      case "÷":
        result = previousNumber / currentNumber;
        break;
      case "%":
        result = (previousNumber * currentNumber) / 100;
        break;
      case "x":
        result = previousNumber * currentNumber;
        break;
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      default:
        return;
    }
    return result;
  };

  const showHistory = () => {
    if (current === "") return;
    setHistoryShow(!historyShow);
    console.log("Clicked");
  };

  return (
    <div className="Container">
      <div className="Screen">
        <div className="Previous">
          {previous} {operations}
        </div>
        <div className="Current">{current}</div>
        <button type="button" className="Button" onClick={showHistory}>
          <i className="fa fa-history" aria-hidden="true"></i>
        </button>
      </div>

      <button type="button" className="Button" onClick={allclearHandler}>
        AC
      </button>
      <button type="button" className="Button" onClick={deleteHandler}>
        DEL
      </button>
      <button
        type="button"
        className="Button"
        onClick={chooseOperationHandler}
        data={"÷"}
      >
        ÷
      </button>
      <button
        type="button"
        className="Button"
        onClick={chooseOperationHandler}
        data={"%"}
      >
        %
      </button>
      <button
        type="button"
        className="Button"
        data={7}
        onClick={appendValueHandler}
      >
        7
      </button>
      <button
        type="button"
        className="Button"
        data={8}
        onClick={appendValueHandler}
      >
        8
      </button>
      <button
        type="button"
        className="Button"
        data={9}
        onClick={appendValueHandler}
      >
        9
      </button>
      <button
        type="button"
        className="Button"
        data={"x"}
        onClick={chooseOperationHandler}
      >
        x
      </button>
      <button
        type="button"
        className="Button"
        data={4}
        onClick={appendValueHandler}
      >
        4
      </button>
      <button
        type="button"
        className="Button"
        data={5}
        onClick={appendValueHandler}
      >
        5
      </button>
      <button
        type="button"
        className="Button"
        data={6}
        onClick={appendValueHandler}
      >
        6
      </button>
      <button
        type="button"
        className="Button"
        data={"+"}
        onClick={chooseOperationHandler}
      >
        +
      </button>
      <button
        type="button"
        className="Button"
        data={1}
        onClick={appendValueHandler}
      >
        1
      </button>
      <button
        type="button"
        className="Button"
        data={2}
        onClick={appendValueHandler}
      >
        2
      </button>
      <button
        type="button"
        className="Button"
        data={3}
        onClick={appendValueHandler}
      >
        3
      </button>
      <button
        type="button"
        className="Button"
        data={"-"}
        operation
        onClick={chooseOperationHandler}
      >
        -
      </button>
      <button
        type="button"
        className="Button"
        data={"."}
        onClick={appendValueHandler}
        decimal
      >
        .
      </button>
      <button
        type="button"
        className="Button"
        data={"0"}
        onClick={appendValueHandler}
        disabled={current > 0 ? false : true}
      >
        0
      </button>
      <button
        type="button"
        className="Button"
        data={"00"}
        onClick={appendValueHandler}
        disabled={current > 0 ? false : true}
      >
        00
      </button>
      <button type="button" className="Button" onClick={equalHandler}>
        =
      </button>

      {historyShow && (
        <div className="container">
          <h3 className="text-light"> History View </h3>
          <ul className="list-unstyled text-light">
            {history.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <button
            type="button"
            className="Button"
            onClick={() => {
              setHistory([]);
            }}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default BasicCalc;
