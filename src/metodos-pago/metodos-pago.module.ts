import { Module } from '@nestjs/common';
import { MetodosPagoController } from './metodos-pago.controller';
import { MetodosPagoService } from './metodos-pago.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService],
  exports: [MetodosPagoService],
})
export class MetodosPagoModule {}
