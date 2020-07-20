import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import QuestionHandler from './components/question_handler/QuestionHandler';
import Game from './components/game/Game';

export default function AppRouter() {
    return (
        <Router>
            <Layout>
                <Switch>

                    <Route path='/' exact>
                        <Home />
                    </Route>

                    <Route path='/question_handler' render={(props) => <QuestionHandler {...props} />}>
                    </Route>

                    <Route path='/game' render={(props) => <Game {...props} />}>
                    </Route>

                    <Route>
                        <Redirect to='/'></Redirect>
                    </Route>

                </Switch>
            </Layout>
        </Router>
    )
}