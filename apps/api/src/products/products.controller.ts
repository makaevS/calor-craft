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
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductsService } from './products.service.js';

interface JwtUser {
  id: string;
  email: string;
}

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Req() req: { user: JwtUser }, @Body() dto: CreateProductDto) {
    return this.productsService.create(req.user.id, dto);
  }

  @Get()
  findAll(
    @Req() req: { user: JwtUser },
    @Query('kindId') kindId?: string,
    @Query('name') name?: string,
  ) {
    return this.productsService.findAll(req.user.id, {
      ...(kindId && { kindId }),
      ...(name !== undefined && name !== '' && { name }),
    });
  }

  @Get(':id')
  findOne(@Req() req: { user: JwtUser }, @Param('id') id: string) {
    return this.productsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: { user: JwtUser },
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: JwtUser }, @Param('id') id: string) {
    return this.productsService.remove(req.user.id, id);
  }
}
