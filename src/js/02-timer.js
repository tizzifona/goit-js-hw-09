import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const startBtn = document.querySelector('button');
const day = document.querySelector('.value[data-days]');
const hour = document.querySelector('.value[data-hours]');
const minute = document.querySelector('.value[data-minutes]');
const sec = document.querySelector('.value[data-seconds]');

startBtn.setAttribute("disabled", "disabled");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0].getTime() < Date.now()){
        Notiflix.Notify.warning('Please choose a date in the future');
      } else {
        startBtn.removeAttribute("disabled");
   startBtn.addEventListener('click', (e) => {
            const interval = setInterval(() => {
            const { days, hours, minutes, seconds } = convertMs(selectedDates[0].getTime() - Date.now());
            
            day.textContent = days;
            hour.textContent = hours;
            minute.textContent = minutes;
            sec.textContent = seconds;

            if(days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
              clearInterval(interval);
            }
            }, 1000);
        })
      }
    }
};
  
flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}