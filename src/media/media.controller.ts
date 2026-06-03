import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MediaService } from './media.service';

@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('productos/:idProducto/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @Param('idProducto') idProducto: string,
    @UploadedFile() file: Express.Multer.File,
    @Query('principal') principal?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó archivo');
    }

    const esPrincipal = principal === 'true';
    return this.mediaService.uploadMedia(+idProducto, file, esPrincipal);
  }

  // Rutas de productos primero (más específicas)
  @Get('productos/:idProducto/principal')
  async getMediaPrincipal(@Param('idProducto') idProducto: string) {
    return this.mediaService.getMediaPrincipal(+idProducto);
  }

  @Get('productos/:idProducto')
  async getMediaProducto(@Param('idProducto') idProducto: string) {
    return this.mediaService.getMediaProducto(+idProducto);
  }

  @Delete('productos/:idProducto/all')
  async deleteAllMediaProducto(@Param('idProducto') idProducto: string) {
    return this.mediaService.deleteAllMediaProducto(+idProducto);
  }

  // Rutas genéricas después (menos específicas)
  @Post(':idMedia/principal')
  async setMediaPrincipal(
    @Param('idMedia') idMedia: string,
    @Query('idProducto') idProducto: string,
  ) {
    return this.mediaService.setMediaPrincipal(+idMedia, +idProducto);
  }

  @Delete(':idMedia')
  async deleteMedia(
    @Param('idMedia') idMedia: string,
    @Query('idProducto') idProducto: string,
  ) {
    return this.mediaService.deleteMedia(+idMedia, +idProducto);
  }
}
