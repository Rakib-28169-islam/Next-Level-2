
export const validationError = (err: any) => {

    return {
        message: "Validation failed",
        success: false,
        errors: err.errors,
    }
}
export const mongooseError = (msg:string,err: any) => {
    return {
        message:msg,
        success: false,
        errors: err.message,
    }
}