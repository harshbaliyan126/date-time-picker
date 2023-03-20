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
  } from 'date-fns'

import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calender({selectedDay, setSelectedDay, currentMonth, setCurrentMonth}) {

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
  // let nameMonth = format(firstDayCurrentMonth, 'LLL');
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
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const handleChooseMonthYear = () => {
    setSelectCalender(false);
    setSelectYear(true);
    // setSelectMonth(true);
    // setbar(false)
    setyearbar(true)  
  };

  return (
      <div className="max-w-md mx-auto md:max-w-4xl px-6">
          <div className="md:m-15 ">
            <div className={classNames('flex', bar && 'justify-between', !bar && 'justify-center')} >
              <button className="flex justify-start font-semibold text-gray-900" onClick={handleChooseMonthYear}>
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
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
            <div className="grid grid-cols-7 mt-2 text-sm mx-2" ref={changeCalender}>
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                > 
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDay(day);
                    }}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
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


