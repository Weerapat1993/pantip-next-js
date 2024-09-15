import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const dateHuman = (dateTime: string) => {
  return dateTime ? dayjs(dateTime).fromNow() : null;
};
