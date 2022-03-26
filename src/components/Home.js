import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getAllWorkoutsByUser } from '../actions/workouts'
import Loader from './Loader'

const Home = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')))
  const history = useHistory()
  const userEmail = user.result.email
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWorkoutsByUser({ user: userEmail }))
  }, [dispatch, userEmail])

  const workouts = useSelector((state) => state.workouts)

  useEffect(() => {
    if (workouts.length) {
      history.push('/dashboard')
    } else {
      history.push('/add-workout')
    }
  }, [workouts, history])

  return <Loader />
}

export default Home
