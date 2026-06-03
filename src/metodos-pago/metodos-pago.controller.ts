import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';

@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Get()
  findAll() {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metodosPagoService.findOne(id);
  }
}
