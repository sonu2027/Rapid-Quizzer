import fetchContest from "../databaseCall/fetchContest.js"
import { useEffect, useState } from 'react'
import checkCookies from '../databaseCall/checkCookies.js'
import QuizCard from './QuizCard.jsx'
import { BasicCard } from './BasicCard.jsx'
import Navbar from './Navbar.jsx'
import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  const [startQuiz, setStartQuiz] = useState(false)
  const [upcomingContest, setUpcomingContest] = useState([])
  const [contestSelected, setContestSelected]=useState(null)

  useEffect(() => {
    fetchContest()
      .then((res) => {
        console.log("res: ", res);
        console.log("contest date: ", res[0].date);

        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth()
        const day = now.getDate()
        const hour = now.getHours()
        const min = now.getMinutes()
        const sec = now.getSeconds()

        let newRes = []
        res.forEach(e => {
          if (Number(e.date[0]) > year) {
            newRes.push(e)
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) > month) {
            newRes.push(e)
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) > day) {
            newRes.push(e)
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3])+Number.parseInt((e.totalQuestion/60)) > hour) {
            newRes.push(e)
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3]) == hour && Number(e.date[4])+(e.totalQuestion%60) > min) {
            newRes.push(e)
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3]) == hour && Number(e.date[4]) == min && Number(e.date[5]) > sec) {
            newRes.push(e)
          }
        })
        setUpcomingContest([...newRes])
      })
      .catch((error) => {

      })
  }, [])

  useEffect(() => {
    checkCookies()
      .then((res) => {
        if (!res.status) {
          navigate("/")
        }
      })
      .catch((error) => {
        if (!res.status) {
          navigate("/")
        }
      })
  }, [])

  return (
    <div>
      <Navbar calling="upcomingcontest" />
      {
        startQuiz ?
          <div className='sm:p-4' id='quiz-component'>
            <QuizCard contest={contestSelected} setStartQuiz={setStartQuiz} />
          </div>
          :
          upcomingContest != null && upcomingContest.map((e) => <div key={e.date[0] + e.date[1] + e.date[2] + e.date[3] + e.date[4] + e.date[5]} className='mt-4 mx-2 flex justify-center items-center'>
            <BasicCard contest={e} setContestSelected={setContestSelected} setStartQuiz={setStartQuiz} />
          </div>)
      }
    </div>
  )
}