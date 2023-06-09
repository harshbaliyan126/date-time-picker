import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import CalenderStart from "./CalenderStart";
import CalenderEnd from "./CalenderEnd";
import Time from "./Time";
// import  autoAnimate  from '@formkit/auto-animate';
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { format, startOfToday } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Datetimepicker() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [checktrue, setchecktrue] = useState(false);
  const [checkDateTimePicker, setcheckDateTimePicker] = useState(false);
  const [checktimeselected, setchecktimeselected] = useState(false);
  const [checktimeset, setchecktimeset] = useState(false);

  let today = startOfToday();

  const [startDate, setstartDate] = useState(false);
  const [startselectedDay, setstartSelectedDay] = useState(null);
  const [startcurrentMonth, setstartCurrentMonth] = useState(
    format(today, "MMM-yyyy")
  );

  const [parent] = useAutoAnimate(/* optional config */);
  const [child] = useAutoAnimate(/* optional config */);

  useEffect(() => {
    if (selectedIndex && startselectedDay)
      setstartCurrentMonth(format(startselectedDay, "MMM-yyyy"));
    else if (endselectedDay)
      setendCurrentMonth(format(endselectedDay, "MMM-yyyy"));

    if (!endselectedDay && startselectedDay) {
      setendCurrentMonth(format(startselectedDay, "MMM-yyyy"));
      setstartCurrentMonth(format(startselectedDay, "MMM-yyyy"));
    }

    if (!startselectedDay && endselectedDay) {
      setendCurrentMonth(format(endselectedDay, "MMM-yyyy"));
      setstartCurrentMonth(format(endselectedDay, "MMM-yyyy"));
    }
  }, [startselectedDay, selectedIndex]);

  const [endDate, setendDate] = useState(false);
  const [endselectedDay, setendSelectedDay] = useState(null);
  const [endcurrentMonth, setendCurrentMonth] = useState(
    format(today, "MMM-yyyy")
  );

  const [startTime, setstartTime] = useState("12:00 AM");
  const [startTimehr, setstartTimehr] = useState("12");
  const [startTimemin, setstartTimemin] = useState("00");
  const [startTimeap, setstartTimeap] = useState("AM");

  const [endTime, setendTime] = useState("12:00 AM");
  const [endTimehr, setendTimehr] = useState("12");
  const [endTimemin, setendTimemin] = useState("00");
  const [endTimeap, setendTimeap] = useState("AM");

  function convertTwelevetoTwentyFour(hour, min, ap) {
    if (ap === "AM") {
      if (hour === "12") {
        return `00:${min}`;
      } else {
        return `${hour}:${min}`;
      }
    } else {
      if (hour === "12") {
        return `${hour}:${min}`;
      } else {
        return `${parseInt(hour) + 12}:${min}`;
      }
    }
  }

  const handleSetClick = () => {
    let start = format(startselectedDay, "dd/MM/yyyy");
    let end = format(endselectedDay, "dd/MM/yyyy");
    setstartDate(start);
    setcheckDateTimePicker(false);

    setendDate(end);
    const s_time = convertTwelevetoTwentyFour(
      startTimehr,
      startTimemin,
      startTimeap
    );
    const e_time = convertTwelevetoTwentyFour(endTimehr, endTimemin, endTimeap);

    if (start === end && s_time > e_time) setendTime(startTime);
    setchecktrue(true);
    setchecktimeset(false);
  };

  const handletimesetClick = () => {
    setchecktimeset(true);
    setchecktimeselected(false);
  };

  const handletimeclearclick = () => {
    setchecktimeset(false);
    setchecktimeselected(false);
    setstartTime("12:00 AM");
    setendTime("12:00 AM");
  };

  const changeToOriginal = () => {
    setstartDate(null);
    setendDate(null);
    setstartTime("12:00 AM");
    setendTime("12:00 AM");
    setstartSelectedDay(null);
    setendSelectedDay(null);
    setstartCurrentMonth(format(today, "MMM-yyyy"));
    setendCurrentMonth(format(today, "MMM-yyyy"));
    setstartTimehr("12");
    setendTimehr("12");
    setstartTimemin("00");
    setendTimemin("00");
    setstartTimeap("AM");
    setendTimeap("AM");
    setchecktimeset(false);
  };

  const dateTimeRange = () => {
    // Calculate the difference in days, hours, and minutes
    const arrSD = startDate.split("/");
    const arrST = convertTwelevetoTwentyFour(
      startTimehr,
      startTimemin,
      startTimeap
    ).split(":");
    const arrED = endDate.split("/");
    const arrET = convertTwelevetoTwentyFour(
      endTimehr,
      endTimemin,
      endTimeap
    ).split(":");
    const diffInMs =
      new Date(arrED[2], arrED[1], arrED[0], arrET[0], arrET[1]) -
      new Date(arrSD[2], arrSD[1], arrSD[0], arrST[0], arrST[1]);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const diffInMinutes = Math.floor((diffInMs / (1000 * 60)) % 60);

    console.log("Days: ", diffInDays);
    console.log("Hours: ", diffInHours);
    console.log("Minutes: ", diffInMinutes);

    return `${diffInDays} days : ${diffInHours} hours : ${diffInMinutes} minutes`;
  };

  const disabled =
    startselectedDay && checktimeset && endselectedDay ? false : true;

  return (
    <>
      <div className="container-datetimepicker">
        <button
          className="datetimepicker-btn"
          onClick={() => {
            setcheckDateTimePicker(!checkDateTimePicker);
            changeToOriginal();
            setSelectedIndex(0);
            setchecktrue(false);
            setchecktimeset(false);
          }}
        >
          {checktrue && dateTimeRange()}
          {!checktrue && (
            <div style={{ display: "flex" }}>
              <span>Select Date and Time</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{ width: "1.5rem", height: "1.5rem" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>{" "}
            </div>
          )}
        </button>
      </div>
      {checkDateTimePicker && (
        <div className="datetimepicker-popup" ref={parent}>
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="datetimepicker-tab">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "datetimepicker-tab-btn",
                    selected
                      ? "datetimepicker-tab-btn-selected"
                      : "datetimepicker-tab-btn-not-selected"
                  )
                }
              >
                <div style={{ fontWeight: "540", marginBottom: "4px" }}>
                  Start
                </div>{" "}
                {startselectedDay ? (
                  <div style={{ fontWeight: "540" }}>
                    {format(startselectedDay, "dd/MM/yyyy")}
                  </div>
                ) : (
                  <div style={{ fontWeight: "540" }}>Please Select</div>
                )}
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "datetimepicker-tab-btn",
                    selected
                      ? "datetimepicker-tab-btn-selected"
                      : "datetimepicker-tab-btn-not-selected"
                  )
                }
              >
                <div style={{ fontWeight: "540", marginBottom: "4px" }}>
                  End
                </div>{" "}
                {endselectedDay ? (
                  <div style={{ fontWeight: "540" }}>
                    {format(endselectedDay, "dd/MM/yyyy")}
                  </div>
                ) : (
                  <div style={{ fontWeight: "540" }}>Please Select</div>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <CalenderStart
                  selectedDay={startselectedDay}
                  setSelectedDay={setstartSelectedDay}
                  currentMonth={startcurrentMonth}
                  setCurrentMonth={setstartCurrentMonth}
                  sed={endselectedDay}
                  setSed={setendSelectedDay}
                  setSelectedIndex={setSelectedIndex}
                  setendCurrentMonth={setendCurrentMonth}
                />
              </Tab.Panel>
              <Tab.Panel>
                <CalenderEnd
                  selectedDay={endselectedDay}
                  setSelectedDay={setendSelectedDay}
                  currentMonth={endcurrentMonth}
                  setCurrentMonth={setendCurrentMonth}
                  ssd={startselectedDay}
                  setSsd={setstartSelectedDay}
                  setstartCurrentMonth={setstartCurrentMonth}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div>
            <button
              className="time-select-btn"
              onClick={() => {
                setchecktimeselected(!checktimeselected);
              }}
            >
              {!checktimeset ? (
                <div>Please select time</div>
              ) : (
                <div>
                  {startTime} - {endTime}
                </div>
              )}
            </button>
            {checktimeselected && (
              <div className="timepicker-popup" ref={child}>
                <Tab.Group>
                  <Tab.List className="datetimepicker-tab">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "datetimepicker-tab-btn",
                          selected
                            ? "datetimepicker-tab-btn-selected"
                            : "datetimepicker-tab-btn-not-selected"
                        )
                      }
                    >
                      <div style={{ fontWeight: "540", marginBottom: "4px" }}>
                        Start
                      </div>
                      <div style={{ fontWeight: "540" }}>{startTime}</div>
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "datetimepicker-tab-btn",
                          selected
                            ? "datetimepicker-tab-btn-selected"
                            : "datetimepicker-tab-btn-not-selected"
                        )
                      }
                    >
                      <div style={{ fontWeight: "540", marginBottom: "4px" }}>
                        End
                      </div>
                      <div style={{ fontWeight: "540" }}>{endTime}</div>
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <Time
                        hourSelected={startTimehr}
                        sethourSelected={setstartTimehr}
                        minuteSelected={startTimemin}
                        setminuteSelected={setstartTimemin}
                        ampmSelected={startTimeap}
                        setampmSelected={setstartTimeap}
                        setTime={setstartTime}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <Time
                        hourSelected={endTimehr}
                        sethourSelected={setendTimehr}
                        minuteSelected={endTimemin}
                        setminuteSelected={setendTimemin}
                        ampmSelected={endTimeap}
                        setampmSelected={setendTimeap}
                        setTime={setendTime}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="datetimepicker-set-clear" on>
                  <button className="time-set-btn" onClick={handletimesetClick}>
                    Set
                  </button>
                  <div className="pl-2">
                    <button
                      className="datetimepicker-clear-btn"
                      onClick={handletimeclearclick}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="datetimepicker-set-clear">
            <button
              disabled={disabled}
              className={classNames(
                "datetimepicker-set-btn",
                disabled
                  ? "datetimepicker-set-btn-disabled"
                  : "datetimepicker-set-btn-enabled"
              )}
              onClick={handleSetClick}
            >
              Set
            </button>
            <div className="pl-2">
              <button
                className="datetimepicker-clear-btn"
                onClick={() => {
                  setcheckDateTimePicker(!checkDateTimePicker);
                  changeToOriginal();
                  setchecktrue(false);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
