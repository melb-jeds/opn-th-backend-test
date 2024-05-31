import 'dotenv/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe({ skipUndefinedProperties: true, whitelist: true }))
	app.enableVersioning({
		type: VersioningType.URI,
	})

	await app.listen(3000)
}
bootstrap()
