const sendError = (res , code , data , message) => {
    res.status(code).json({"status": "error" , data , message});
}

const success = (res , code , data , message) => {
    res.status(code).json({"status":"success", data ,message});
}

const fail = (res , code , data , message) => {
    res.status(code).json({"status":"Fail", data , message});
}

export { sendError , success , fail }