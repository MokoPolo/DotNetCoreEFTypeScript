
import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchEmployee } from './components/FetchEmployee';

export const routes = <Layout>
    <Route exact="true" path='/' component={Home} />
    <Route path='/fetchemployee' component={FetchEmployee} />
</Layout>;