import { filter, isEmpty, sortBy } from "lodash";

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const now = new Date();


/**
 * Returns a string with a language representation of the next month payment date
 * @param {string} lang - the BCP 47 language code
 * @param {number} [startDay = 1] - the first payment day of the month
 * @returns {string} Language representation of the next month payment date
 */
export function getNextMonthDate(lang, startDay = 1) {
    let paymentDate = new Date(now.getFullYear(), now.getMonth() + 1, startDay);
    return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(paymentDate);
}

/**
 * Returns a string with a language representation of the next available payment date
 * @param {string} lang - the BCP 47 language code
 * @param {number[]} [startDays] - the next payment days of the month
 * @returns {string} Language representation of the next available payment date
 */
export function getNextAvailableDate(lang, startDays) {
    startDays = sortBy(startDays); // garantees the days are in order   
    let paymentDay = filter(startDays, (d) => { return d > now.getDate() });
    if (isEmpty(paymentDay)) {
        return getNextMonthDate(lang, startDays[0]);
    }
    let paymentDate = new Date(now.getFullYear(), now.getMonth(), paymentDay[0]);
    return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(paymentDate);
}

/**
 * Returns a string with a language representation of the next payment date (tomorrow)
 * @param {string} lang - the BCP 47 language code
 * @returns {string} Language representation of the next payment date (tomorrow)
 */
export function getNextDate(lang) {
    let paymentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(paymentDate);
}
