import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Must select an interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            onChange={(event) => setName(event.target.value)}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate(name)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
