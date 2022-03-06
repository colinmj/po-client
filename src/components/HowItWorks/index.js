import React from 'react'
import { Container, Modal, Box } from '@mui/material'

const HowItWorks = () => {
  return (
    <Container maxWidth="md">
      <h3>How to use Progressive Overload</h3>
      <p>
        When you first start lifting weights, it is very easy to be sure that
        you are doing more each week and to make gains. However, when one gets
        to a certain level it takes much more focus to ensure that they are
        increasing the work load. This is a tool to help you track your progress
        so that you can be sure you are increasing your volume over time. All
        you need to do is add your workouts from a selection of over 1300
        exercises, and you will receive a robust data set of your training
        history.
      </p>

      <ul>
        <li>
          <span style={{ fontSize: 18 }}>
            Step 1 Add exercises to your favorites
          </span>
          <p>
            Because there are so many exercises, searching for one each time can
            become tedious. Take a minute to add your exercises to your
            favorites, and these will show up in a list when you go to add a
            workout
          </p>
        </li>

        <li>
          <span style={{ fontSize: 18 }}>Step 2 Add workouts </span>
          <p>
            This app is intended to be used more as a journal, instead of a tool
            at the gym. I suggest using a note on your phone or a notebook to
            track your lifts, and then get in the habit of logging that into the
            app. It just takes a couple minutes, I like to do it in the morning
            with coffee.
          </p>
        </li>

        <li>
          <span style={{ fontSize: 18 }}>Step 3 Use your dashboard </span>
          <p>
            Your dashboard will provide you with the ability to choose a
            timeframe, and see the volume you've completed during this period.
            You can view individual workouts or weeks of training, and you can
            filter your volume and sets completed by target muscle or specific
            exercise. This means that you can get a perfect visualization of
            your volume on your deadlift over the past 6 months, assuming you've
            been diligently adding your training
          </p>
        </li>
      </ul>
    </Container>
  )
}

export default HowItWorks
