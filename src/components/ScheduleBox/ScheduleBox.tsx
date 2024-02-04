import React from "react";
import { SendMessage } from "../SendMessage/SendMessage";

import "./ScheduleBox.scss";

export const ScheduleBox = ({ title }: { title: string }) => {
  return (
    <div className="schedule-box">
      <h2 className="box-header">{title}</h2>
      <div className="box-form-wrapper">
        <SendMessage />
      </div>
    </div>
  );
};
