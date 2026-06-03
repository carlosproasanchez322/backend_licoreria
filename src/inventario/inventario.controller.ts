import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MovimientoInventarioDto } from './dto/movimiento-inventario.dto';
import { InventarioService } from './inventario.service';

@Controller('inventario')
@UseGuards(JwtAuthGuard)
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get('kardex')
  kardex(@Query('idProducto') idProducto?: string) {
    return this.inventarioService.kardex(
      idProducto ? Number(idProducto) : undefined,
    );
  }

  @Post('movimiento')
  movimiento(@Body() dto: MovimientoInventarioDto) {
    return this.inventarioService.registrarMovimiento(dto);
  }
}
