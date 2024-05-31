export interface HashService {
	hash(raw: string, salt: number): string
	compare(raw: string, hash: string): boolean
}
