import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import '@fontsource/open-sans'

//components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'
import AddWorkout from './components/Workout/AddWorkout'
import Exercises from './components/Exercises/Exercises'
import Exercise from './components/Exercise/Exercise'
import Dashboard from './components/Dashboard/Dashboard'
import TrainingWeek from './components/TrainingWeek/TrainingWeek'
import Workout from './components/Workout/Workout'
import HowItWorks from './components/HowItWorks'
import Prs from './components/Prs/Prs'
import { PrivateRoute } from './components/PrivateRoute'
import { Auth } from './components/Auth/Auth'

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/add-workout" exact component={AddWorkout} />
        <PrivateRoute path="/exercise-library" exact component={Exercises} />
        <Route path="/login" exact component={Auth} />
        <Route path="/how-it-works" exact component={HowItWorks} />
        <PrivateRoute path="/training-weeks/:id" component={TrainingWeek} />
        <PrivateRoute path="/prs" component={Prs} />
        <PrivateRoute path="/workouts/:id" component={Workout} />
        <PrivateRoute path="/exercise/:id" component={Exercise} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
