import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Step0 from './Step0.jsx'
import Step1 from './Step1.jsx'
import Step2 from './Step2.jsx'
import sendEmailVerificationCode from '../databaseCall/sendVerificationEmail.js'
import checkEmailExistence from '../databaseCall/checkEmailExistence.js'

function ChangePassword() {

    const [inputCode, setInputCode] = useState(['', '', '', ''])
    const [username, setUsername] = useState("")
    const [step, setStep] = useState(0)
    const [code, setCode] = useState("")

    useEffect(() => {
        let str = ""
        for (let i of inputCode) {
            if (i != '') {
                str += i
            }
        }
        if (str.length == 4 && str == code) {
            console.log("otp verification successfull")
            setStep(2)
        }
    }, [inputCode])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username.length <= 0 || !username.includes("@gmail.com")) {
            return
        }

        checkEmailExistence(username)
            .then((emailExists) => {
                if (!emailExists) {
                    toast.error("Email does not exist!");
                    throw new Error("Email does not exist!")
                }

                return sendEmailVerificationCode(username);
            })
            .then((code) => {
                setCode(code);
                console.log("code is: ", code);
                toast.success("OTP successfully sent to your email");

                // Delay before proceeding to the next step
                setTimeout(() => {
                    setStep(1);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error: ", error);
                toast.error("Something went wrong. Please try again!");
            });
    }

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            {
                step == 0 &&
                <Step0 username={username} setUsername={setUsername} handleSubmit={handleSubmit} />
            }
            {
                step == 1 &&
                <Step1 username={username} setStep={setStep} setInputCode={setInputCode} inputCode={inputCode} handleSubmit={handleSubmit}/>
            }
            {
                step == 2 &&
                <Step2 username={username} />
            }
        </div >
    )
}

export default ChangePassword