import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const InterviewerListItemClass = classNames("interviewers__item-image", {
    "interviewers__item--selected ": props.selected,
  });

  return (
    <li className={InterviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
