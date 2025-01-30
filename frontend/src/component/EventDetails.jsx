import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function EventDetails() {

    const location = useLocation()
    const { contest } = location.state

    const [month, setMonth] = useState(null)

    useEffect(() => {
        if (contest.date[1] == 0)
            setMonth("jan")
        else if (contest.date[1] == 1)
            setMonth("feb")
        else if (contest.date[1] == 2)
            setMonth("mar")
        else if (contest.date[1] == 3)
            setMonth("apr")
        else if (contest.date[1] == 4)
            setMonth("may")
        else if (contest.date[1] == 5)
            setMonth("jun")
        else if (contest.date[1] == 6)
            setMonth("jul")
        else if (contest.date[1] == 7)
            setMonth("aug")
        else if (contest.date[1] == 8)
            setMonth("sep")
        else if (contest.date[1] == 9)
            setMonth("oct")
        else if (contest.date[1] == 10)
            setMonth("nov")
        else if (contest.date[1] == 11)
            setMonth("dec")
    }, [])
    console.log("location.state: ", contest);

    const addLeadingZero = (number) =>
        number > 9 ? number : `0${number}`

    return (
        <div className='ml-3 mt-3'>
            <h5>Event Details</h5>
            <ul>
                <li className="list-disc pl-1">{`Start: ${addLeadingZero(contest.date[2])} ${month}, ${contest.date[0]} ${addLeadingZero(contest.date[3])}:${addLeadingZero(contest.date[4])}:${addLeadingZero(contest.date[5])}`}</li>
                <li className="list-disc pl-1">You have {contest.totalQuestion} min after the contest begins to start it </li>
                <li className="list-disc pl-1">The total number of question will be {contest.totalQuestion}</li>
                <li className="list-disc pl-1">Each question will carry 1 mark.</li>
            </ul>
        </div>
    )
}

export default EventDetails