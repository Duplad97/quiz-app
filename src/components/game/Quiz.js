import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Button, Card, Grid, Modal } from 'semantic-ui-react';
import { getActiveQuestions, getPoints, getQuestions } from '../../logic/reducers';
import './Game.css';
import { answer, next_question, reset, addScore } from '../../logic/actions';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answered: false,
            selectedAnswer: null,
            correct: null,
            randQuestion: this.props.activeQuestions[Math.floor(Math.random() * this.props.activeQuestions.length)],
            endGame: false,
        }

        this.onSelectAnswer = this.onSelectAnswer.bind(this);
        this.clickAnswer = this.clickAnswer.bind(this);
        this.clickNext = this.clickNext.bind(this);
    }

    onSelectAnswer = answer => {
        this.setState({ selectedAnswer: answer });
    }

    clickAnswer = () => {
        this.setState({ answered: true });

        if (this.state.selectedAnswer === this.state.randQuestion.correct) this.setState({ correct: true });
        else this.setState({ correct: false });

        if (this.props.activeQuestions.length === 1) this.setState({ endGame: true });
    }

    clickNext = () => {
        this.setState({
            answered: false,
            selectedAnswer: null,
            correct: null,
            randQuestion: this.props.activeQuestions[Math.floor(Math.random() * this.props.activeQuestions.length)]
        });
    }

    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Header as='h4'>Name: {this.props.name}</Header>
                    <Header as='h4'>Points: {this.props.points}</Header>
                    <Card.Header as='h2' textAlign='center'>
                        {this.state.randQuestion.query}
                    </Card.Header>
                    <Grid textAlign='center'>
                        <Grid columns='equal' textAlign='center'>
                            <Grid.Column>

                                <div className={'answer' + (this.state.selectedAnswer === this.state.randQuestion.first ? ' selected' : '') + (this.state.selectedAnswer === this.state.randQuestion.first && !this.state.correct && this.state.answered ? ' wrong' : '') + (this.state.selectedAnswer === this.state.randQuestion.first && this.state.correct ? ' correct' : '')} onClick={!this.state.answered ? () => this.onSelectAnswer(this.state.randQuestion.first) : ''}>
                                    <Header as='h3'>{this.state.randQuestion.first}</Header>
                                </div>

                                <div className={'answer' + (this.state.selectedAnswer === this.state.randQuestion.third ? ' selected' : '') + (this.state.selectedAnswer === this.state.randQuestion.third && !this.state.correct && this.state.answered ? ' wrong' : '') + (this.state.selectedAnswer === this.state.randQuestion.third && this.state.correct ? ' correct' : '')} onClick={!this.state.answered ? () => this.onSelectAnswer(this.state.randQuestion.third) : ''}>
                                    <Header as='h3'>{this.state.randQuestion.third}</Header>
                                </div>

                            </Grid.Column>
                            <Grid.Column>

                                <div className={'answer' + (this.state.selectedAnswer === this.state.randQuestion.second ? ' selected' : '') + (this.state.selectedAnswer === this.state.randQuestion.second && !this.state.correct && this.state.answered ? ' wrong' : '') + (this.state.selectedAnswer === this.state.randQuestion.second && this.state.correct ? ' correct' : '')} onClick={!this.state.answered ? () => this.onSelectAnswer(this.state.randQuestion.second) : ''}>
                                    <Header as='h3'>{this.state.randQuestion.second}</Header>
                                </div>

                                <div className={'answer' + (this.state.selectedAnswer === this.state.randQuestion.fourth ? ' selected' : '') + (this.state.selectedAnswer === this.state.randQuestion.fourth && !this.state.correct && this.state.answered ? ' wrong' : '') + (this.state.selectedAnswer === this.state.randQuestion.fourth && this.state.correct ? ' correct' : '')} onClick={!this.state.answered ? () => this.onSelectAnswer(this.state.randQuestion.fourth) : ''}>
                                    <Header as='h3'>{this.state.randQuestion.fourth}</Header>
                                </div>

                            </Grid.Column>
                        </Grid>
                    </Grid>
                    <div className={'centered button' + (this.state.answered ? ' hidden' : '')}>
                        <Button onClick={() => { this.clickAnswer(); this.props.onAnswer({ selected: this.state.selectedAnswer, correct: this.state.randQuestion.correct }) }}>Answer</Button>
                    </div>

                    <div className={'centered button' + (!this.state.answered || this.state.endGame ? ' hidden' : '')}>
                        <Button onClick={() => { this.props.nextQuestion(this.state.randQuestion.id); this.clickNext() }}>Next</Button>
                    </div>
                </Card.Content>

                <EndGameModal endGame={this.state.endGame} points={this.props.points} name={this.props.name} />
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeQuestions: getActiveQuestions(state).activeQuestions,
        points: getPoints(state).points
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAnswer: payload => dispatch(answer(payload)),
        nextQuestion: payload => dispatch(next_question(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const EndGameModal = props => {
    const questionsLength = useSelector(getQuestions).questions.length;
    const percent = (props.points / questionsLength) * 100;

    const dispatch = useDispatch();

    const onBackClick = payload => {
        dispatch(addScore(payload));
        dispatch(reset());
    }

    return (
        <Modal open={props.endGame}>
            <Modal.Content>
                <Header as='h3' textAlign='center'>There are no more questions!</Header>
                <h4>You scored: {props.points}/{questionsLength}</h4>
                <h4>{percent}%</h4>
            </Modal.Content>
            <Modal.Actions>
                <Link to='/'>
                    <Button onClick={() => onBackClick({name: props.name, score: percent})}>Back to Home</Button>
                </Link>
            </Modal.Actions>
        </Modal>
    )
}