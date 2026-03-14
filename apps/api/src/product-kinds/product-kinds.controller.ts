import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateProductKindDto } from './dto/create-product-kind.dto.js';
import { UpdateProductKindDto } from './dto/update-product-kind.dto.js';
import { ProductKindsService } from './product-kinds.service.js';

interface JwtUser {
  id: string;
  email: string;
}

@Controller('product-kinds')
@UseGuards(JwtAuthGuard)
export class ProductKindsController {
  constructor(private readonly productKindsService: ProductKindsService) {}

  @Post()
  create(@Req() req: { user: JwtUser }, @Body() dto: CreateProductKindDto) {
    return this.productKindsService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: { user: JwtUser }, @Query('name') name?: string) {
    return this.productKindsService.findAll(req.user.id, {
      ...(name !== undefined && name !== '' && { name }),
    });
  }

  @Get(':id')
  findOne(@Req() req: { user: JwtUser }, @Param('id') id: string) {
    return this.productKindsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: { user: JwtUser },
    @Param('id') id: string,
    @Body() dto: UpdateProductKindDto,
  ) {
    return this.productKindsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: JwtUser }, @Param('id') id: string) {
    return this.productKindsService.remove(req.user.id, id);
  }
}
