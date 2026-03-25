import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMealDto } from './dto/create-meal.dto.js';
import { UpdateMealDto } from './dto/update-meal.dto.js';

@Injectable()
export class MealsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateMealDto) {
    return await this.prisma.meal.create({
      data: {
        userId,
        name: dto.name,
        date: new Date(dto.date),
        isPlanned: dto.isPlanned,
        mealItems: {
          create: dto.mealItems.map((mealItem) => ({
            quantity: mealItem.quantity,
            measure: mealItem.measure,
            ...(mealItem.productId && { productId: mealItem.productId }),
            ...(mealItem.dish && {
              dish: {
                create: {
                  name: mealItem.dish.name,
                  items: mealItem.dish.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    measure: item.measure,
                  })),
                },
              },
            }),
          })),
        },
      },
      include: {
        mealItems: {
          include: {
            product: true,
            dish: {
              include: {
                items: { include: { product: true } },
              },
            },
          },
        },
      },
    });
  }

  async findAll(userId: string, filters?: { name?: string }) {
    const name = filters?.name?.trim();
    return this.prisma.meal.findMany({
      where: {
        userId,
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
      },
      include: {
        mealItems: {
          include: {
            product: true,
            dish: {
              include: {
                items: { include: { product: true } },
              },
            },
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        mealItems: {
          include: {
            product: true,
            dish: {
              include: {
                items: { include: { product: true } },
              },
            },
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Meal not found');
    }
    if (product.userId !== userId) {
      throw new ForbiddenException();
    }
    return product;
  }

  async update(userId: string, id: string, dto: UpdateMealDto) {
    await this.findOne(userId, id);
    await this.prisma.mealItem.deleteMany({
      where: { mealId: id },
    });
    return this.prisma.meal.update({
      where: { id },
      data: {
        ...(dto.date !== undefined && { date: new Date(dto.date) }),
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.isPlanned !== undefined && { isPlanned: dto.isPlanned }),
        ...(dto.mealItems && {
          mealItems: {
            create: dto.mealItems.map((item) => ({
              quantity: item.quantity,
              measure: item.measure,
              ...(item.productId !== undefined && {
                productId: item.productId,
              }),
              ...(item.dish !== undefined && {
                dish: {
                  create: {
                    userId,
                    name: item.dish.name,
                    items: {
                      create: item.dish.items.map((dishItem) => ({
                        product: {
                          connect: { id: dishItem.productId },
                        },
                      })),
                    },
                  },
                },
              }),
            })),
          },
        }),
      },
      include: {
        mealItems: {
          include: {
            product: true,
            dish: {
              include: {
                items: {
                  include: { product: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.prisma.meal.delete({ where: { id } });
    return { ok: true };
  }
}
