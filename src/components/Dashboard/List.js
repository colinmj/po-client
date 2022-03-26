import React from 'react'
import { Select, MenuItem } from '@mui/material'

const List = ({ urlBase, data, redirect }) => {
  const onSubmit = (value) => {
    if (value === '') return
    redirect(urlBase, value)
  }

  return (
    <>
      <form>
        <label>
          {urlBase === 'workouts' ? 'View Workout' : 'View Training Week'}
        </label>
        <Select
          onChange={(e) => onSubmit(e.target.value)}
          defaultValue="placeholder">
          <MenuItem value="placeholder" disabled key="placeholder">
            Choose...
          </MenuItem>
          {data &&
            data.map((item) => (
              <MenuItem value={item._id} key={item._id}>
                {item.title
                  ? item.title
                  : item.dateString
                  ? item.dateString
                  : ''}
              </MenuItem>
            ))}
        </Select>
      </form>
    </>
  )
}

export default List
