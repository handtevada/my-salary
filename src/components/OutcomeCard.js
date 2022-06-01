import React from 'react';
import { Icon, Card, Button } from 'semantic-ui-react';

const OutcomeCard = ({ index, header, salary, handleClick }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Description>{salary}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button size="mini" name="delOutcome" onClick={handleClick} del={index}>
          <Icon name="delete" />
          Delete
        </Button>
      </Card.Content>
    </Card>
  );
};

export default OutcomeCard;
