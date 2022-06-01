import React from 'react';
import { Card } from 'semantic-ui-react';

const SalaryCard = ({ header, salary }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Description>{salary}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default SalaryCard;
