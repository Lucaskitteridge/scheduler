export function getAppointmentsForDay(state, dayname) {
  const day = state.days.find(day => day.name === dayname);
  if(day){
    return day.appointments.map(id => state.appointments[id])
  } else {
    return []
  }
};

