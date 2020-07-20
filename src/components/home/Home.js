import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button, Icon, Grid, Segment, Table, Message, Divider } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { getHighscores } from '../../logic/reducers';
import './Home.css';
import { resetScores } from '../../logic/actions';

export default function Home() {
    return (
        <div className='margin-top'>
            <Header as='h1' textAlign='center' icon>
                <Icon size='mini' name='question circle outline' />
                <Header.Content>Quiz App</Header.Content>
            </Header>
            <Segment>
                <div className='grid'>
                    <Grid columns='equal' textAlign="center">
                        <Grid.Column>
                            <Header as='h4'>Create some questions for the quiz</Header>
                            
                            <Link to="/question_handler">
                                <Button icon labelPosition='left'>
                                    Question Handler
                                    <Icon name='book' />
                                </Button>
                            </Link>
                        </Grid.Column>
                        <Divider vertical>Or</Divider>
                        <Grid.Column>
                            <Header as='h4'>Start a quiz</Header>
                            
                            <Link to="/game">
                                <Button icon labelPosition='left'>
                                    Game
                                    <Icon name='chess rook' />
                                </Button>
                            </Link>
                        </Grid.Column>
                    </Grid>
                </div>
            </Segment>

            <Highscores />

        </div>
    )
}

const Highscores = () => {
    const highscores = useSelector(getHighscores).highscores;

    const dispatch = useDispatch();

    return (
        <Segment>
            <Header as='h3' textAlign='center'>
                Local Highscores
            </Header>

            {highscores.length === 0
                ?
                <div className='centered'>
                    <Message compact content='There are no highscores yet!' style={{ width: 300 }} />
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
                        <Button icon labelPosition='left' onClick={() => dispatch(resetScores())}>
                            Reset highscores
                            <Icon name='redo' />
                        </Button>
                    </div>
                </div>
            }
        </Segment>
    )
}