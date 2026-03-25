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
import { MealsService } from './meals.service.js';
import { CreateMealDto } from './dto/create-meal.dto.js';
import { UpdateMealDto } from './dto/update-meal.dto.js';

interface JwtUser {
  id: string;
  email: string;
}

@Controller('meals')
@UseGuards(JwtAuthGuard)
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  create(@Req() req: { user: JwtUser }, @Body() dto: CreateMealDto) {
    return this.mealsService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: { user: JwtUser }, @Query('name') name?: string) {
    return this.mealsService.findAll(req.user.id, {
      ...(name !== undefined && name !== '' && { name }),
    });
  }

  @Get(':id')
  findOne(@Req() req: { user: JwtUser }, @Param('id') id: string) {
    return this.mealsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: { user: JwtUser },
    @Param('id') id: string,
    @Body() dto: UpdateMealDto,
  ) {
    return this.mealsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: { user: JwtUser }, @Param('id') id: string) {
    return this.mealsService.remove(req.user.id, id);
  }
}
