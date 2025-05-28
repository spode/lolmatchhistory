// export function getHashtagCode(inputString) {
//     const regex = /#([A-Za-z0-9]{5})/;  // Match a hashtag followed by exactly 5 alphanumeric characters
//     const match = inputString.match(regex);

//     if (match) {
//         return match[0];  // Return the full match (e.g., #BEA12)
//     } else {
//         return null;  // Return null if no match is found
//     }
// }

// // Helper function to add a delay (in milliseconds)
// export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// export function getRelevantCharacters(textareaValue) {
//     // Remove all non-alphabetical characters, except for accented letters, numbers, and symbols like #
//     return textareaValue.replace(/[^a-zA-Z0-9\u00C0-\u017F#-\s\n]/g, '');
// }


// DAYJS
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from "dayjs/plugin/duration"

dayjs().format();
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export default dayjs