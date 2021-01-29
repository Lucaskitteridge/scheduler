//Selects the appointments for each day
export function getAppointmentsForDay(state, dayname) {
  const day = state.days.find(day => day.name === dayname);
  if (day) {
    return day.appointments.map(id => state.appointments[id]);
  } else {
    return [];
  }
}

//Matches up student and selected interviewer
export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  } else {
    return null;
  }
}

//Gets all the interviewers available for a current day
export function getInterviewersForDay(state, dayname) {
  const day = state.days.find(day => day.name === dayname);
  if (day) {
    return day.interviewers.map(id => state.interviewers[id]);
  } else {
    return [];
  }
}