import { Module } from '@nestjs/common';
import { ProductKindsController } from './product-kinds.controller.js';
import { ProductKindsService } from './product-kinds.service.js';

@Module({
  controllers: [ProductKindsController],
  providers: [ProductKindsService],
})
export class ProductKindsModule {}
