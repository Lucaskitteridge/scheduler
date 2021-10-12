import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function InterviwerList(props) {
  let interviewers = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviwerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
