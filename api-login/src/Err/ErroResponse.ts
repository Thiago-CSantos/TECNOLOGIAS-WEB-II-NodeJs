interface ErrorResponse {
    message: string;
    ex?: string[];
    error?: unknown
}

export default ErrorResponse;