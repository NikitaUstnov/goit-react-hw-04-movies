import React, { Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader';
import Navigation from './components/Navigation/Navigation';
import routes from './routes';

const HomePage = lazy(() => import('./pages/HomePage/HomePage' /* webpackChunkName: "home-page" */));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */))

const App = () => (
  <div className="container">
    <Navigation />
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route exact path={routes.movies} component={MoviesPage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
        <Redirect to={routes.home} />
      </Switch>
    </Suspense>
    <ToastContainer autoClose={3000} position="top-right" type="default"/>
  </div>

);

    
export default App;
