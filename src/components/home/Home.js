import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Icon, Grid, Segment, Table, Message } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getHighscores } from '../../logic/reducers';
import './Home.css';
import { resetScores } from '../../logic/actions';

export default function Home() {
    return (
        <div className='margin-top'>
            <Header textAlign='center' as='h1'>
                Quiz App
            </Header>
            <div className='grid'>
                <Grid columns='equal' textAlign="center">
                    <Grid.Column>
                        <Link to="/question_handler">
                            <Button icon labelPosition='left'>
                                Question Handler
                                    <Icon name='book' />
                            </Button>
                        </Link>
                    </Grid.Column>
                    <Grid.Column>
                        <Link to="/game">
                            <Button icon labelPosition='left'>
                                Game
                                    <Icon name='chess rook' />
                            </Button>
                        </Link>
                    </Grid.Column>
                </Grid>
            </div>

            <Highscores />

        </div>
    )
}

const Highscores = () => {
    const highscores = useSelector(getHighscores).highscores;

    const dispatch = useDispatch();

    return (
        <Segment>
            <Header as='h3' textAlign='center'>Local Highscores</Header>

            {highscores.length === 0
                ?
                <div className='centered'>
                    <Message compact content='There are no data!' style={{width: 300}} />
                </div>
                :
                <div>
                    <Table textAlign='center' celled>
                        <Table.Header>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Header>
                        <Table.Body>
                            {highscores.map(h => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>{h.name}</Table.Cell>
                                        <Table.Cell>{h.score}%</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                    <div className='centered'>
                        <Button onClick={() => dispatch(resetScores())}>Reset highscores</Button>
                    </div>
                </div>
            }
        </Segment>
    )
}