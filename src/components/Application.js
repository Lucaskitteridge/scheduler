import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();


  let schedule = getAppointmentsForDay(state, state.day)
  .map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        {...appointment}
        key= {appointment.id}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
   />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            day={state.day} 
            setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <li {...schedule}>
        {schedule}
        <Appointment key="last" time="5pm"/>
        </li>
      </section>
    </main>
  );
}

