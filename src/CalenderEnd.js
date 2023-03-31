// import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
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
  isBefore,
} from "date-fns";

import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CalenderEnd({
  selectedDay,
  setSelectedDay,
  currentMonth,
  setCurrentMonth,
  ssd,
  setSsd,
  setstartCurrentMonth,
}) {
  const today = startOfToday();
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];
  const arrMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [selectCalender, setSelectCalender] = useState(true);
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectYear, setSelectYear] = useState(false);
  const [currm, setcurrm] = useState(format(today, "LLL"));
  const [bar, setbar] = useState(true);
  const [yearbar, setyearbar] = useState(false);
  // const [changeComponet, enableAnimations] = useAutoAnimate()
  // const [changeCalender, enableAnimationsCalender] = useAutoAnimate({ duration: 100})

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const [firstYearofDecade, setfirstYearofDecade] = useState(
    new Date(getDecade(firstDayCurrentMonth), 1, 1)
  );
  const [LastYearofDecade, setLastYearofDecade] = useState(
    new Date(getDecade(firstDayCurrentMonth) + 11, 1, 1)
  );

  let years = eachYearOfInterval({
    start: firstYearofDecade,
    end: LastYearofDecade,
  });

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    if (!ssd && !selectedDay)
      setstartCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setcurrm(format(firstDayNextMonth, "LLL"));
  }

  function previousYear() {
    let firstYearBeforeDecade = add(firstYearofDecade, { years: -1 });
    let lastYearBeforeDecade = add(LastYearofDecade, { years: -1 });
    setfirstYearofDecade(firstYearBeforeDecade);
    setLastYearofDecade(lastYearBeforeDecade);
  }

  function nextYear() {
    let firstYearAfterDecade = add(firstYearofDecade, { years: 1 });
    let lastYearAfterDecade = add(LastYearofDecade, { years: 1 });
    setfirstYearofDecade(firstYearAfterDecade);
    setLastYearofDecade(lastYearAfterDecade);
  }

  function chooseMonth(month) {
    const monthIdx = arrMonths.indexOf(month);
    const currMonth = format(firstDayCurrentMonth, "LLL");
    const currMonthIdx = arrMonths.indexOf(currMonth);
    let firstDayNextMonth = add(firstDayCurrentMonth, {
      months: monthIdx - currMonthIdx,
    });
    if (!ssd && !selectedDay)
      setstartCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setcurrm(currMonth);
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    if (!ssd && !selectedDay)
      setstartCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    setcurrm(format(firstDayNextMonth, "LLL"));
  }

  const handleChooseMonthYear = () => {
    setSelectCalender(false);
    if (!selectYear) setSelectYear(true);
    setSelectMonth(false);
    // setbar(false)
    setyearbar(true);
  };

  return (
    <div className="container-calender">
      <div>
        <div
          className={classNames(
            "calender-flex",
            bar && "calender-flex-justify-between",
            !bar && "calender-flex-justify-center"
          )}
        >
          <button
            className="calender-month-btn"
            onClick={handleChooseMonthYear}
          >
            {selectCalender
              ? format(firstDayCurrentMonth, "MMMM yyyy")
              : selectYear
              ? format(firstDayCurrentMonth, "MMMM yyyy")
              : format(firstDayCurrentMonth, "yyyy")}
          </button>
          {bar && (
            <div className="calender-flex">
              <button
                type="button"
                onClick={yearbar ? previousYear : previousMonth}
                className="calender-month-prev-btn"
              >
                <ChevronLeftIcon
                  style={{ width: "1.25rem", height: "1.25rem" }}
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={yearbar ? nextYear : nextMonth}
                type="button"
                className="calender-month-next-btn"
              >
                <ChevronRightIcon
                  style={{ width: "1.25rem", height: "1.25rem" }}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
        <div>
          {selectCalender && (
            <div>
              <div className="calender-week-days-grid">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="calender-month-grid">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)]
                    )}
                  >
                    <div
                      className={classNames(
                        selectedDay &&
                          isBefore(day, selectedDay) &&
                          isAfter(day, ssd) &&
                          "calender-between-start-end",
                        selectedDay &&
                          ssd != null &&
                          isEqual(day, selectedDay) &&
                          !isEqual(selectedDay, ssd) &&
                          "bgr",
                        ssd &&
                          selectedDay != null &&
                          !isEqual(selectedDay, ssd) &&
                          isEqual(day, ssd) &&
                          "bgl"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (ssd && isAfter(ssd, day)) {
                            setSelectedDay(null);
                            setSsd(day);
                          } else {
                            setSelectedDay(day);
                          }
                        }}
                        className={classNames(
                          ssd &&
                            isEqual(day, ssd) &&
                            !isToday(day) &&
                            "calender-opposite-range-btn",
                          selectedDay &&
                            isEqual(day, selectedDay) &&
                            "calender-text-white",
                          !isEqual(day, selectedDay) &&
                            isToday(day) &&
                            "calender-text-red-500",
                          selectedDay &&
                            !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isEqual(day, ssd) &&
                            isSameMonth(day, firstDayCurrentMonth) &&
                            "calender-text-gray-900",
                          selectedDay &&
                            !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isSameMonth(day, firstDayCurrentMonth) &&
                            "calender-text-gray-400",
                          (isEqual(day, selectedDay) || isEqual(day, ssd)) &&
                            isToday(day) &&
                            "calender-selected-day-today-btn",
                          selectedDay &&
                            isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            "calender-bg-blue-500",
                          selectedDay &&
                            ssd &&
                            !isEqual(day, selectedDay) &&
                            !isEqual(day, ssd) &&
                            "hover-bg-blue-300",
                          selectedDay &&
                            (isEqual(day, selectedDay) || isToday(day)) &&
                            "calender-font-semibold",
                          "calender-day-btn"
                        )}
                      >
                        {format(day, "d")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectYear && (
            <div className="calender-ym-grid">
              {years.map((year, yearIdx) => (
                <div key={year.toString()}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectYear(!selectYear);
                      setSelectMonth(true);
                      setCurrentMonth(currm + "-" + format(year, "yyyy"));
                      setyearbar(false);
                      setbar(false);
                    }}
                    className="calender-select-ym"
                  >
                    {format(year, "yyyy")}
                  </button>
                </div>
              ))}
            </div>
          )}
          {selectMonth && (
            <div className="calender-ym-grid">
              {arrMonths.map((month) => (
                <div key={month}>
                  <button
                    type="button"
                    onClick={() => {
                      chooseMonth(month);
                      setSelectMonth(false);
                      setSelectCalender(!selectCalender);
                      setbar(true);
                    }}
                    className="calender-select-ym"
                  >
                    {month}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
