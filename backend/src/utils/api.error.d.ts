declare class BaseApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare const createError: (statusCode: number, message: string) => BaseApiError;
export declare const badRequest: (msg?: string) => BaseApiError;
export declare const unauthorized: (msg?: string) => BaseApiError;
export declare const forbidden: (msg?: string) => BaseApiError;
export declare const notFound: (msg?: string) => BaseApiError;
export declare const internal: (msg?: string) => BaseApiError;
export {};
//# sourceMappingURL=api.error.d.ts.map