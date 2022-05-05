import dayjs from 'dayjs';

type TimeType = {
  date?: Date;
  format?: string;
};
export default class TimeUtil {
  static timeFormat({ date = new Date(), format = 'YYYY-MM-DD' }: TimeType) {
    return dayjs(date).format(format);
  }
}
