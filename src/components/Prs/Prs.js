import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateTime } from 'luxon'
import { Container, Card, Select, MenuItem } from '@mui/material'
import { UnitFilter } from '../Dashboard/UnitFilter'
import { upperFirst, elSortino } from '../../utils'
import Loader from '../Loader'
import { getPrs } from '../../actions/prs'

const Prs = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')))
  const [exercises, setExercises] = useState([])
  const [unit, setUnit] = useState(
    localStorage.getItem('metric') ? localStorage.getItem('metric') : 'lbs'
  )
  const [activeExercise, setActiveExercise] = useState('')
  const [filteredPrs, setFilteredPrs] = useState([])
  const [loading, setLoading] = useState(true)
  const [noPrs, setNoPrs] = useState(false)
  const userEmail = user.result.email
  const dispatch = useDispatch()

  //initial dispatch
  useEffect(() => {
    dispatch(
      getPrs({
        user: userEmail,
      })
    )
  }, [dispatch, userEmail])

  const prs = useSelector((state) => state.prs)

  const dateDisplay = (string) => {
    const theJsDate = new Date(string)

    return DateTime.fromJSDate(theJsDate).toFormat('LLL dd, yyyy')
  }

  useEffect(() => {
    if (prs.length > 0) {
      setLoading(false)
    } else {
      setLoading(false)
      setNoPrs(true)
    }
  }, [prs])

  elSortino(prs, 'exercise')

  //build exercise array
  useEffect(() => {
    let uniqueExercises = []

    prs.forEach((pr) => {
      if (!uniqueExercises.includes(pr.exercise)) {
        uniqueExercises.push(pr.exercise)
      }
    })

    setExercises(uniqueExercises)
  }, [prs])

  //on building of exercises, set first one to active
  useEffect(() => {
    setActiveExercise(exercises[0])
  }, [exercises])

  useEffect(() => {
    const theFilteredPrs = prs.filter((pr) => pr.exercise === activeExercise)

    setFilteredPrs(theFilteredPrs)

    if (theFilteredPrs.length) setNoPrs(false)
  }, [activeExercise, prs])

  const filterUnit = (value) => {
    setUnit(value)
  }

  //sort by lowest reps
  elSortino(filteredPrs, 'reps')

  return (
    <>
      {loading ? (
        <Loader />
      ) : noPrs ? (
        <h5 className="no-pr-message" style={{ textAlign: 'center' }}>
          You don't have any PRs yet - add a workout to get going!
        </h5>
      ) : (
        <Container maxWidth="xl" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flexBasis: '100%', marginBottom: 50 }}>
            <UnitFilter filter={filterUnit} />
          </div>

          <Card className="pr-lift-list pr-card">
            <h3>Exercises</h3>

            <Select
              defaultValue={exercises[0]}
              onChange={(e) => setActiveExercise(e.target.value)}>
              {exercises.length > 0 &&
                exercises.map((exercise) => (
                  <MenuItem key={exercise} value={exercise}>
                    {upperFirst(exercise)}
                  </MenuItem>
                ))}
            </Select>
          </Card>

          {activeExercise && filteredPrs.length && (
            <Card className="po__pr-container pr-card">
              <h3>{upperFirst(activeExercise)}</h3>

              <ul className="pr-list">
                {filteredPrs.map((pr) => (
                  <li key={`${pr.weight.lbs}-${pr.reps}`}>
                    <div>
                      <span className="pr-reps">X {pr.reps}: </span>

                      <span className="pr-weight">
                        <h3>
                          {pr.weight[unit]}
                          <span> {unit}</span>
                        </h3>
                      </span>
                    </div>

                    <h4>{dateDisplay(pr.updated_at)}</h4>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </Container>
      )}
    </>
  )
}

export default Prs
