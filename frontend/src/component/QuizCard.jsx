import { Timer } from 'lucide-react'
import { useEffect, useState } from 'react'
import QuizOption from './QuizOption.jsx'
import fetchQuestion from '../databaseCall/fetchQuestion.js'

const QuizCard = ({ setStartQuiz }) => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [timer, setTimer] = useState(10)
    const [allQuestion, setAllQuestion] = useState([])
    const [obtainMarks, setObtainMarks] = useState(0)
    const [showResult, setShowResult] = useState(false)

    const onClickNext = () => {
        console.log("answerselected is: ", allQuestion[activeQuestion].options[selectedAnswerIndex]);

        console.log("obtain marks is: ", obtainMarks);

        if (allQuestion[activeQuestion].options[selectedAnswerIndex] == allQuestion[activeQuestion].answer) {
            setObtainMarks((prev) => prev + 1)
        }

        setSelectedAnswerIndex(null)

        if (activeQuestion !== allQuestion.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            setShowResult(true)
            setTimeout(() => {
                setShowResult(false)
                setActiveQuestion(0)
                setSelectedAnswerIndex(null)
                setTimer(10)
                setObtainMarks(0)
                setStartQuiz(false)
            }, 5000)
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
            setShowResult(true)
            setTimeout(() => {
                setShowResult(false)
                setActiveQuestion(0)
                setSelectedAnswerIndex(null)
                setTimer(10)
                setObtainMarks(0)
                setStartQuiz(false)
            }, 5000)
        }
    }, [timer])

    const addLeadingZero = (number) =>
        number > 9 ? number : `0${number}`

    useEffect(() => {
        fetchQuestion()
            .then((res) => {
                console.log("res: ", res[0].options);
                setAllQuestion(res)
            })
            .catch((error) => {

            })
    }, [])

    return (
        <>
            {
                allQuestion.length === 0 || showResult ?
                    <div className='className="mx-auto max-w-3xl rounded-md sm:border sm:border-[#444444] bg-[#1e293b] px-[15px] py-[15px] sm:px-[60px] sm:py-[30px]'>
                        <h2>Final score</h2>
                        <h3>You got {obtainMarks} out of 10</h3>
                    </div>
                    :
                    <div className="mx-auto max-w-3xl rounded-md sm:border sm:border-[#444444] bg-[#1e293b] px-[15px] py-[15px] sm:px-[60px] sm:py-[30px]">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-lg font-medium text-[#38bdf8]">
                                    {activeQuestion + 1}
                                </span>
                                <span className="text-lg font-medium text-[#817a8e]">
                                    /{10}
                                </span>
                            </div>
                            <div className="flex w-[150px] items-center gap-2">
                                <Timer color="#38bdf8" width={28} height={28} />
                                <span className="mt-1 block text-lg font-medium text-[#38bdf8]">
                                    00:{addLeadingZero(timer)} min
                                </span>
                            </div>
                        </div>
                        <h3 className="my-4 text-lg font-medium">{allQuestion[activeQuestion].question}</h3>
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
                                onClick={onClickNext}
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