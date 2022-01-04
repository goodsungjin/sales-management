import React, { useEffect, useState } from 'react';

import './Calendar.scss';

function TemplateCalendar() {
  const [weeksByDate, setWeeksByDate] = useState<number[][]>([[]]);
  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  useEffect(() => {
    const date = new Date();
    const month = 0;

    const firstDay = new Date(date.getFullYear(), month, 1).getDay();
    const lastDay = new Date(date.getFullYear(), month + 1, 0).getDay();
    const lastDate = new Date(date.getFullYear(), month + 1, 0).getDate();

    const WEEK_DAYS = 7;

    const emptyDateForFirstDay = Array.from({ length: firstDay }, () => 0);
    const dates = Array.from({ length: lastDate }, (v, k) => k + 1);
    const emptyDateForLastDay = Array.from(
      { length: WEEK_DAYS - lastDay - 1 },
      () => 0
    );

    const weeks = [
      ...emptyDateForFirstDay,
      ...dates,
      ...emptyDateForLastDay,
    ].reduce((accu, curr, idx) => {
      if (idx % WEEK_DAYS) accu[accu.length - 1].push(curr);
      else accu.push([curr]);

      return accu;
    }, [] as number[][]);

    setWeeksByDate(weeks);
  }, []);

  return (
    <table>
      {[DAYS, ...weeksByDate].map((week, idx) => (
        <tr>
          {week.map((date) => {
            if (!idx)
              return (
                <td>
                  <th>{date}</th>
                </td>
              );
            return (
              <td>
                {date ? (
                  <>
                    <h3>{date}</h3>
                    들어있냐?
                  </>
                ) : (
                  ''
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
}

export default TemplateCalendar;
