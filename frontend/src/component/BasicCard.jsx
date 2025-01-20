import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import 'bootstrap/dist/css/bootstrap.min.css';

export const BasicCard = ({ setStartQuiz, contest }) => {

  const [date, setDate] = useState(new Date())
  const [contestDate, setContestDate] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState([0, 0, 0, 0])

  useEffect(() => {
    setContestDate(new Date(Number.parseInt(contest.date[0]), Number.parseInt(contest.date[1]), Number(contest.date[2]), Number(contest.date[3]), Number(contest.date[4]), Number(contest.date[5])))
  }, [])

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = contestDate - now;

      if (diff <= 0) {
        setTimeRemaining([0, 0, 0, 0]);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining([days, hours, minutes, seconds]);
    };

    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [contestDate]);


  return (
    <>
      {
        contest != null && <div className='w-96'>
          <CCard className="mt-4 mx-4">
            <CCardBody>
              <div>
                <div>
                  <p><strong>Time Remaining {timeRemaining[0]} days : {timeRemaining[1]} hr : {timeRemaining[2]} min : {timeRemaining[3]} sec</strong> </p>
                </div>

              </div>
              <CCardTitle>{contest.subject} - {contest.chapter}</CCardTitle>
              <CCardText>
                {contest.date[2]}<sup>th</sup> Jan, {contest.date[0]}, {contest.date[3]}:{contest.date[4]}pm
              </CCardText>
              <div className='flex justify-between items-center'>
                <button className={`bg-gray-300 px-3 py-2 rounded-md `}>View Details</button>
                {
                  (timeRemaining[0] == 0 && timeRemaining[1] == 0 && timeRemaining[2] == 0 && timeRemaining[3] == 0) ?
                    <button disabled={timeRemaining[0] != 0 || timeRemaining[1] != 0 || timeRemaining[2] != 0 || timeRemaining[3] != 0} className={`bg-blue-500 px-3 py-2 rounded-md text-white`} onClick={() => setStartQuiz(true)}>Start Quiz</button>
                    :
                    <button className={`bg-green-500 text-white px-3 py-2 rounded-md `}>Register</button>
                }
              </div>
            </CCardBody>
          </CCard>
        </div>
      }
    </>
  )
}