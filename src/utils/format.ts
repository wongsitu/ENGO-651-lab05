import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import week from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/es';

dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(duration);
dayjs.extend(week);

export const format = (date: Date | string, dateFormat: string) => {
  dayjs.locale('en');
  return dayjs(date).format(dateFormat);
};
