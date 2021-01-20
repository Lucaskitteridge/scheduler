import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList"
import "components/Appointment"
import Appointment from "components/Appointment";

import axios from "axios"

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

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  let interviews = appointments.map(interview => 
    <Appointment
  key= {interview.id}
  time={interview.time} 
  avatar={interview.interview} 
  interview={interview.interview}
   />
  )

  useEffect(() => {
    axios.get("/api/days").then(response => {
      setDays([...response.data])
    })
}, [])

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

