import { Timer } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import QuizOption from './QuizOption.jsx'
import fetchQuestion from '../databaseCall/fetchQuestion.js'
import setScoreAndTimetaken from '../databaseCall/setScoreAndTimetaken.js'

const QuizCard = ({ setStartQuiz, contest }) => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [timer, setTimer] = useState(1)
    const [currentTime, setCurrentTime] = useState(60)
    const [allQuestion, setAllQuestion] = useState([])
    const [obtainMarks, setObtainMarks] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [timeTaken, setTimeTaken] = useState(0)
    let clickedNext = false

    const onClickNext = () => {
        clickedNext = true
        console.log("answerselected is: ", allQuestion[activeQuestion].options[selectedAnswerIndex]);

        if (allQuestion[activeQuestion].options[selectedAnswerIndex] == allQuestion[activeQuestion].answer) {
            setObtainMarks((prev) => prev + 1)
        }

        setSelectedAnswerIndex(null)

        if (activeQuestion !== allQuestion.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            let totalMinTaken = timeTaken - timer
            let totalSecTaken = 60 - currentTime
            let totalTimeTaken = (totalMinTaken * 60) + totalSecTaken

            setScoreAndTimetaken(contest._id, obtainMarks, totalTimeTaken)
                .then((res) => {

                })
                .catch((error) => {

                })

            setShowResult(true)
            setTimeout(() => {
                setShowResult(false)
                setActiveQuestion(0)
                setSelectedAnswerIndex(null)
                setTimer(1)
                setStartQuiz(false)
            }, 8000)
        }
    }

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
    }

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer(timer - 1), 60000)
            return () => clearInterval(countdown)
        }
        else {
            let totalTimeTaken = timeTaken * 60

            setScoreAndTimetaken(contest._id, obtainMarks, totalTimeTaken)
                .then((res) => {

                })
                .catch((error) => {

                })

            setShowResult(true)
            setTimeout(() => {
                setShowResult(false)
                setActiveQuestion(0)
                setSelectedAnswerIndex(null)
                setTimer(1)
                setStartQuiz(false)
            }, 10000)
        }
    }, [timer])

    const addLeadingZero = (number) =>
        number > 9 ? number : `0${number}`

    useEffect(() => {
        setTimer(contest.totalQuestion)
        setTimeTaken(contest.totalQuestion)
        fetchQuestion()
            .then((res) => {
                let newRes = []
                res.map((e) => {

                    if (e.chapter === `${contest.chapter}`) {
                        console.log("e.chapter === `${contest.chapter}`", e.chapter, contest.chapter);
                        newRes.push(e)
                    }
                })

                let newArray = []
                for (let i = 0; i < contest.totalQuestion; i++) {
                    let randomIndex = Math.floor(Math.random() * (contest.totalQuestion - i));
                    newArray.push(newRes[randomIndex])
                    newRes.splice(randomIndex, 1);
                }
                setAllQuestion(newArray)

            })
            .catch((error) => {

            })
    }, [])

    useEffect(() => {
        let interval = setInterval(() => {
            if (currentTime == 0) {
                setCurrentTime(60)
                onClickNext()
                clearInterval(interval)
                return
            }
            if (clickedNext) {
                setCurrentTime(60)
                clickedNext = false
                clearInterval(interval)
                return
            }
            setCurrentTime(currentTime - 1)
            clearInterval(interval)
        }, 1000)
    }, [currentTime])

    const componentRef = useRef();

    useEffect(() => {
        if (componentRef.current) {
            componentRef.current.requestFullscreen?.().catch((err) => {
                console.error("Failed to enter full-screen mode:", err);
            });
        }
    }, []);

    return (
        <>
            {
                allQuestion.length === 0 || showResult ?
                    <div ref={componentRef} className='className="mx-auto max-w-3xl rounded-md sm:border sm:border-[#444444] bg-[#1e293b] px-[15px] py-[15px] sm:px-[60px] sm:py-[30px]'>
                        <h2>Final score</h2>
                        <h3>You got {obtainMarks} out of {contest.totalQuestion}</h3>
                    </div>
                    :
                    <div className="mx-auto max-w-3xl rounded-md sm:border sm:border-[#444444] bg-[#1e293b] px-[15px] py-[15px] sm:px-[60px] sm:py-[30px]">
                        <div className="flex w-[150px] items-center gap-2 my-4">
                            <Timer color="#38bdf8" width={28} height={28} />
                            <span className="mt-1 block text-lg font-medium text-[#38bdf8]">
                                00:{addLeadingZero(timer)} min left
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-lg font-medium text-[#38bdf8]">
                                    {activeQuestion + 1}
                                </span>
                                <span className="text-lg font-medium text-[#817a8e]">
                                    /{contest.totalQuestion}
                                </span>
                            </div>
                            <div className="flex w-[150px] items-center gap-2">
                                <Timer color="#38bdf8" width={28} height={28} />
                                <span className="mt-1 block text-lg font-medium text-[#38bdf8]">
                                    {addLeadingZero(currentTime)} sec left
                                </span>
                            </div>
                        </div>
                        <h3 style={{ whiteSpace: "pre-wrap" }} className="my-4 text-lg font-medium">{allQuestion[activeQuestion].question}</h3>
                        <form>
                            {allQuestion[activeQuestion].options.map((e, i) => (
                                <QuizOption
                                    key={e}
                                    index={i}
                                    answer={e}
                                    selectedAnswerIndex={selectedAnswerIndex}
                                    onAnswerSelected={onAnswerSelected}
                                />
                            ))}
                        </form>
                        <div className="flex justify-end">
                            <button
                                onClick={() => onClickNext()}
                                disabled={selectedAnswerIndex === null}
                                className="mt-12 min-w-[150px] transform cursor-pointer rounded-md border border-[#38bdf8] bg-[#38bdf8] px-5 py-1.5 text-lg font-semibold text-white outline-none transition duration-300 ease-in-out hover:scale-105 hover:bg-[#1d4ed8] active:scale-95 active:bg-[#1e40af] disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:hover:scale-100"
                            >
                                {activeQuestion === allQuestion.length - 1 ? 'Finish' : 'Next'}
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}

export default QuizCard