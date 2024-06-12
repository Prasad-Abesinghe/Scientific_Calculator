import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeyWindow from "./KeyWindow";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayExp, setDisplayExp] = useState("");
  const [result, setResult] = useState("");

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    pi: "Math.PI",
    e: "Math.E",
    "^": "**",
    root: "Math.sqrt",
  };

  function calcResult() {
    if (expression.length !== 0) {
      try {
        let compute = eval(expression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
      } catch (error) {
        setResult("An Error Occured");
      }
    } else {
      setResult("An Error Occured");
    }
  }

  function handleButton(value) {
    if (value === "AC") {
      setExpression("");
      setDisplayExp("");
      setResult("");
    } else if (value === "DEL") {
      setDisplayExp(displayExp.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      setDisplayExp(displayExp + value);
      setExpression(expression + sciFunc[value]);
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayExp(displayExp + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") {
      calcResult();
    } else {
      setExpression(expression + value);
      setDisplayExp(displayExp + value);
    }
  }

  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="calculator">
      <DisplayWindow expression={displayExp} result={result} />
      <KeyWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculator;
