import React from 'react';
import { Container, Icon, Header, Form } from 'semantic-ui-react';

const SalaryHeader = ({ salary, days, cbHandleChange, cbHandleClick }) => {
  return (
    <Container text className="Header">
      <Header as="h1" style={{ paddingBottom: '15px' }}>
        <div>
          <Icon name="calculator" />
          <Header.Content>Salary Calculator</Header.Content>
        </div>
      </Header>
      <Form style={{ marginTop: '15px' }}>
        <Form.Input
          label={`Salary : ${salary}`}
          name="salary"
          onChange={cbHandleChange}
          type="text"
          maxLength={13}
          placeholder="Fill in Salary"
          value={salary}
          autoComplete="off"
          action={{
            icon: 'delete',
            onClick: cbHandleClick,
          }}
        />
        <Form.Input
          label={`Number of days to calculate : ${days} `}
          min={0}
          max={31}
          name="days"
          onChange={cbHandleChange}
          step={1}
          type="range"
          value={days}
        />
      </Form>
    </Container>
  );
};

export default SalaryHeader;
