import { useEffect, useState } from "react"
import { nanoid } from 'nanoid';

function Result({ contestUser }) {

    const [contest, setContest] = useState(null)

    useEffect(() => {
        let temp = contestUser.performance
        for (let i = 0; i < temp.length; i++) {
            for (let j = i + 1; j < temp.length; j++) {
                if (temp[i][1] < temp[j][1]) {
                    let x = temp[i]
                    temp[i] = temp[j]
                    temp[j] = x
                }
                else if (temp[i][1] == temp[j][1] && temp[i][2] > temp[j][2]) {
                    let x = temp[i]
                    temp[i] = temp[j]
                    temp[j] = x
                }
            }
        }

        setContest([...temp])
    }, [])

    const addLeadingZero = (number) =>
        number > 9 ? number : `0${number}`

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-700 font-medium border-b">Rank</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-medium border-b">Username</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-medium border-b">Name</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-medium border-b">Score</th>
                            <th className="px-4 py-2 text-left text-gray-700 font-medium border-b">Time Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contest != null && contest.map((user, index) => <tr key={nanoid()} className="odd:bg-white even:bg-gray-50">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{user[3]}</td>
                                <td className="px-4 py-2 border-b">{user[4]}</td>
                                <td className="px-4 py-2 border-b">{user[1]}</td>
                                <td className="px-4 py-2 border-b">{addLeadingZero(Number.parseInt(user[2] / 3600))} : {addLeadingZero(Number.parseInt(user[2] % 3600 / 60))} : {addLeadingZero(user[2] % 3600 % 60)}</td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Result