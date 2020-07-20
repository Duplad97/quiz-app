import React from 'react';
import { connect } from 'react-redux';
import { Form, Card, Grid, Icon, Message } from 'semantic-ui-react';
import { save } from '../../../logic/actions';
import './QuestionForm.css'

class QuestionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            query: '',
            first: '',
            second: '',
            third: '',
            fourth: '',
            correct: null,
            date: '',
            error: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onReset = this.onReset.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value, error: '' })
    }

    onSave = () => {
        if (this.validateForm()) {
            const _id = '_' + Math.random().toString(36).substr(2, 9);
            const _date = new Date().toLocaleDateString();

            this.setState({ id: _id, date: _date });
        }
    }

    onReset = () => {
        this.setState({
            query: '',
            first: '',
            second: '',
            third: '',
            fourth: '',
            correct: null,
            error: '',
        });
    }

    validateForm = () => {
        if (this.state.query !== '' && this.state.first !== '' && this.state.second !== '' && this.state.third !== '' && this.state.fourth !== '') {
            let array = [];
            array.push(this.state.first);

            if (array.includes(this.state.second)) {
                this.setState({error: 'Answers must be different!'});
                return false;
            }

            array.push(this.state.second);
            if (array.includes(this.state.third)) {
                this.setState({error: 'Answers must be different!'});
                return false;
            }

            array.push(this.state.third);
            if (array.includes(this.state.fourth)) {
                this.setState({error: 'Answers must be different!'});
                return false;
            }

            if (this.state.correct === null || this.state.correct === '') {
                this.setState({error: 'Correct answer not selected!'});
                return false;
            }
            return true;
        }
        else {
            this.setState({error: 'Some fields are empty!'});
            return false;
        }
    }

    componentDidUpdate() {
        if (this.state.id !== '' && this.state.date !== '') {
            this.props.finalizeQuestion(this.state);

            this.setState({
                id: '',
                query: '',
                first: '',
                second: '',
                third: '',
                fourth: '',
                correct: null,
                date: '',
                error: '',
            });
        }
    }

    render() {
        const { query, first, second, third, fourth, correct } = this.state;

        return (
            <div className='centered'>
                <Card style={{ width: 900 }}>
                    <Card.Content>
                        <Card.Header textAlign='center'>
                            Add new Question
                    </Card.Header>
                        <Form>
                            <Form.Input onChange={this.handleChange} id='question' fluid label='Question' placeholder='Question' name='query' value={query} />

                            <Form.Group widths='equal'>
                                <Form.Input onChange={this.handleChange} id='first' fluid label='First answer' placeholder='First answer'
                                    name='first'
                                    value={first} />
                                <Form.Radio name='correct' value={first} checked={correct === first} onChange={this.handleChange}></Form.Radio>

                                <Form.Input onChange={this.handleChange} id='second' fluid label='Second answer' placeholder='Second answer'
                                    name='second'
                                    value={second} />
                                <Form.Radio name='correct' value={second} checked={correct === second} onChange={this.handleChange}></Form.Radio>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input onChange={this.handleChange} id='third' fluid label='Third answer' placeholder='Third answer'
                                    name='third'
                                    value={third} />
                                <Form.Radio name='correct' value={third} checked={correct === third} onChange={this.handleChange}></Form.Radio>

                                <Form.Input onChange={this.handleChange} id='fourth' fluid label='Fourth answer' placeholder='Fourth answer'
                                    name='fourth'
                                    value={fourth} />
                                <Form.Radio name='correct' value={fourth} checked={correct === fourth} onChange={this.handleChange}></Form.Radio>
                            </Form.Group>

                            {this.state.error !== ''
                            ? 
                            <Message color='red' content={this.state.error}></Message>
                            : ''
                            }

                            <Grid columns='equal' textAlign='center' className='button-grid'>
                                <Grid.Column>
                                    <Form.Button icon labelPosition='left' onClick={() => this.onSave()}>
                                        Save
                                    <Icon name='save' />
                                    </Form.Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Button icon labelPosition='left' onClick={() => this.onReset()}>
                                        Reset
                                    <Icon name='redo' />
                                    </Form.Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        finalizeQuestion: payload => dispatch(save(payload)),
    }
}

export default connect(null, mapDispatchToProps)(QuestionForm);