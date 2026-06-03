import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ComprasModule } from './compras/compras.module';
import { InventarioModule } from './inventario/inventario.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VentasModule } from './ventas/ventas.module';
import { MarcasModule } from './marcas/marcas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { UnidadesModule } from './unidades/unidades.module';
import { MediaModule } from './media/media.module';
import { MetodosPagoModule } from './metodos-pago/metodos-pago.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    CategoriasModule,
    ProductosModule,
    VentasModule,
    ComprasModule,
    InventarioModule,
    MarcasModule,
    ProveedoresModule,
    UnidadesModule,
    MediaModule,
    MetodosPagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
