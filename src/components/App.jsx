// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';
import { Container } from './App.styled';
import { Statistics } from './Statistics/Statisctics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleCounterFeedback = ({ target: { name } }) => {
    switch (name) {
      case 'good':
        setGood(good + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return bad + good + neutral;
  };

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() === 0) {
      return 0;
    }
    const positiveFeedback = (good * 100) / countTotalFeedback();
    return Math.round(positiveFeedback);
  };

  return (
    <Container>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleCounterFeedback}
        />
      </Section>
      <Section title={'Statistics'}>
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={countTotalFeedback()}
            positivePercent={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message={'There is feedback'} />
        )}
      </Section>
    </Container>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func,
};

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  positivePercent: PropTypes.number.isRequired,
};
