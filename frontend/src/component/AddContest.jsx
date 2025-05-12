import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useState } from 'react';
import { addContest } from '../databaseCall/addContest.js';
import { toast } from 'react-hot-toast'

export default function AddContest() {

    const [value, setValue] = React.useState(dayjs('2025-01-31'));
    const [time, setTime] = React.useState(dayjs('2025-01-31T15:30'));
    const [subject, setSubject] = useState(null)
    const [chapter, setChapter] = useState(null)
    const [selectChapter, setSelectChapter] = useState(null)
    const [totalQuestion, setTotalQuestion] = useState(0)

    const handleForm = (e) => {
        e.preventDefault()
        // console.log("date: ", value, typeof value);
        // console.log("time: ", time, typeof time);
        // console.log("subject: ", subject, typeof subject);
        // console.log("selectChapter: ", selectChapter, typeof selectChapter);
        // console.log("totalQuestion: ", totalQuestion, typeof totalQuestion);
        addContest({ date: [value.$y, value.$M, value.$D, time.$H, time.$m, time.$s], subject, chapter: selectChapter, totalQuestion })
            .then((res) => {
                toast.success("Contest added successfully")
                setValue(dayjs('2025-01-31'))
                setTime(dayjs('2025-01-31T15:30'))
                setSubject(null)
                setChapter(null)
                setSelectChapter(null)
                setTotalQuestion(0)
            })
            .catch((error) => {
                toast.error("Something went wrong while adding contest, please try again")
            })
    }

    return (
        <div className='flex justify-center items-center my-4'>
            <form onSubmit={handleForm} className='border border-1 border-solid border-gray-300 px-4 py-2 rounded-md'>
                <h2 className="text-base/7 font-semibold text-gray-900">Set the contest date and time</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="select the date"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <div className='mt-6'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker', 'TimePicker']}>
                            <TimePicker
                                label="Select Time"
                                value={time}
                                onChange={(newValue) => setTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">About Question</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                    Choose Subject
                                </label>
                                <fieldset>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                onChange={() => {
                                                    setSubject("Aptitude")
                                                    const temp = ["Time and Distance", "Profit and Loss", "Percentage"]
                                                    setChapter([...temp])
                                                }}
                                                checked={subject === "Aptitude"}
                                                id="aptitude"
                                                name="subject"
                                                type="radio"
                                            />
                                            <label htmlFor="aptitude" className="block text-sm/6 font-medium text-gray-900">
                                                Aptitude
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                checked={subject === "Reasoning"}
                                                onChange={() => {
                                                    setSubject("Reasoning")
                                                    const temp = ["Coding-Decoding", "Blood Relation", "Seating Arrangement", "Directional Sense"]
                                                    setChapter([...temp])
                                                }}
                                                id="reasoning"
                                                name="subject"
                                                type="radio"
                                            />
                                            <label htmlFor="reasoning" className="block text-sm/6 font-medium text-gray-900">
                                                Reasoning
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                checked={subject === "Pseudo Code"}
                                                onChange={() => {
                                                    setSubject("Pseudo Code")
                                                    const temp = ["Pseudo Code"]
                                                    setChapter([...temp])
                                                }}
                                                id="pseudo-code"
                                                name="subject"
                                                type="radio"
                                            />
                                            <label htmlFor="pseudo-code" className="block text-sm/6 font-medium text-gray-900">
                                                Pseudo Code
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                checked={subject === "Coding"}
                                                onChange={() => {
                                                    setSubject("Coding")
                                                    const temp = ["DSA"]
                                                    setChapter([...temp])
                                                }}
                                                id="coding"
                                                name="subject"
                                                type="radio"
                                            />
                                            <label htmlFor="coding" className="block text-sm/6 font-medium text-gray-900">
                                                Coding
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        {
                            subject != null && <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                        Choose Subject
                                    </label>
                                    <fieldset>
                                        <div className="mt-6 space-y-6">
                                            {
                                                chapter.map((element) => <div key={element} className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={() => setSelectChapter(element)}
                                                        checked={element === selectChapter}
                                                        id={element}
                                                        name="selecet-chapter"
                                                        type="radio"
                                                    />
                                                    <label htmlFor={element} className="block text-sm/6 font-medium text-gray-900">
                                                        {element}
                                                    </label>
                                                </div>)
                                            }
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        }
                        <div className='mt-8'>
                            <label htmlFor="total-question" className="block text-sm/6 font-medium text-gray-900">
                                Total Question
                            </label>
                            <input value={totalQuestion} onChange={(e) => setTotalQuestion(e.target.value)} id='total-question' type="number" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-1 border-solid border-gray-300 mt-2" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Set
                    </button>
                </div>
            </form>
        </div>
    )
}
