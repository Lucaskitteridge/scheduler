export function getAppointmentsForDay(state, dayname) {
  const day = state.days.find(day => day.name === dayname);
  if(day){
    return day.appointments.map(id => state.appointments[id])
  } else {
    return []
  }
};

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

export function getInterviewersForDay(state, dayname) {
  const day = state.days.find(day => day.name === dayname);
  if(day){
    return day.interviewers.map(id => state.interviewers[id])
  } else {
    return []
  }
};

export function getTotalSpotsForDay(state, dayName) {
  return state.days
    .find(day => {
      return day.name === dayName;
    })
    .appointments.filter(appointment => {
      return state.appointments[appointment].interview === null;
    }).length;
}