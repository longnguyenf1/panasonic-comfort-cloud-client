export class ServiceError extends Error {
    private _code: number
    private _httpCode: number
    private _details: any

    constructor(message: string, code: number, httpCode: number, details?: any) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'ServiceError'
        this._code = code
        this._httpCode = httpCode
        this._details = details
    }

    get code(): number {
        return this._code
    }

    get httpCode(): number {
        return this._httpCode
    }

    get details(): any {
        return this._details
    }
}