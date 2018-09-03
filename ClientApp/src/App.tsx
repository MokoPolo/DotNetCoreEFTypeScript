import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { Home } from './Components/Home';
import { AddEmployee } from './Components/AddEmployee';
import { EmployeeData } from './Components/FetchEmployee';

export default class App extends Component {
    // displayName = App.name

    public render() {
        return (
            <Router>
            <Layout>
                
                    <div>
                        <Route exact="true" path='/' component={Home} />
                        <Route path='/addemployee' component={AddEmployee} />
                        <Route path='/employeedata' component={EmployeeData} />
                    </div>
                
                </Layout>
            </Router>
        );
    }
}
