import moment from "moment";
function formatTime(date) {
    if (!date) {
        return;
    }
    return moment(date).format("hh:mm a");
}
function formatDate(date) {
    if (!date) {
        return;
    }
    return moment(date).format("YYYY:MM:DD");
}
export default {
    formatDate,
    formatTime
}