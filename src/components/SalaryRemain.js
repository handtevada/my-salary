import React, { useState, useEffect } from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';

import SalaryCard from './SalaryCard';

import { numberWithCommas, convertStringToInt } from '../utils';

const SalaryRemain = ({ salary, totalOutcome, days }) => {
  const defaultNumber = '0.00';
  const [monthSalaryRm, setMonthSalaryRm] = useState(defaultNumber);
  const [daySalaryRm, setDaySalaryRm] = useState(defaultNumber);
  const [hourSalaryRm, setHourSalaryRm] = useState(defaultNumber);
  const [minuteSalaryRm, setMinuteSalaryRm] = useState(defaultNumber);
  const [secondSalaryRm, setSecondSalaryRm] = useState(defaultNumber);

  useEffect(() => {
    if (salary !== '') {
      let _salary = convertStringToInt(salary);
      let _totalOutcome = convertStringToInt(totalOutcome);
      let _remain = _salary - _totalOutcome;

      let _monthSalary = _remain.toFixed(2);
      let _daySalary = (_remain / days).toFixed(2);
      let _hourSalary = (_remain / days / 24).toFixed(2);
      let _minuteSalary = (_remain / days / 24 / 60).toFixed(2);
      let _secondSalary = (_remain / days / 24 / 60 / 60).toFixed(2);

      setMonthSalaryRm(numberWithCommas(_monthSalary));
      setDaySalaryRm(numberWithCommas(_daySalary));
      setHourSalaryRm(numberWithCommas(_hourSalary));
      setMinuteSalaryRm(numberWithCommas(_minuteSalary));
      setSecondSalaryRm(numberWithCommas(_secondSalary));
    } else {
      setMonthSalaryRm(defaultNumber);
      setDaySalaryRm(defaultNumber);
      setHourSalaryRm(defaultNumber);
      setMinuteSalaryRm(defaultNumber);
      setSecondSalaryRm(defaultNumber);
    }
  });

  return (
    <Segment placeholder>
      <Header as="h3" content="SALARY REMAIN" />
      <Grid columns={5} doubling stackable>
        <Grid.Row>
          <Grid.Column>
            <SalaryCard header="Month" salary={monthSalaryRm}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Day" salary={daySalaryRm}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Hour" salary={hourSalaryRm}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Minute" salary={minuteSalaryRm}></SalaryCard>
          </Grid.Column>
          <Grid.Column>
            <SalaryCard header="Second" salary={secondSalaryRm}></SalaryCard>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default SalaryRemain;
