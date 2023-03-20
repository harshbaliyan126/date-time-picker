import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Calender from "./Calender";
import Time from "./Time";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  format,
  startOfToday,
  isAfter,
} from 'date-fns';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Datetimepicker() {

  const [checktrue, setchecktrue] = useState(false);
  const [checkDateTimePicker, setcheckDateTimePicker] = useState(false);
  const [parent] = useAutoAnimate(/* optional config */)
  const [calender] = useAutoAnimate(/* optional config */)

  let today = startOfToday();

  const [startDate, setstartDate] = useState(null);
  const [startselectedDay, setstartSelectedDay] = useState(today);
  const [startcurrentMonth, setstartCurrentMonth] = useState(format(today, 'MMM-yyyy'));

  const [endDate, setendDate] = useState(null);
  const [endselectedDay, setendSelectedDay] = useState(today);
  const [endcurrentMonth, setendCurrentMonth] = useState(format(today, 'MMM-yyyy'));

  const [startTime, setstartTime] = useState(null);
  const [startTimehr, setstartTimehr] = useState('00');
  const [startTimemin, setstartTimemin] = useState('00');
  const [startTimeap, setstartTimeap] = useState('AM');

  const [endTime, setendTime] = useState(null);
  const [endTimehr, setendTimehr] = useState('00');
  const [endTimemin, setendTimemin] = useState('00');
  const [endTimeap, setendTimeap] = useState('AM');

  const handleSetClick = () => {
    const start = format(startselectedDay, 'dd/MM/yyyy');
    const end = format(endselectedDay, 'dd/MM/yyyy');
    setstartDate(start);
    setcheckDateTimePicker(false);

    if(isAfter(startselectedDay, endselectedDay))
        setendDate(start);
    else
      setendDate(end);

    if(startDate === endDate && startTime > endTime)
        setendTime(startTime);

    setchecktrue(true);
  };

  const changeToOriginal = () => {
    setstartDate(null);
    setendDate(null);
    setstartTime(null);
    setendTime(null);
    setstartSelectedDay(today);
    setendSelectedDay(today);
    setstartCurrentMonth(format(today, 'MMM-yyyy'));
    setendCurrentMonth(format(today, 'MMM-yyyy'));
    setstartTimehr('00');
    setendTimehr('00');
    setstartTimemin('00');
    setendTimemin('00');
    setstartTimeap('AM');
    setendTimeap('AM');
  };

  return (
    <div className="shadow-2xl rounder-lg flex justify-center items-center h-screen">
      <div className="max-w-md px-4 mx-auto sm:px-7 h-screen md:max-w-4xl md:px-6" >
        <div className="flex justify-center p-2 m-2">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded inline-flex items-center" onClick={() => {
            setcheckDateTimePicker(!checkDateTimePicker);
            changeToOriginal();
            setchecktrue(false);
          }}>
            {checktrue && `${startDate} ${startTime} - ${endDate} ${endTime}`}
            {!checktrue && 'Select Date and Time'}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          </button>
        </div>
        {checkDateTimePicker && <div className="shadow-2xl rounder-3xl w-full max-w-md  mx-auto" ref={parent}>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 ">
              <Tab className={({ selected }) => classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )}>
                Start
              </Tab>
              <Tab className={({ selected }) => classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )}>
                End
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2" ref={calender}>
              <Tab.Panel className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
              )}>
                <Calender selectedDay={startselectedDay} setSelectedDay={setstartSelectedDay} currentMonth={startcurrentMonth} setCurrentMonth={setstartCurrentMonth} />
                <Time hourSelected={startTimehr} sethourSelected={setstartTimehr} minuteSelected={startTimemin} setminuteSelected={setstartTimemin} ampmSelected={startTimeap} setampmSelected={setstartTimeap} setTime={setstartTime} />
              </Tab.Panel>
              <Tab.Panel className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
              )}>
                <Calender selectedDay={endselectedDay} setSelectedDay={setendSelectedDay} currentMonth={endcurrentMonth} setCurrentMonth={setendCurrentMonth} />
                <Time hourSelected={endTimehr} sethourSelected={setendTimehr} minuteSelected={endTimemin} setminuteSelected={setendTimemin} ampmSelected={endTimeap} setampmSelected={setendTimeap} setTime={setendTime} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="flex justify-end pb-4 pr-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleSetClick}>
              Set
            </button>
            <div className="pl-2">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => {
                  setcheckDateTimePicker(!checkDateTimePicker);
                  changeToOriginal();
                  setchecktrue(false);
                }}>
                Clear
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}
