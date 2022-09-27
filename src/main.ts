import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

declare global {
  interface String {
    capitalize(): string
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

async function bootstrap() {
  const app = await NestFactory.create<any>(AppModule)
  await app.listen(process.env.APP_PORT || 3000, process.env.APP_HOST || '0.0.0.0')
}
bootstrap()
