class CustomException extends Error{
    constructor(message = "Error Occured", statusCode = 500){
        super(message);
        this.statusCode = statusCode;
    }
}

export default CustomException;