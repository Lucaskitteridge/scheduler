import React from 'react'

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Status from"./Status"
import Confirm from "./Confirm"
import Error from "./Error"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVE = "SAVE"
const DELETE = "DELETE"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //Calling the deleteInterview function to remove from database and then transition
  function remove(event) {
    const interview = null;
    transition(DELETE, true);
    props.deleteInterview(props.id, interview)
      .then(() => {
        transition(EMPTY)
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      });
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVE);

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch(() => {
      transition(ERROR_SAVE, true)
    });
    }

    //All the possible different windows in the apoointment windows and when they're callee
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === CREATE && <Form onSave={(name, interviewer) => save(name, interviewer)} onCancel={back} interviewers={props.interviewers}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && <Confirm message={"Are you sure?"} onConfirm={remove} onCancel={back}/>}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === EDIT && <Form name={props.interview.student} onSave={(name, interviewer) => save(name, interviewer)} onCancel={back} interviewer={props.interview.interviewer.id} interviewers={props.interviewers}/>}
      {mode === ERROR_SAVE && (props.interview ?
          <Error message="Error saving! Please try again later" onClose={back}/> :
          <Error message="Error saving! Please try again later" onClose={back}/>)}
      {mode === ERROR_DELETE && <Error message="Error deleting! Please try again" onClose={() => transition(SHOW)}/>}
    </article>
  )
}