import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
    startOfToday,
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    eachYearOfInterval,
    getDecade,
    isAfter,
    isBefore
  } from 'date-fns'

import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CalenderEnd({selectedDay, setSelectedDay, currentMonth, setCurrentMonth, ssd, setSsd}) {

  const today = startOfToday();
  const colStartClasses = [
        '',
        'col-start-2',
        'col-start-3',
        'col-start-4',
        'col-start-5',
        'col-start-6',
        'col-start-7',
   ];
  const arrMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [selectCalender, setSelectCalender] = useState(true);
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectYear, setSelectYear] = useState(false);
  const [currm, setcurrm] = useState(format(today, 'LLL'));
  const [bar, setbar] = useState(true);
  const [yearbar, setyearbar] = useState(false);
  const [changeComponet, enableAnimations] = useAutoAnimate()
  const [changeCalender, enableAnimationsCalender] = useAutoAnimate({ duration: 100})

  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const [firstYearofDecade, setfirstYearofDecade ]= useState(new Date(getDecade(firstDayCurrentMonth), 1, 1));
  const [LastYearofDecade, setLastYearofDecade] = useState(new Date(getDecade(firstDayCurrentMonth) + 11 , 1, 1));

  let years = eachYearOfInterval({
    start: firstYearofDecade,
    end: LastYearofDecade,
  })


  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    setcurrm(format(firstDayNextMonth, 'LLL'));
  }

  function previousYear(){
    let firstYearBeforeDecade = add(firstYearofDecade, { years: -1 });
    let lastYearBeforeDecade = add(LastYearofDecade, { years: -1 });
    setfirstYearofDecade(firstYearBeforeDecade);
    setLastYearofDecade(lastYearBeforeDecade);
  }

  function nextYear(){
    let firstYearAfterDecade = add(firstYearofDecade, { years: 1 });
    let lastYearAfterDecade = add(LastYearofDecade, { years: 1 });
    setfirstYearofDecade(firstYearAfterDecade);
    setLastYearofDecade(lastYearAfterDecade);
  }

  function chooseMonth(month) {
    const monthIdx = arrMonths.indexOf(month);
    const currMonth = format(firstDayCurrentMonth, 'LLL');
    const currMonthIdx = arrMonths.indexOf(currMonth);
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: monthIdx - currMonthIdx });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    setcurrm(currMonth);
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    setcurrm(format(firstDayNextMonth, 'LLL'));
  }

  const handleChooseMonthYear = () => {
    setSelectCalender(false);
    if(!selectYear)
      setSelectYear(true);
    setSelectMonth(false);
    // setbar(false)
    setyearbar(true)  
  };

  return (
      <div className="max-w-md mx-auto md:max-w-4xl px-2">
          <div className="md:m-15 ">
            <div className={classNames('flex', bar && 'justify-between', !bar && 'justify-center')} >
              <button className="flex justify-start font-semibold text-gray-900" onClick={handleChooseMonthYear}>
              { selectCalender ? format(firstDayCurrentMonth, 'MMMM yyyy') : selectYear ? format(firstDayCurrentMonth, 'MMMM yyyy') : format(firstDayCurrentMonth, 'yyyy') }
              </button>
              {bar && <div className="flex">              
                <button
                type="button"
                onClick={ yearbar ? previousYear : previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-900 hover:text-gray-500"
              >
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" /> 
              </button>
              <button
                onClick={ yearbar ? nextYear : nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-900 hover:text-gray-500"
              >
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              </div> }
            </div>
            <div ref={changeComponet}>
            { selectCalender && <div >
            <div className="grid grid-cols-7 mt-5 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid gap-y-1.5 grid-cols-7 text-sm py-2" ref={changeCalender}>
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)]
                  )}
                > 
                <div className={classNames( selectedDay && (isBefore(day, selectedDay) && isAfter(day, ssd)) && 'border-x-2 bg-blue-200 border-blue-200',
                    selectedDay && ssd != null && isEqual(day, selectedDay) && !isEqual(selectedDay, ssd) && 'bgr',
                     ssd && selectedDay != null && !isEqual(selectedDay, ssd) && isEqual(day, ssd) && 'bgl'
                    )}>
                  <button
                    type="button"
                    onClick={() => {
                      if(ssd && isAfter(ssd, day)){
                         setSelectedDay(null);
                         setSsd(day);
                      }
                      else{
                          setSelectedDay(day);
                      }
                    }}
                    className={classNames(
                      ssd && isEqual(day, ssd) && !isToday(day) && 'bg-blue-500 text-white font-semibold',
                      selectedDay && isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      'text-red-500',
                      selectedDay && !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      selectedDay && !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                     (isEqual(day, selectedDay) || isEqual(day, ssd)) && isToday(day) && 'bg-red-500 text-white',
                      selectedDay && isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-blue-500',
                      selectedDay && ssd && !isEqual(day, selectedDay) && !isEqual(day, ssd) && 'hover:bg-blue-300',
                      selectedDay && (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto my-auto flex h-8 w-8 justify-center items-center rounded-full'  
                    )}
                  >
                      {format(day, 'd')}
                  </button>
                  </div>
                </div>
              ))}
              </div>
            </div> }
          { selectYear && <div className="grid grid-cols-3 mt-2 text-sm">
          {years.map((year, yearIdx) => (
                <div key={year.toString()} > 
                  <button
                    type="button"
                    onClick={() => {
                      setSelectYear(!selectYear);
                      setSelectMonth(true);
                      setCurrentMonth(currm+'-'+format(year, 'yyyy'));
                      setyearbar(false);
                      setbar(false);
                    }}
                    className="hover:bg-gray-200 mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                  >
                      {format(year, 'yyyy')}
                  </button>
                </div>
              ))}
            </div>}
          { selectMonth && <div className="grid grid-cols-3 mt-2 text-sm">
            {arrMonths.map((month) => (
                <div key={month} > 
                  <button
                    type="button"
                    onClick={() => {
                        chooseMonth(month);
                        setSelectMonth(false);
                        setSelectCalender(!selectCalender);
                        setbar(true);
                    }}
                    className={classNames(
                        month !== currm && 'hover:bg-gray-200',
                      ( (month === currm || month === format(today, 'LLL') ) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    ))}
                  > 
                  {month}
                  </button>
                </div>
              ))}
            </div> }
            </div>
          </div>
        </div>
  )
}

