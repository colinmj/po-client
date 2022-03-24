import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateTime } from 'luxon'
import { Container, Card } from '@mui/material'
import { UnitFilter } from '../Dashboard/UnitFilter'
import { upperFirst, elSortino } from '../../utils'
import Loader from '../Loader'
import { getPrs } from '../../actions/prs'

const Prs = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [exercises, setExercises] = useState([])
  const [unit, setUnit] = useState(
    localStorage.getItem('metric') ? localStorage.getItem('metric') : 'lbs'
  )
  const [activeExercise, setActiveExercise] = useState('')
  const [filteredPrs, setFilteredPrs] = useState([])
  const [loading, setLoading] = useState(true)
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
  }, [activeExercise, prs])

  const filterUnit = (value) => {
    setUnit(value)
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flexBasis: '100%', marginBottom: 50 }}>
            <UnitFilter filter={filterUnit} />
          </div>

          <Card className="pr-lift-list pr-card">
            <h3>Exercises</h3>

            <ul>
              {exercises.length > 0 &&
                exercises.map((exercise) => (
                  <li className={activeExercise === exercise ? 'active' : ''}>
                    <button onClick={() => setActiveExercise(exercise)}>
                      {upperFirst(exercise)}
                    </button>
                  </li>
                ))}
            </ul>
          </Card>

          {activeExercise && filteredPrs.length && (
            <Card className="po__pr-container pr-card">
              <h3>{upperFirst(activeExercise)}</h3>

              <ul className="pr-list">
                {filteredPrs.map((pr) => (
                  <li>
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
