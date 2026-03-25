import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProductKindsModule } from './product-kinds/product-kinds.module.js';
import { ProductsModule } from './products/products.module.js';
import { MealsModule } from './meals/meals.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProductKindsModule,
    ProductsModule,
    MealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
