import { ProductTable } from '../tables/product.table'

export class CreateCartCommand {
	customerId: string
	productTable: ProductTable
}
