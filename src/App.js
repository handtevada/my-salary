import React, { useState, useEffect } from 'react';
import { Container, Icon, Header, Card, Form, Segment, Grid } from 'semantic-ui-react'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

const App = () => {
    const [salarys, setSalarys] = useState('');
    const [days, setDays] = useState(30);
    const [totalOutcome, setTotalOutcome] = useState('');

    const handleChange = (e, { name, value }) => {
        if (name === 'days') {
            setDays(value)
        } else if (name === 'salary') {
            let _value = value.replace(/[^0-9]+/g, '');
            setSalarys(numberWithCommas(_value))
        }
    };

    const handleClick = (e, value) => {
        setSalarys('')
    }

    const seterTotalOutcome = (v) => {
        setTotalOutcome(v)
    }

    return (
        <Container fluid className="App">
            <SalaryHeaders salarys={salarys} days={days} cbHandleChange={handleChange} cbHandleClick={handleClick}></SalaryHeaders>
            <SalaryIncome salarys={salarys} days={days}></SalaryIncome>
            <SalaryOutcome totalOutcome={totalOutcome} seterTotalOutcome={seterTotalOutcome}></SalaryOutcome>
            <SalaryRemain salarys={salarys} totalOutcome={totalOutcome} days={days}></SalaryRemain>
            <SalaryFooter></SalaryFooter>
        </Container>
    );
}

const SalaryHeaders = ({ salarys, days, cbHandleChange, cbHandleClick }) => {
    return (
        <Container text className="Header">
            <Header as='h1' style={{ paddingBottom: "15px" }}>
                <div>
                    <Icon name='calculator' />
                    <Header.Content>
                        Salary Calculator
                    </Header.Content>
                </div>
            </Header>
            <Form style={{ marginTop: "15px" }}>
                <Form.Input
                    label={`Salary : ${salarys}`}
                    name='salary'
                    onChange={cbHandleChange}
                    type='text'
                    maxLength={13}
                    placeholder="Fill in Salary"
                    value={salarys}
                    autoComplete='off'
                    action={{
                        icon: "delete",
                        onClick: cbHandleClick
                    }}
                />
                <Form.Input
                    label={`Number of days to calculate : ${days} `}
                    min={0}
                    max={31}
                    name='days'
                    onChange={cbHandleChange}
                    step={1}
                    type='range'
                    value={days}
                />
            </Form>
        </Container>
    )
}

