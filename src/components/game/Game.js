import React from 'react';
import { connect } from 'react-redux';
import { Header, Button, Input, Message, Icon } from 'semantic-ui-react';
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

        this.questions = this.props.questions;
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    onStart = e => {
        this.setState({ gameStarted: true });
    }

    render() {

        if (this.questions.length === 0) {
            return (
                <div className='margin-top'>
                    <Header as='h1' textAlign='center'>Game</Header>
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
                </div>
            )
        }
        else if (!this.state.gameStarted) {
            return (
                <div className='margin-top'>
                    <Header textAlign='center' as='h1'>Game</Header>

                    <div className='centered margin-top'>
                        <Input className='name-input' label='Name' name='name' placeholder='Name' onChange={this.handleChange}></Input>
                        <Button icon labelPosition='right' disabled={this.state.name === '' ? true : false} onClick={this.onStart}>
                            Start
                            <Icon name='play' />
                        </Button>
                    </div>

                    <div className='centered button'>
                        <Link to='/'>
                            <Button icon labelPosition='left'>
                                Back
                            <Icon name='arrow left' />
                            </Button>
                        </Link>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='margin-top'>
                    <Header textAlign='center' as='h1'>Game</Header>
                    <Quiz name={this.state.name} />
                    <Link to='/'>
                        <Button icon labelPosition='left' onClick={() => this.props.reset()}>
                            Back
                            <Icon name='arrow left' />
                        </Button>
                    </Link>
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