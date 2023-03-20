
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const hr = [ '01','02','03','04','05','06','07','08','09','10','11','12' ]
const min = [ '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']
const ap = [ 'AM','PM' ]

const hour = hr.map((value, index) => {
    return { id: `hour-${index}`, value };
  });
  
  const minute = min.map((value, index) => {
    return { id: `minute-${index}`, value };
  });
  
  const ampm = ap.map((value, index) => {
    return { id: `ampm-${index}`, value };
  });

export default function Time({ hourSelected, minuteSelected, ampmSelected, sethourSelected, setminuteSelected, setampmSelected , setTime}) {

  return (
    <div className="flex mx-auto px-auto py-2 w-max">
      <Listbox value={hourSelected} onChange={(e) => {
          sethourSelected(e);
          setTime(`${e}:${minuteSelected} ${ampmSelected}`);
        }} >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-5 pr-5 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{hourSelected}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto scrollbar-hide rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {hour.map((hour) => (
                <Listbox.Option
                  key={hour.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-5 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={hour.value}
                >
                  {({ hourSelected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          hourSelected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {hour.value}
                      </span>
                      {hourSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <span className="m-2 pb-2">:</span>
      <Listbox value={minuteSelected} onChange={ (e) => {
          setminuteSelected(e);
          setTime(`${hourSelected}:${e} ${ampmSelected}`);
        }} >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-5 pr-5 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{minuteSelected}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto scrollbar-hide rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {minute.map((minute) => (
                <Listbox.Option
                  key={minute.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-5 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={minute.value}
                >
                  {({ minuteSelected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          minuteSelected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {minute.value}
                      </span>
                      {minuteSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <Listbox value={ampmSelected} onChange={(e) => {
          setampmSelected(e);
          setTime(`${hourSelected}:${minuteSelected} ${e}`);
        }} >
        <div className="relative mt-1 ml-3 pt-0.3">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-5 pr-5 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{ampmSelected}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto scrollbar-hide rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {ampm.map((ampm) => (
                <Listbox.Option
                  key={ampm.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-5 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={ampm.value}
                >
                  {({ minuteSelected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          ampmSelected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {ampm.value}
                      </span>
                      {ampmSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
