import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateProductDto } from './dto/create-product.dto.js';
import type { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        userId,
        kindId: dto.kindId,
        name: dto.name,
        calories: dto.calories,
      },
      include: { kind: true },
    });
  }

  findAll(userId: string, filters?: { kindId?: string; name?: string }) {
    const name = filters?.name?.trim();
    return this.prisma.product.findMany({
      where: {
        userId,
        ...(filters?.kindId && { kindId: filters.kindId }),
        ...(name && {
          name: { contains: name, mode: 'insensitive' },
        }),
      },
      include: { kind: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { kind: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.userId !== userId) {
      throw new ForbiddenException();
    }
    return product;
  }

  async update(userId: string, id: string, dto: UpdateProductDto) {
    await this.findOne(userId, id);
    return this.prisma.product.update({
      where: { id },
      data: {
        ...(dto.kindId !== undefined && { kindId: dto.kindId }),
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.calories !== undefined && { calories: dto.calories }),
      },
      include: { kind: true },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.prisma.product.delete({ where: { id } });
    return { ok: true };
  }
}
