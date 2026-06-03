import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetodosPagoService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.metodoPago.findMany({
      orderBy: { idMetodo: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.metodoPago.findUnique({
      where: { idMetodo: id },
    });
  }
}
