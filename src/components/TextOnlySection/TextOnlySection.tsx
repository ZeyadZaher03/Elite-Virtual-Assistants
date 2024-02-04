import React from "react";

import "./TextOnlySection.scss";

export const TextOnlySection = () => {
  return (
    <div className="text-only-section__wrapper">
      <div className="text-only-section__container">
        <h2 className="text-only-section__header">
          We created Elite Virtual Assistant to take care cold calling for you
        </h2>
        <div className="text-only-section__body">
          <p>
            Cold calling is admittedly one of the most effort-intensive aspects
            of a business, those in real estate, loan & financing, home service,
            insurance, and other B2B all know this.
          </p>
          <p>
            Others already called it quits and are focusing on different lead
            generation strategies instead. But to those who have been crushing
            sales goals for most of their professional careers, they know cold{" "}
            <b>calling is instrumental to their success</b>.
          </p>
          <p>
            Those who renounce cold calling all have one thing in common — they
            lack access to crucial data.
          </p>
          <p>
            Elite Virtual Assistant deliver over-the-top results because we have{" "}
            <b>actionable data at the tip of our hands.</b> Data that allows us
            to contact your target market, understand their pain points, and
            translate it into persuasive scripts — so your offer can be heard.
          </p>
        </div>
      </div>
    </div>
  );
};
