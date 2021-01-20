import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList"
import "components/Appointment"
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Archie Cohen",
      interviewer: { 
        id: 2, 
        name: "Tori Malcolm", 
        avatar: "https://i.imgur.com/Nmx0Qxo.png" }
    }
  },
  {
    id: 5,
    time: "3pm",
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: { 
        id: 5, 
        name: "Sven Jones", 
        avatar: "https://i.imgur.com/twYrpay.jpg" }
    }
  },
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  let interviews = appointments.map(interview => 
    <Appointment
  key= {interview.id}
  time={interview.time} 
  avatar={interview.interview} 
  interview={interview.interview}
   />
  )


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
          days={days} 
          day={day} 
          setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <li {...interviews}>
        {interviews}
        <Appointment key="last" time="5pm" />
        </li>
      </section>
    </main>
  );
}

