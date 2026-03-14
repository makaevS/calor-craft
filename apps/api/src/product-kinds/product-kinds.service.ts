import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateProductKindDto } from './dto/create-product-kind.dto.js';
import type { UpdateProductKindDto } from './dto/update-product-kind.dto.js';

@Injectable()
export class ProductKindsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProductKindDto) {
    try {
      return await this.prisma.productKind.create({
        data: {
          userId,
          name: dto.name,
          calories: dto.calories,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          'Product kind with this name already exists',
        );
      }
      throw e;
    }
  }

  findAll(userId: string, filters?: { name?: string }) {
    const name = filters?.name?.trim();
    return this.prisma.productKind.findMany({
      where: {
        userId,
        ...(name && {
          name: { contains: name, mode: 'insensitive' },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const kind = await this.prisma.productKind.findUnique({
      where: { id },
    });
    if (!kind) {
      throw new NotFoundException('Product kind not found');
    }
    if (kind.userId !== userId) {
      throw new ForbiddenException();
    }
    return kind;
  }

  async update(userId: string, id: string, dto: UpdateProductKindDto) {
    await this.findOne(userId, id);
    try {
      return await this.prisma.productKind.update({
        where: { id },
        data: {
          ...(dto.name !== undefined && { name: dto.name }),
          ...(dto.calories !== undefined && { calories: dto.calories }),
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          'Product kind with this name already exists',
        );
      }
      throw e;
    }
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.prisma.productKind.delete({ where: { id } });
    return { ok: true };
  }
}
