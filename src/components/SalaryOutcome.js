import React, { useState } from 'react';
import { Container, Header, Form, Segment, Grid } from 'semantic-ui-react';

import OutcomeCard from './OutcomeCard';

import { numberWithCommas, convertStringToInt } from '../utils';

const SalaryOutcome = ({ totalOutcome, setTotalOutcome }) => {
  const [outcomes, setOutcomes] = useState('');
  const [outcomeLists, setOutcomeLists] = useState([]);

  const handleChange = (e, { name, value }) => {
    if (name === 'outcome') {
      let _value = value.replace(/[^0-9]+/g, '');
      setOutcomes(numberWithCommas(_value));
    }
  };

  const handleClick = (e, { name, del }) => {
    if (name === 'outcome' && outcomes !== '') {
      let _rows = [];
      let _index = 1;
      let _total = 0;
      outcomeLists.forEach((element) => {
        _rows.push({ index: _index, outcomes: element.outcomes });

        _total += convertStringToInt(element.outcomes);
        _index++;
      });

      _rows.push({ index: _index, outcomes: outcomes });
      _total += convertStringToInt(outcomes);

      setOutcomeLists(_rows);
      setOutcomes('');
      setTotalOutcome(numberWithCommas(_total));
    }

    if (name === 'delOutcome') {
      const outcomeListsRm = outcomeLists.filter(({ index }) => {
        return index !== del;
      });

      setOutcomeLists(outcomeListsRm);

      let _total = 0;
      if (outcomeListsRm.length !== 0) {
        _total = outcomeListsRm
          .map((item) => item.outcomes)
          .reduce((prev, next) => convertStringToInt(prev) + convertStringToInt(next));
      }
      setTotalOutcome(numberWithCommas(_total));
    }
  };

  return (
    <Segment placeholder>
      <Header as="h3" content="OUTCOME" />
      <Container text>
        <Form style={{ paddingBottom: '20px' }}>
          <Form.Input
            label={`Outcome : ${totalOutcome}`}
            name="outcome"
            placeholder="Fill in Outcome"
            autoComplete="off"
            onChange={handleChange}
            value={outcomes}
            action={{
              name: 'outcome',
              icon: 'send',
              onClick: handleClick,
            }}
          />
        </Form>
      </Container>
      <Grid columns={5} doubling stackable>
        <Grid.Row>
          <SalaryOutcomeItems
            outcomeLists={outcomeLists}
            handleClick={handleClick}
          ></SalaryOutcomeItems>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const SalaryOutcomeItems = ({ outcomeLists, handleClick }) => {
  return outcomeLists.map(({ index, outcomes }) => {
    let _outcomes = outcomes.toString().replace(/,/g, '');
    return (
      <Grid.Column key={index}>
        <OutcomeCard
          index={index}
          header={'Outcome ' + index}
          salary={numberWithCommas(_outcomes)}
          handleClick={handleClick}
        ></OutcomeCard>
      </Grid.Column>
    );
  });
};

export default SalaryOutcome;
