import React from 'react';
import { connect } from 'react-redux';
import { Header, Button, Input, Message, Icon, Segment, Popup, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getQuestions, getState } from '../../logic/reducers';
import Quiz from './Quiz';
import './Game.css';
import { reset } from '../../logic/actions';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false,
            name: '',
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    onStart = e => {
        this.props.reset();
        this.setState({ gameStarted: true });
    }

    render() {

        if (this.props.questions.length === 0) {
            return (
                <div className='margin-top'>
                    <Header as='h1' textAlign='center' icon>
                        <Icon size='mini' name='chess rook' />
                        <Header.Content>Game</Header.Content>
                    </Header>

                    <Segment>
                        <div className='centered margin-top'>
                            <Message>
                                <Header as='h4'>There are no questions found!</Header>
                            Go to <Link to='/question_handler'>Question Handler</Link> and add some questions to start a game!
                            </Message>
                        </div>
                        <div className='centered margin-top'>
                            <Link to='/'>
                                <Button icon labelPosition='left'>
                                    Back
                            <Icon name='arrow left' />
                                </Button>
                            </Link>
                        </div>
                    </Segment>
                </div>
            )
        }
        else if (!this.state.gameStarted) {
            return (
                <div className='margin-top'>
                    <Header as='h1' textAlign='center' icon>
                        <Icon size='mini' name='chess rook' />
                        <Header.Content>Game</Header.Content>
                    </Header>

                    <Segment>
                        <Header textAlign='center' as='h4'>Enter a name to start the quiz!</Header>
                        <div className='centered'>
                            <div>
                                <Input labelPosition='right' className='name-input' name='name' placeholder='Name' onChange={this.handleChange}>
                                    <Label>Name</Label>
                                    <input />
                                    <Label basic><Popup
                                        position='center right'
                                        content='Name must contain at least 3 characters!'
                                        trigger={<Icon name='info circle' />}>
                                    </Popup></Label>
                                </Input>


                                <Button icon labelPosition='right' disabled={(this.state.name === '' || this.state.name.length < 3) ? true : false} onClick={this.onStart}>
                                    Start
                                <Icon name='play' />
                                </Button>
                            </div>

                        </div>

                        <div className='centered button'>
                            <Link to='/'>
                                <Button icon labelPosition='left'>
                                    Back
                            <Icon name='arrow left' />
                                </Button>
                            </Link>
                        </div>
                    </Segment>
                </div>
            )
        }
        else {
            return (
                <div className='margin-top'>
                    <Header as='h1' textAlign='center' icon>
                        <Icon size='mini' name='chess rook' />
                        <Header.Content>Game</Header.Content>
                    </Header>

                    <Segment>
                        <Quiz name={this.state.name} />
                        <Link to='/'>
                            <Button icon labelPosition='left' onClick={() => this.props.reset()}>
                                Back
                            <Icon name='arrow left' />
                            </Button>
                        </Link>
                    </Segment>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    return { reset: () => dispatch(reset()) }
}

const mapStateToProps = state => {
    return { questions: getQuestions(state).questions, state: getState(state) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);