const SalaryIncome = ({ salarys, days }) => {
    const [monthSalarys, setMonthSalarys] = useState('0.00');
    const [daySalarys, setDaySalarys] = useState('0.00');
    const [hourSalarys, setHourSalarys] = useState('0.00');
    const [minuteSalarys, setMinuteSalarys] = useState('0.00');
    const [secondSalarys, setSecondSalarys] = useState('0.00');

    useEffect(() => {
        if (salarys !== '' && days !== 0) {
            let _salarys = convertStrtoInt(salarys);
            let _monthSalary = (_salarys).toFixed(2);
            let _daySalarys = (_salarys / days).toFixed(2);
            let _hourSalarys = (_salarys / days / 24).toFixed(2);
            let _minuteSalarys = (_salarys / days / 24 / 60).toFixed(2);
            let _secondSalarys = (_salarys / days / 24 / 60 / 60).toFixed(2);

            setMonthSalarys(numberWithCommas(_monthSalary))
            setDaySalarys(numberWithCommas(_daySalarys))
            setHourSalarys(numberWithCommas(_hourSalarys))
            setMinuteSalarys(numberWithCommas(_minuteSalarys))
            setSecondSalarys(numberWithCommas(_secondSalarys))
        } else {
            setMonthSalarys('0.00')
            setDaySalarys('0.00')
            setHourSalarys('0.00')
            setMinuteSalarys('0.00')
            setSecondSalarys('0.00')
        }
    });

    return (
        <Segment placeholder>
            <Header as='h3' content='SALARY INCOME' />
            <Grid columns={5} doubling stackable>
                <Grid.Row>
                    <Grid.Column>
                        <SalaryCard header="Month" salary={monthSalarys}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Day" salary={daySalarys}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Hour" salary={hourSalarys}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Minute" salary={minuteSalarys}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Second" salary={secondSalarys}></SalaryCard>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

const SalaryCard = ({ header, salary }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{header}</Card.Header>
                <Card.Description>{salary}</Card.Description>
            </Card.Content>
        </Card>
    )
}

const SalaryOutcome = ({ totalOutcome, seterTotalOutcome }) => {
    const [outcomes, setOutcomes] = useState('')
    const [outcomeLists, setOutcomeLists] = useState([])

    const handleChange = (e, { name, value }) => {
        if (name === 'outcome') {
            let _value = value.replace(/[^0-9]+/g, '');
            setOutcomes(numberWithCommas(_value))
        }
    };

    const handleClick = (e, values) => {
        if (outcomes !== '') {
            let _rows = []
            let _index = 1
            let _total = 0;
            outcomeLists.forEach(element => {
                _rows.push({ index: _index, outcomes: element.outcomes })

                _total += convertStrtoInt(element.outcomes)
                _index++
            });

            _rows.push({ index: _index, outcomes: outcomes })
            _total += convertStrtoInt(outcomes);

            setOutcomeLists(_rows)
            setOutcomes('')
            seterTotalOutcome(numberWithCommas(_total))
        }
    }

    return (
        <Segment placeholder>
            <Header as='h3' content='OUTCOME' />
            <Container text>
                <Form style={{ paddingBottom: "20px" }}>
                    <Form.Input
                        label={`Outcome : ${totalOutcome}`}
                        name='outcome'
                        placeholder='Fill in Outcome'
                        autoComplete='off'
                        onChange={handleChange}
                        value={outcomes}
                        action={{
                            icon: "send",
                            onClick: handleClick
                        }} />
                </Form>
            </Container>
            <Grid columns={5} doubling stackable>
                <Grid.Row>
                    <SalaryOutcomeItems outcomeLists={outcomeLists}></SalaryOutcomeItems>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

const SalaryOutcomeItems = ({ outcomeLists }) => {
    return (
        outcomeLists.map(({ index, outcomes }) => {
            let _outcomes = outcomes.toString().replace(/,/g, '');
            return (
                <Grid.Column key={index}>
                    <SalaryCard header={"Outcome " + index} salary={numberWithCommas(_outcomes)}></SalaryCard>
                </Grid.Column>
            )
        })
    )
}

const SalaryRemain = ({ salarys, totalOutcome, days }) => {
    const [monthSalarysRm, setMonthSalarysRm] = useState('0.00');
    const [daySalarysRm, setDaySalarysRm] = useState('0.00');
    const [hourSalarysRm, setHourSalarysRm] = useState('0.00');
    const [minuteSalarysRm, setMinuteSalarysRm] = useState('0.00');
    const [secondSalarysRm, setSecondSalarysRm] = useState('0.00');

    useEffect(() => {
        if (salarys !== '') {
            let _salarys = convertStrtoInt(salarys);
            let _totalOutcome = convertStrtoInt(totalOutcome);
            let _remain = _salarys - _totalOutcome

            let _monthSalarys = (_remain).toFixed(2);
            let _daySalarys = (_remain / days).toFixed(2);
            let _hourSalarys = (_remain / days / 24).toFixed(2);
            let _minuteSalarys = (_remain / days / 24 / 60).toFixed(2);
            let _secondSalarys = (_remain / days / 24 / 60 / 60).toFixed(2);

            setMonthSalarysRm(numberWithCommas(_monthSalarys))
            setDaySalarysRm(numberWithCommas(_daySalarys))
            setHourSalarysRm(numberWithCommas(_hourSalarys))
            setMinuteSalarysRm(numberWithCommas(_minuteSalarys))
            setSecondSalarysRm(numberWithCommas(_secondSalarys))
        } else {
            setMonthSalarysRm('0.00')
            setDaySalarysRm('0.00')
            setHourSalarysRm('0.00')
            setMinuteSalarysRm('0.00')
            setSecondSalarysRm('0.00')
        }
    });

    return (
        <Segment placeholder>
            <Header as='h3' content='SALARY REMAIN' />
            <Grid columns={5} doubling stackable>
                <Grid.Row>
                    <Grid.Column>
                        <SalaryCard header="Month" salary={monthSalarysRm}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Day" salary={daySalarysRm}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Hour" salary={hourSalarysRm}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Minute" salary={minuteSalarysRm}></SalaryCard>
                    </Grid.Column>
                    <Grid.Column>
                        <SalaryCard header="Second" salary={secondSalarysRm}></SalaryCard>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

const SalaryFooter = () => {
    return (
        <div>
            <Header size='tiny'>Made by Keerati © 2019</Header>
        </div>
    )
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const convertStrtoInt = (x) => {
    return parseInt((x === '' ? '0' : x).toString().replace(/,/g, ''));
}

export default App;
