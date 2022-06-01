import React from 'react';
import { Header } from 'semantic-ui-react';

const SalaryFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <Header size="tiny">{`Made by Keerati © ${currentYear}`}</Header>
    </div>
  );
};

export default SalaryFooter;
