import { React, useRef } from 'react'
function Step1({ username, setStep, setInputCode, inputCode, handleSubmit }) {

    const inputRefs = [useRef(), useRef(), useRef(), useRef()]

    const handleChange = (e, index) => {
        const value = e.target.value
        let newArr = [...inputCode]
        newArr[index] = value
        setInputCode(newArr)
        if (value.length === 1 && index < inputRefs.length - 1) {
            // Move to the next input box if a value is entered
            inputRefs[index + 1].current.focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            // Move to the previous input box if Backspace is pressed
            inputRefs[index - 1].current.focus()
        }
    }

    return (
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-1">
                    <div className="font-semibold text-3xl">
                        <p>Email Verification</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                        <p>We have sent a code to your email {username.slice(0, 4)}**@gmail.com</p>
                    </div>
                </div>

                <div>
                    <form action="" method="post">
                        <div className="flex flex-col space-y-6">
                            {/* Input Fields */}
                            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="w-16 h-16 ">
                                        <input
                                            ref={inputRefs[index]} // Attach ref to input
                                            className="w-full h-10 text-center px-2 outline-none rounded-xl border border-gray-200 text-lg focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="number"
                                            min={0}
                                            max={9}
                                            maxLength={1}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                        />
                                    </div>
                                ))}
                            </div>

                                <div className="flex justify-center space-x-1 text-sm font-medium text-gray-500">
                                    <p>Didn't receive code?</p>
                                    <button onClick={handleSubmit} className="flex justify-center items-start text-blue-600" >Resend</button>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Step1