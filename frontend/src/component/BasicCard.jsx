import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import checkCookies from '../databaseCall/checkCookies.js';
import userRegistartionForContest from '../databaseCall/userRegistrationForContest.js';
import checkUserContestRegistration from '../databaseCall/checkUserContestRegistration.js';
import { toast } from 'react-hot-toast'

export const BasicCard = ({ setStartQuiz, contest, setContestSelected }) => {

  const [date, setDate] = useState(new Date())
  const [contestDate, setContestDate] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState([0, 0, 0, 0])
  const [ContestRegistartion, setContestRegistration] = useState(false)

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

  const registerUserForContest = () => {
    checkCookies()
      .then((res) => {
        if (res.status) {
          return res.status;
        } else {
          throw new Error("cookies don't exist");
        }
      })
      .then((status) => {
        if (status) {
          return userRegistartionForContest(contest._id);
        }
        throw new Error("User is not authenticated");
      })
      .then((registrationResponse) => {
        if (registrationResponse) {
          console.log("User registration successful for contest");
          return checkUserContestRegistration(contest._id);
        }
        throw new Error("Registration failed");
      })
      .then((contestRegistrationResponse) => {
        if (contestRegistrationResponse) {
          setContestRegistration(true);
        } else {
          throw new Error("User is not registered for the contest");
        }
      })
      .catch((error) => {
        console.log("User registration failed for contest:", error.message);
      });
  };

  useEffect(() => {
    checkUserContestRegistration(contest._id)
      .then((res) => {
        if (res) {
          setContestRegistration(true)
        }
        else {
          throw new Error("user is not registered")
        }
      })
      .catch((error) => {
        console.log("Error is: ", error);
      })
  }, [])

  const addLeadingZero = (number) =>
    number > 9 ? number : `0${number}`

  const handleStartQuiz = async () => {
    checkUserContestRegistration(contest._id)
      .then((res) => {
        if (res) {
          setContestSelected(contest)
          setStartQuiz(true)
        }
        else {
          toast.error("You haven't registered for this contest")
          throw new Error("user is not registered")
        }
      })
      .catch((error) => {
        toast.error("Something went wrong")
        console.log("Error is: ", error);
      })
  }

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
                <b>Start : </b>{contest.date[2]}<sup>th</sup> Jan, {contest.date[0]}, {contest.date[3]}:{addLeadingZero(contest.date[4])}
              </CCardText>
              <div className='flex justify-between items-center'>
                <button className={`bg-gray-300 px-3 py-2 rounded-md `}>View Details</button>
                {
                  (timeRemaining[0] == 0 && timeRemaining[1] == 0 && timeRemaining[2] == 0 && timeRemaining[3] == 0) ?
                    <button disabled={timeRemaining[0] != 0 || timeRemaining[1] != 0 || timeRemaining[2] != 0 || timeRemaining[3] != 0} className={`bg-blue-500 px-3 py-2 rounded-md text-white`} onClick={() => handleStartQuiz()}>Start Quiz</button>
                    :
                    <>
                      {
                        ContestRegistartion ? <button className={`bg-green-500 text-white px-3 py-2 rounded-md `}>Registered</button>
                          :
                          <button onClick={() => registerUserForContest()} className={`bg-green-500 text-white px-3 py-2 rounded-md `}>Register</button>
                      }
                    </>
                }
              </div>
            </CCardBody>
          </CCard>
        </div>
      }
    </>
  )
}