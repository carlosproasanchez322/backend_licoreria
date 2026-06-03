import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductoDto) {
    await this.validarRelaciones(data.idCategoria, data.idUnidad, data.idMarca);

    // Construir objeto de datos, excluyendo undefined
    const createData: any = {
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      precioCompra: data.precioCompra,
      precioVenta: data.precioVenta,
      stock: data.stock,
      codigoBarra: data.codigoBarra || null,
      idCategoria: data.idCategoria,
      idUnidad: data.idUnidad,
    };

    // Solo incluir idMarca si está definido
    if (data.idMarca) {
      createData.idMarca = data.idMarca;
    }

    const producto = await this.prisma.producto.create({
      data: createData,
      include: this.includeRelaciones(),
    });

    return this.mapProducto(producto);
  }

  async findAll() {
    const productos = await this.prisma.producto.findMany({
      include: this.includeRelaciones(),
      orderBy: { idProducto: 'desc' },
    });

    return productos.map((p) => this.mapProducto(p));
  }

  async findOne(id: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { idProducto: id },
      include: this.includeRelaciones(),
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return this.mapProducto(producto);
  }

  async update(id: number, data: UpdateProductoDto) {
    await this.findOne(id);

    if (data.idCategoria || data.idUnidad || data.idMarca) {
      await this.validarRelaciones(
        data.idCategoria,
        data.idUnidad,
        data.idMarca,
      );
    }

    // Construir objeto de datos, solo incluyendo campos que fueron proporcionados
    const updateData: any = {};

    if (data.nombre !== undefined) updateData.nombre = data.nombre;
    if (data.descripcion !== undefined) updateData.descripcion = data.descripcion || null;
    if (data.precioCompra !== undefined) updateData.precioCompra = data.precioCompra;
    if (data.precioVenta !== undefined) updateData.precioVenta = data.precioVenta;
    if (data.stock !== undefined) updateData.stock = data.stock;
    if (data.codigoBarra !== undefined) updateData.codigoBarra = data.codigoBarra || null;
    if (data.idCategoria !== undefined) updateData.idCategoria = data.idCategoria;
    if (data.idUnidad !== undefined) updateData.idUnidad = data.idUnidad;
    if (data.idMarca !== undefined) updateData.idMarca = data.idMarca || null;

    const producto = await this.prisma.producto.update({
      where: { idProducto: id },
      data: updateData,
      include: this.includeRelaciones(),
    });

    return this.mapProducto(producto);
  }

  async remove(id: number) {
    await this.findOne(id);

    const producto = await this.prisma.producto.delete({
      where: { idProducto: id },
      include: this.includeRelaciones(),
    });

    return this.mapProducto(producto);
  }

  private includeRelaciones() {
    return {
      categoria: true,
      marca: true,
      unidad: true,
      media: true,
    } as const;
  }

  private async validarRelaciones(
    idCategoria?: number,
    idUnidad?: number,
    idMarca?: number,
  ) {
    if (idCategoria) {
      const categoria = await this.prisma.categoria.findUnique({
        where: { idCategoria },
      });
      if (!categoria) {
        throw new BadRequestException('Categoría no existe');
      }
    }

    if (idUnidad) {
      const unidad = await this.prisma.unidadMedida.findUnique({
        where: { idUnidad },
      });
      if (!unidad) {
        throw new BadRequestException('Unidad de medida no existe');
      }
    }

    if (idMarca) {
      const marca = await this.prisma.marca.findUnique({
        where: { idMarca },
      });
      if (!marca) {
        throw new BadRequestException('Marca no existe');
      }
    }
  }

  private mapProducto(producto: {
    idProducto: number;
    precioCompra: unknown;
    precioVenta: unknown;
    categoria: { idCategoria: number; nombre: string; descripcion?: string | null };
    marca: { idMarca: number; nombre: string } | null;
    unidad: { idUnidad: number; nombre: string; abreviatura: string };
    media?: Array<{
      idMedia: number;
      tipo: string;
      nombreArchivo: string;
      ruta: string;
      urlPublica: string | null;
      tamano: number;
      mimeType: string;
      esPrincipal: boolean;
      createdAt: Date;
      updatedAt: Date;
    }>;
    [key: string]: unknown;
  }) {
    const { idProducto, precioCompra, precioVenta, categoria, marca, unidad, media, ...rest } =
      producto;

    return {
      id: idProducto,
      ...rest,
      precioCompra: Number(precioCompra),
      precioVenta: Number(precioVenta),
      categoria: {
        id: categoria.idCategoria,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      },
      marca: marca
        ? { id: marca.idMarca, nombre: marca.nombre }
        : null,
      unidad: {
        id: unidad.idUnidad,
        nombre: unidad.nombre,
        abreviatura: unidad.abreviatura,
      },
      media: media?.map((m) => ({
        id: m.idMedia,
        tipo: m.tipo,
        nombreArchivo: m.nombreArchivo,
        ruta: m.ruta,
        urlPublica: m.urlPublica,
        tamano: m.tamano,
        mimeType: m.mimeType,
        esPrincipal: m.esPrincipal,
        createdAt: m.createdAt.toISOString(),
        updatedAt: m.updatedAt.toISOString(),
      })) || [],
    };
  }
}
