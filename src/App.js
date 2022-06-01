import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import SalaryHeader from './components/SalaryHeader';
import SalaryIncome from './components/SalaryIncome';
import SalaryOutcome from './components/SalaryOutcome';
import SalaryRemain from './components/SalaryRemain';
import SalaryFooter from './components/SalaryFooter';

import { numberWithCommas } from './utils';

const App = () => {
  const [salary, setSalary] = useState('');
  const [days, setDays] = useState(30);
  const [totalOutcome, setTotalOutcome] = useState('');

  const handleChange = (e, { name, value }) => {
    if (name === 'days') {
      setDays(value);
    } else if (name === 'salary') {
      let _value = value.replace(/[^0-9]+/g, '');
      setSalary(numberWithCommas(_value));
    }
  };

  const handleClick = () => {
    setSalary('');
  };

  const handleSetTotalOutcome = (value) => {
    setTotalOutcome(value);
  };

  return (
    <Container fluid className="App">
      <SalaryHeader
        salary={salary}
        days={days}
        cbHandleChange={handleChange}
        cbHandleClick={handleClick}
      ></SalaryHeader>
      <SalaryIncome salary={salary} days={days}></SalaryIncome>
      <SalaryOutcome
        totalOutcome={totalOutcome}
        setTotalOutcome={handleSetTotalOutcome}
      ></SalaryOutcome>
      <SalaryRemain salary={salary} totalOutcome={totalOutcome} days={days}></SalaryRemain>
      <SalaryFooter></SalaryFooter>
    </Container>
  );
};

export default App;
