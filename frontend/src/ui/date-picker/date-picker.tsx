import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import dayjs from 'dayjs';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './date-picker.css';

const DatePicker: React.FC<{
  date: Date;
  onChangeDateEvent: () => void;
}> = ({ date, onChangeDateEvent }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    date || new Date()
  );

  const startDateDays = isMobile ? 1 : 2;
  const finishDateDays = isMobile ? 2 : 3;

  const startDate = dayjs(selectedDate).subtract(startDateDays, 'day');
  const finishDate = dayjs(selectedDate).add(finishDateDays, 'day');

  const dateRange: dayjs.Dayjs[] = [];

  const dateForward = () => {
    setSelectedDate((prevDate) =>
      dayjs(prevDate)
        .add(finishDateDays + 1, 'day')
        .toDate()
    );
  };

  const dateBackwards = () => {
    onChangeDateEvent();
    setSelectedDate((prevDate) =>
      dayjs(prevDate)
        .subtract(startDateDays + 1, 'day')
        .toDate()
    );
  };

  const handleClick = (date: Date) => {
    setSelectedDate(date);
    onChangeDateEvent();
  };

  let currentDate: dayjs.Dayjs = startDate;
  while (currentDate.isBefore(finishDate)) {
    dateRange.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return (
    <div className="date-picker__container">
      <KeyboardArrowLeftIcon onClick={dateBackwards} />
      {dateRange.map((date, index) => (
        <div
          onClick={() => handleClick(date.toDate())}
          className={
            selectedDate && date.isSame(dayjs(selectedDate), 'day')
              ? 'date-picker__day date-picker__day--selected'
              : 'date-picker__day'
          }
          key={index}
        >
          <p className="day">{date.format('DD')}</p>
          <p>{date.format('MMM').toUpperCase()}</p>
        </div>
      ))}
      <KeyboardArrowRightIcon onClick={dateForward} />
    </div>
  );
};

export default DatePicker;
