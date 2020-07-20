import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import QuestionList from './question_list/QuestionList';
import QuestionForm from './question_form/QuestionForm';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './QuestionHandler.css'

export default function QuestionHandler() {
    return (
        <div className='margin-top'>
            <Header as='h1' textAlign='center' icon>
                <Icon size='mini' name='book' />
                <Header.Content>Question Handler</Header.Content>
            </Header>

            <Segment>
                <div className='list'><QuestionList /></div>
                <QuestionForm />

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