import { useState } from "react";
import Notification from "../Notification/Notification";
import Section from "../Section/Section";
import Statistics from "../Statistics/Statistics";
import FeedbackOptions from "./FeedbackOptions";
import s from "./Feedback.module.css";

export default function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = (item) => {
    switch (item) {
      case "good":
        setGood((s) => s + 1);
        break;
      case "neutral":
        setNeutral((s) => s + 1);
        break;
      case "bad":
        setBad((s) => s + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / countTotalFeedback());
  };

  return (
    <div className={s.feedback}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={onLeaveFeedback}
          options={["good", "neutral", "bad"]}
        />
      </Section>
      <Section title="Statistics" className={s.statistics}>
        {countTotalFeedback() === 0 ? (
          <Notification message="No one reported yet"></Notification>
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
}
