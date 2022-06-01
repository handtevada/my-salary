import React, { useState, useEffect } from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';

import SalaryCard from './SalaryCard';

import { numberWithCommas, convertStringToInt } from '../utils';

const SalaryIncome = ({ salary, days }) => {
  const defaultNumber = '0.00';
  const [monthSalary, setMonthSalary] = useState(defaultNumber);
  const [daySalary, setDaySalary] = useState(defaultNumber);
  const [hourSalary, setHourSalary] = useState(defaultNumber);
  const [minuteSalary, setMinuteSalary] = useState(defaultNumber);
  const [secondSalary, setSecondSalary] = useState(defaultNumber);

  useEffect(() => {
    if (salary !== '' && days !== 0) {
      let _salary = convertStringToInt(salary);
      let _monthSalary = _salary.toFixed(2);
      let _daySalary = (_salary / days).toFixed(2);
      let _hourSalary = (_salary / days / 24).toFixed(2);
      let _minuteSalary = (_salary / days / 24 / 60).toFixed(2);
      let _secondSalary = (_salary / days / 24 / 60 / 60).toFixed(2);

      setMonthSalary(numberWithCommas(_monthSalary));
      setDaySalary(numberWithCommas(_daySalary));
      setHourSalary(numberWithCommas(_hourSalary));
      setMinuteSalary(numberWithCommas(_minuteSalary));
      setSecondSalary(numberWithCommas(_secondSalary));
    } else {
      setMonthSalary(defaultNumber);
      setDaySalary(defaultNumber);
      setHourSalary(defaultNumber);
      setMinuteSalary(defaultNumber);
      setSecondSalary(defaultNumber);
    }
  });

  return (
    <Segment placeholder>
      <Header as="h3" content="SALARY INCOME" />
      <Grid columns={5} doubling stackable>
        <Grid.Row>
          <Grid.Column>
            <SalaryCard header="Month" salary={monthSalary}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Day" salary={daySalary}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Hour" salary={hourSalary}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Minute" salary={minuteSalary}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Second" salary={secondSalary}></SalaryCard>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default SalaryIncome;
