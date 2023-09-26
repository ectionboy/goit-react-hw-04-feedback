import React, { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notificationcount } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  const handleFeedback = option => {
    if (option === 'good') {
      setGood(good + 1);
    }
    if (option === 'neutral') {
      setNeutral(neutral + 1);
    }
    if (option === 'bad') {
      setBad(bad + 1);
    }
  };

  const total = Object.values(options).reduce((total, currentItem) => {
    total += currentItem;
    return total;
  }, 0);

  const positivePercentage = Math.round((good / total) * 100);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={[...Object.keys(options)]}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notificationcount message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
};

export default App;

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleFeedback = option => {
//     this.setState(prevState => {
//       return {
//         [option]: prevState[option] + 1,
//       };
//     });
//   };
//   countTotalFeedback() {
//     const total = Object.values(this.state).reduce((total, currentItem) => {
//       total += currentItem;
//       return total;
//     }, 0);
//     return total;
//   }

//   countPositiveFeedbackPercentage() {
//     const positivePercentage =
//       (this.state.good / this.countTotalFeedback()) * 100;

//     return Math.round(positivePercentage);
//   }
//   render() {
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();
//     return (
//       <>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={[...Object.keys(this.state)]}
//             onLeaveFeedback={this.handleFeedback}
//           />
//         </Section>
//         <Section title="Statistics">
//           {total === 0 ? (
//             <Notificationcount message="There is no feedback" />
//           ) : (
//             <Statistics
//               good={this.state.good}
//               neutral={this.state.neutral}
//               bad={this.state.bad}
//               total={total}
//               percentage={positivePercentage}
//             />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
