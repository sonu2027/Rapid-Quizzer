import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import registerUser from '../databaseCall/registerUser.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import sendEmailVerificationCode from '../databaseCall/sendVerificationEmail.js'

function VerifyEmail() {

    const location = useLocation()
    const navigate = useNavigate()
    const userData = location.state

    // Create refs for each input box
    const inputRefs = [useRef(), useRef(), useRef(), useRef()]
    const [inputCode, setInputCode] = useState(['', '', '', ''])

    useEffect(() => {
        let str = ""
        for (let i of inputCode) {
            if (i != '') {
                str += i
            }
        }
        if (str.length == 4 && str == userData.code) {
            console.log("otp verification successfull");
            console.log(userData);
            registerUser(userData)
                .then((res) => {
                    console.log("Response: ", res);
                    toast.success("Registration successfull")
                    setTimeout(() => {
                        navigate("/home")
                    }, 2000)
                })
                .catch((error) => {
                    if (error == false) {
                        toast.error("user already exist")
                        setTimeout(() => {
                            navigate(-1)
                        }, 4000)
                    }
                    console.log("Error: ", error);
                })
        }
    }, [inputCode])

    // Handle input change
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

    // Handle keydown for backspace
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            // Move to the previous input box if Backspace is pressed
            inputRefs[index - 1].current.focus()
        }
    }

    const resendOTP = (e) => {
        e.preventDefault()
        e.stopPropagation()
        sendEmailVerificationCode(userData.email)
            .then((code) => {
                console.log("userData.code before updation: ", userData.code);
                userData.code = code
                console.log("userData.code after updation: ", userData.code);
                toast.success("OTP successfully sent to your email")
            })
            .catch((error) => {
                toast.error("Something went wrong, please try again")
                console.log("Error is: ", error);
            })
    }

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-1">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {userData.email.slice(0, 4)}**@gmail.com</p>
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

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }
                                        } className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-2 bg-blue-700 border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex justify-center space-x-1 text-sm font-medium text-gray-500">
                                        <p>Didn't receive code?</p>
                                        <button onClick={resendOTP} className="flex justify-center items-start text-blue-600" >Resend</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
