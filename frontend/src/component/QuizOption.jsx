const QuizOption = ({ index, answer, selectedAnswerIndex, onAnswerSelected, }) => {
    return (
        <div className="relative mt-4 cursor-pointer">
            <input
                type="radio"
                id={`choice-${index}`}
                name="quiz"
                value={answer}
                checked={selectedAnswerIndex === index}
                onChange={() => onAnswerSelected(answer, index)}
                className="hidden"
            />
            <label
                htmlFor={`choice-${index}`}
                className={`block cursor-pointer rounded-lg border border-[#333] bg-[#0f172a] px-4 py-3 text-md text-white transition-colors duration-300 ease-in-out ${selectedAnswerIndex === index ? 'border-[#2f459c] bg-[#2f459c]' : ''
                    }`}
            >
                {answer}
            </label>
        </div>
    )
}

export default QuizOption