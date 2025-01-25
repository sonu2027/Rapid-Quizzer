import React from 'react'
import Navbar from './Navbar.jsx'
import { useState } from 'react'
import fetchContest from '../databaseCall/fetchContest.js'
import Result from './Result.jsx'
import { useEffect } from 'react'

function Dashboard() {

  const [contest, setContest] = useState(null)

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
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3]) + Number.parseInt((e.totalQuestion / 60)) > hour) {
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3]) == hour && Number(e.date[4]) + (e.totalQuestion % 60) > min) {
          }
          else if (Number(e.date[0]) == year && Number(e.date[1]) == month && Number(e.date[2]) == day && Number(e.date[3]) == hour && Number(e.date[4]) == min && Number(e.date[5]) > sec) {
          }
          else {
            newRes.push(e)
          }
        })


        for (let i = 0; i < newRes.length; i++) {
          for (let j = i + 1; j < newRes.length; j++) {
            if (newRes[i].date[0] > newRes[j].date[0]) {
              let temp = newRes[i]
              newRes[i] = newRes[j]
              newRes[j] = temp;
            }
            else if (newRes[i].date[0] == newRes[j].date[0] && newRes[i].date[1] > newRes[j].date[1]) {
              let temp = newRes[i]
              newRes[i] = newRes[j]
              newRes[j] = temp;
            }
            else if (newRes[i].date[0] == newRes[j].date[0] && newRes[i].date[1] == newRes[j].date[1] && newRes[i].date[2] > newRes[j].date[2]) {
              let temp = newRes[i]
              newRes[i] = newRes[j]
              newRes[j] = temp;
            }
            else if (newRes[i].date[0] == newRes[j].date[0] && newRes[i].date[1] == newRes[j].date[1] && newRes[i].date[2] == newRes[j].date[2] && newRes[i].date[3] > newRes[j].date[3]) {
              let temp = newRes[i]
              newRes[i] = newRes[j]
              newRes[j] = temp;
            }
            else if (newRes[i].date[0] == newRes[j].date[0] && newRes[i].date[1] == newRes[j].date[1] && newRes[i].date[2] == newRes[j].date[2] && newRes[i].date[3] == newRes[j].date[3] && newRes[i].date[4] > newRes[j].date[4]) {
              let temp = newRes[i]
              newRes[i] = newRes[j]
              newRes[j] = temp;
            }
          }
        }

        let temp = newRes.filter((e) => e.performance.length > 0)
        console.log("new Res in dashboard: ", temp);
        setContest([...temp])
      })
      .catch((error) => {

      })
  }, [])

  const addLeadingZero = (number) =>
    number > 9 ? number : `0${number}`

  return (
    <div>
      <Navbar calling="dashboard" />
      <div className='flex flex-column gap-y-14'>
        {
          contest != null && contest.map((e) =>
            <div key={e._id}>

              <div className='flex justify-between px-1'>
                <h5>{`Contest date: ${addLeadingZero(e.date[2])}-${addLeadingZero(e.date[1] + 1)}-${e.date[0]} at ${addLeadingZero(e.date[3])}:${addLeadingZero(e.date[4])}:${addLeadingZero(e.date[5])}`}</h5>
                <h5>Total marks: {e.totalQuestion}</h5>
              </div>
              <h5 className='px-1 mb-2'>{`Subject: ${e.subject}, chapter: ${e.chapter}`}</h5>

              <Result contestUser={e} />
            </div>)
        }
      </div>
    </div>
  )
}

export default Dashboard