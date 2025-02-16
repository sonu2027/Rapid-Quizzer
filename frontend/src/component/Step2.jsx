import { useState, react } from 'react'
import { toast } from 'react-hot-toast'
import changePassword from '../databaseCall/changePassword.js'
import { useNavigate } from 'react-router-dom'

function Step2({ username: email }) {

    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            toast.error("Password doesn't match")
            return
        }
        else if (password.length < 8) {
            toast.error("Password should consist atleast 8 character")
            return
        }
        changePassword(email, password)
            .then((res) => {
                if (res) {
                    toast.success("Your password has been changed successfully")
                    setTimeout(() => {
                        navigate("/")
                    }, 2000)
                }
                else if (!res) {
                    toast.error("Something went wrong, Please try again!")
                }
            })
            .catch((error) => {
                toast.success("Something went wrong, Please try again!")
            })
    }

    return (
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="font-semibold text-3xl">
                        <p>Enter new password</p>
                    </div>
                </div>

                <div>
                    <form onSubmit={handlePasswordChange}>
                        <div className="flex flex-col space-y-8">
                            {/* Input Fields */}
                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>

                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-5">
                                <div>
                                    <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Step2