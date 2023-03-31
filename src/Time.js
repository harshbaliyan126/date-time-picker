import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

const hr = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const min = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];
const ap = ["AM", "PM"];

const hour = hr.map((value, index) => {
  return { id: `hour-${index}`, value };
});

const minute = min.map((value, index) => {
  return { id: `minute-${index}`, value };
});

const ampm = ap.map((value, index) => {
  return { id: `ampm-${index}`, value };
});

export default function Time({
  hourSelected,
  minuteSelected,
  ampmSelected,
  sethourSelected,
  setminuteSelected,
  setampmSelected,
  setTime,
}) {
  return (
    <div className="timer-container">
      <Listbox
        value={hourSelected}
        onChange={(e) => {
          sethourSelected(e);
          setTime(`${e}:${minuteSelected} ${ampmSelected}`);
        }}
      >
        <div className="timebox-container">
          <Listbox.Button className="timebox">
            <span className="block-truncate">{hourSelected}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="listbox-options scrollbar-hide">
              {hour.map((hour) => (
                <Listbox.Option
                  key={hour.id}
                  className={({ active }) =>
                    `listbox-option-list ${
                      active
                        ? "listbox-option-list-active"
                        : "listbox-option-list-inactive"
                    }`
                  }
                  value={hour.value}
                >
                  {({ hourSelected }) => (
                    <>
                      <span
                        className={`block-truncate ${
                          hourSelected
                            ? "select-font-medium"
                            : "select-font-normal"
                        }`}
                      >
                        {hour.value}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <span style={{ margin: "0.5rem", paddingBottom: "0.5rem" }}>:</span>
      <Listbox
        value={minuteSelected}
        onChange={(e) => {
          setminuteSelected(e);
          setTime(`${hourSelected}:${e} ${ampmSelected}`);
        }}
      >
        <div className="timebox-container">
          <Listbox.Button className="timebox">
            <span className="block-truncate">{minuteSelected}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="listbox-options scrollbar-hide">
              {minute.map((minute) => (
                <Listbox.Option
                  key={minute.id}
                  className={({ active }) =>
                    `listbox-option-list ${
                      active
                        ? "listbox-option-list-active"
                        : "listbox-option-list-inactive"
                    }`
                  }
                  value={minute.value}
                >
                  {({ minuteSelected }) => (
                    <>
                      <span
                        className={`block-truncate ${
                          minuteSelected
                            ? "select-font-medium"
                            : "select-font-normal"
                        }`}
                      >
                        {minute.value}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <Listbox
        value={ampmSelected}
        onChange={(e) => {
          setampmSelected(e);
          setTime(`${hourSelected}:${minuteSelected} ${e}`);
        }}
      >
        <div className="ampm-container">
          <Listbox.Button className="timebox">
            <span className="block-truncate">{ampmSelected}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="listbox-options scrollbar-hide">
              {ampm.map((ampm) => (
                <Listbox.Option
                  key={ampm.id}
                  className={({ active }) =>
                    `listbox-option-list ${
                      active
                        ? "listbox-option-list-active"
                        : "listbox-option-list-inactive"
                    }`
                  }
                  value={ampm.value}
                >
                  {({ minuteSelected }) => (
                    <>
                      <span
                        className={`block-truncate ${
                          ampmSelected
                            ? "select-font-medium"
                            : "select-font-normal"
                        }`}
                      >
                        {ampm.value}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
