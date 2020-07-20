import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Button, Message, Modal, Grid, Header, Icon } from 'semantic-ui-react';
import { delete_question } from '../../../logic/actions';
import { getQuestions } from '../../../logic/reducers';
import './QuestionList.css';

const QuestionList = () => {

  const questions = useSelector(getQuestions).questions;

  if (questions.length === 0) {
    return (
      <div className='centered'>
        <Message className='width500' compact header='There are no questions!' content='Add some questions with the form below!' />
      </div>
    )
  }
  else {
    return (
      <div className='centered'>
        <List celled verticalAlign='middle' className='question-list'>
          {questions.map(q => {
            return (
              <List.Item key={q.id} className='list-item'>
                <List.Content floated='right'>
                  <DeleteModal question={q} />
                </List.Content>
                <List.Icon name='question circle' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'><QuestionModal q={q} /> </List.Header>

                  <List.Description as='a'>{q.date}</List.Description>
                </List.Content>
              </List.Item>
            )
          })
          }
        </List>
      </div>
    )
  }
}

const DeleteModal = props => {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const onAggree = () => {
      dispatch(delete_question(props.question.id));
      setOpen(false);
  }

  return (
    <Modal open={open} closeOnEscape={false} closeOnDimmerClick={false} trigger={<Button icon labelPosition='left' onClick={() => setOpen(true)}>Delete <Icon name='trash alternate' /></Button>} basic size='small'>
      <Header icon='trash alternate' content='Delete Question' />
      <Modal.Content>
        <p>
          Are you sure you want to delete this question?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} basic color='red' inverted>
          <Icon name='remove' /> No
        </Button>
        <Button onClick={() => onAggree()} color='green' inverted>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const QuestionModal = props => (
  <Modal
    trigger={<p>{props.q.query}</p>}
    closeIcon
  >
    <Modal.Content>
      <Header as='h2' textAlign='center'>{props.q.query}</Header>
      <Grid columns='equal' textAlign='center'>
        <Grid.Column>
          <h3 className='bordered'>{props.q.first}</h3>

          <h3 className='bordered'>{props.q.third}</h3>
        </Grid.Column>
        <Grid.Column>
          <h3 className='bordered'>{props.q.second}</h3>

          <h3 className='bordered'>{props.q.fourth}</h3>
        </Grid.Column>
      </Grid>
      <Header as='h4' textAlign='center'>Correct: {props.q.correct}</Header>
      <p>Created: {props.q.date}</p>
    </Modal.Content>
  </Modal>
)

export default QuestionList;