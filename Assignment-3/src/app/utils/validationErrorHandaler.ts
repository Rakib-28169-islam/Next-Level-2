
export const validationError = (err: any) => {

    return {
        message: "Validation failed",
        success: false,
        error: err.errors,
    }
}
