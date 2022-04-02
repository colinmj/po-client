import React from 'react'
import { upperFirst } from '../../utils'
import { GiWeightLiftingUp } from 'react-icons/gi'

const WorkoutList = ({ sets, callback, enableRemove, unit }) => {
  const doCallback = (index, target, totalVolume, targetVolume) => {
    callback(index, target, totalVolume, targetVolume)
  }

  console.log(sets)

  return (
    <div>
      {sets.length > 0 && <h5>{sets.length} Lifts Added!</h5>}

      <ul className="workout-list">
        {sets.map((set, i) => {
          return (
            <li key={i} className="workout-list-item">
              <div>
                <h4>
                  <GiWeightLiftingUp />
                  {upperFirst(set['exercise'])}:
                </h4>
                <div className="workout-list-details">
                  <p> {set['lifts'][0]['sets']} X </p>
                  <p>{set['lifts'][0]['reps']} of </p>
                  {unit === 'lbs' ? (
                    <p>{set['lifts'][0]['lbs']} lbs</p>
                  ) : (
                    <p>{set['lifts'][0]['kg']} kg</p>
                  )}
                </div>
              </div>

              {enableRemove && (
                <button
                  className="button"
                  style={{ minWidth: 40, minHeight: 40 }}
                  onClick={() =>
                    doCallback(
                      i,
                      set.target,
                      set.volume.totalVolume,
                      set.volume[set.target]
                    )
                  }>
                  X
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default WorkoutList
