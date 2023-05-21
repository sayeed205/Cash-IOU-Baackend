import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(helmet())

    const globalPrefix = 'api'
    app.setGlobalPrefix(globalPrefix)

    // Swagger config for API documentation only in development
    if (process.env.NODE_ENV !== 'production') {
        const options = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('Cash-IOU API')
            .setDescription('Cash-IOU API Documentation')
            .setVersion('1.0')
            .addTag('Cash-IOU')
            .build()
        const document = SwaggerModule.createDocument(app, options)
        SwaggerModule.setup('api/docs', app, document)
    }

    const PORT = process.env.PORT || 5000
    await app.listen(PORT)

    if (process.env.NODE_ENV !== 'production') {
        Logger.log(
            `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`,
        )
    }
}

bootstrap()
