import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVentaDto } from './dto/create-venta.dto';
import { VentasService } from './ventas.service';

type AuthRequest = Request & { user: { idUsuario: number; usuario: string } };

@Controller('ventas')
@UseGuards(JwtAuthGuard)
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  create(@Body() dto: CreateVentaDto, @Req() req: AuthRequest) {
    return this.ventasService.create(dto, req.user.idUsuario);
  }

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get('resumen/dia')
  resumenDia() {
    return this.ventasService.resumenDia();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.remove(id);
  }
}
