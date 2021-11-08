import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('button[data-start]');
const d = document.querySelector('span[data-days]');
const h = document.querySelector('span[data-hours]');
const m = document.querySelector('span[data-minutes]');
const s = document.querySelector('span[data-seconds]');

buttonStart.disabled = true; 
 let intervalId;

const options = { 
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      if(selectedDates[0] < new Date()) {
       Notiflix.Notify.warning('Please choose a date in the future');
      } else {
        buttonStart.disabled = false;
      }
      
      buttonStart.addEventListener('click',() => {
        intervalId = setInterval(() => {
      const deltaTime = selectedDates[0] - new Date();
      
      if(deltaTime < 1000) {
        clearInterval(intervalId);
      }
        const time = convertMs(deltaTime);
        updateClockFace(time);
          }, 1000);
        });
    },
  };   
  
flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };

}

 function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  d.textContent = `${days}`;
  h.textContent = `${hours}`;
  m.textContent = `${minutes}`;
  s.textContent = `${seconds}`;
}

