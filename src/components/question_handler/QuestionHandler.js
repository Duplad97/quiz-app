import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import QuestionList from './question_list/QuestionList';
import QuestionForm from './question_form/QuestionForm';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './QuestionHandler.css'

export default function QuestionHandler() {
    return (
        <div className='margin-top'>
            <Header textAlign='center' as='h1'>Question Handler</Header>

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
        </div>
    )
}