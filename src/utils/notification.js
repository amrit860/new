import {toast} from "react-toastify";

function showSuccess(msg){
 toast.success(msg);   
}
function showInfo(msg){
    toast.info(msg);
}
function showWarning(msg){
    toast.warn(msg);
}

function handleError(error){
let defaultErrMsg="something went wrong ";
if (error && error.response){
    defaultErrMsg=error.response.data.msg;
}

    showError(defaultErrMsg);
}

function showError(msg){
    toast.error(msg);
}
export default {
    showSuccess,
    showInfo,
    showWarning,
    handleError
}