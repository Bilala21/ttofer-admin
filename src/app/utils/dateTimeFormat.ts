import moment from 'moment';

export const dateTimeFormat = (date: string, format: string): string => {
    const formattedDate = moment(date).format(format);
    return formattedDate;
};
