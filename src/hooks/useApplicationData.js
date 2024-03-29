import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Adding in interviews
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        const interviewDay = state.days.findIndex((day) =>
          day.appointments.includes(id)
        );

        const day = {
          ...state.days[interviewDay],
          spots: state.days[interviewDay].spots - 1,
        };
        const days = [...state.days];
        days.splice(interviewDay, 1, day);

        setState({
          ...state,
          days,
          appointments,
        });
      });
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {});
  }

  //Remove the selected interview
  function deleteInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      const interviewDay = state.days.findIndex((day) =>
        day.appointments.includes(id)
      );

      const day = {
        ...state.days[interviewDay],
        spots: state.days[interviewDay].spots + 1,
      };
      const days = [...state.days];
      days.splice(interviewDay, 1, day);

      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  //Get request to fetch appointments for each day
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
    editInterview,
  };
}
