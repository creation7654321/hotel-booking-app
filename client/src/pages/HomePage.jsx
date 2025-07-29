import React from 'react'
import Banner from '../components/Banner'
import DreamVacation from '../components/DreamVacation'
import NextTrip from '../components/NextTrip'
import Hotel from '../components/Hotel'

function HomePage() {
  return (
    <div>
        <Banner />
        <DreamVacation />
        <NextTrip />
        <Hotel />
    </div>
  )
}

export default HomePage