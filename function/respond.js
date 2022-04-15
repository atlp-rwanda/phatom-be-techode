const sendError = (res , code , data , message="", req=null) => {
    /* c8 ignore next 2 */
    const transilatedMessage =  req != null ? req.t(message) : message.replace(/\"/g,"");
    res.status(code).json({"status": "error" , data , message:transilatedMessage });
}

const success = (res , code , data , message="", req=null) => {
    const transilatedMessage =  req != null ? req.t(message) : message.replace(/\"/g,"");
    res.status(code).json({"status":"success", data ,message:transilatedMessage });
}

const fail = (res , code , data , message="", req=null) => {
    const transilatedMessage =  req != null ? req.t(message) : message.replace(/\"/g,"");
    res.status(code).json({"status":"Fail", data , message:transilatedMessage });
}
export { sendError , success , fail }