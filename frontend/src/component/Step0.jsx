import React from 'react'

function Step0({username, setUsername, handleSubmit}) {
    return (
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="font-semibold text-3xl">
                        <p>Change Password</p>
                    </div>
                </div>

                <div>
                    <form action="" method="post">
                        <div className="flex flex-col space-y-16">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Enter your email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <div>
                                    <button onClick={handleSubmit} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Step0