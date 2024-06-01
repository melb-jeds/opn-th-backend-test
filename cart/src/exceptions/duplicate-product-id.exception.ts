export class DuplicateProductIdException extends Error {
    constructor(id: string) {
        super(`productId ${id} is already exist`)
    }
}