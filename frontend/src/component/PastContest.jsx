import fetchContest from "../databaseCall/fetchContest.js"
import { useEffect, useState } from 'react'
import checkCookies from '../databaseCall/checkCookies.js'
import { useNavigate } from "react-router-dom"
import QuizCard from './QuizCard.jsx'
import { BasicCard } from './BasicCard.jsx'
import Navbar from './Navbar.jsx'

export default function PastContest() {

  const [startQuiz, setStartQuiz] = useState(false)
  const navigate = useNavigate()
  const [pastContest, setPastContest] = useState([])


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
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) > month) {
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) > day) {
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3])+Number.parseInt((e.totalQuestion/60)) > hour) {
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3]) == hour && Number(e.date[4])+(e.totalQuestion%60) > min) {
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3]) == hour && Number(e.date[4]) == min && Number(e.date[5]) > sec) {
          }
          else {
            newRes.push(e)
          }
        })
        setPastContest([...newRes])
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
      <Navbar calling="pastcontest" />
      {
        pastContest != null && pastContest.map((e) => <div key={e.date[0] + e.date[1] + e.date[2] + e.date[3] + e.date[4] + e.date[5]} className='mt-4 mx-2 flex justify-center items-center'>
          <BasicCard contest={e} setStartQuiz={setStartQuiz} />
        </div>)
      }
    </div>
  )
}