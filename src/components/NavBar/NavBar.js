import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Button, Select, MenuItem } from '@mui/material'
import { getPrs } from '../../actions/prs'

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [showPrs, setShowPrs] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/login')
    setUser(null)
  }

  const onSubmitMetric = (metric) => {
    localStorage.setItem('metric', metric)
  }

  useEffect(() => {
    const token = user?.token

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, user?.token])

  const userEmail = user ? user.result.email : ''

  useEffect(() => {
    if (userEmail) {
      dispatch(
        getPrs({
          user: userEmail,
        })
      )
    }
  }, [dispatch, userEmail])

  const prs = useSelector((state) => state.prs)

  useEffect(() => {
    if (prs.length) {
      setShowPrs(true)
    }
  }, [prs])

  return (
    <>
      {user && (
        <header id="util-nav">
          <Link to="/add-workout">Add Workout</Link>
          <Link to="/exercise-library">Exercise Library</Link>
          <Link to="/how-it-works">How It Works</Link>

          {showPrs && <Link to="/prs">My PRs</Link>}
        </header>
      )}

      <header id="main-nav">
        <Link to="/dashboard">
          <h2>Progressive Overload</h2>
        </Link>

        <div className="user-info">
          {user && (
            <div>
              <label>Preferred Unit</label>
              <Select
                defaultValue={
                  localStorage.getItem('metric')
                    ? localStorage.getItem('metric')
                    : 'lbs'
                }
                onChange={(e) => onSubmitMetric(e.target.value)}
                style={{ minWidth: 75 }}>
                <MenuItem value="lbs">Lbs</MenuItem>
                <MenuItem value="kg">Kg</MenuItem>
              </Select>
            </div>
          )}

          {user ? (
            <div>
              <h4>
                {user.result.name
                  .split(' ')
                  .map((el) => el.charAt(0))
                  .join('')}
              </h4>
              <Button onClick={logout}>Logout</Button>
            </div>
          ) : (
            <div>
              <Link to="/login">Sign In</Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default NavBar
