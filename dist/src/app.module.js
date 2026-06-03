"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path = __importStar(require("path"));
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const categorias_module_1 = require("./categorias/categorias.module");
const compras_module_1 = require("./compras/compras.module");
const inventario_module_1 = require("./inventario/inventario.module");
const prisma_module_1 = require("./prisma/prisma.module");
const productos_module_1 = require("./productos/productos.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const ventas_module_1 = require("./ventas/ventas.module");
const marcas_module_1 = require("./marcas/marcas.module");
const proveedores_module_1 = require("./proveedores/proveedores.module");
const unidades_module_1 = require("./unidades/unidades.module");
const media_module_1 = require("./media/media.module");
const metodos_pago_module_1 = require("./metodos-pago/metodos-pago.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            categorias_module_1.CategoriasModule,
            productos_module_1.ProductosModule,
            ventas_module_1.VentasModule,
            compras_module_1.ComprasModule,
            inventario_module_1.InventarioModule,
            marcas_module_1.MarcasModule,
            proveedores_module_1.ProveedoresModule,
            unidades_module_1.UnidadesModule,
            media_module_1.MediaModule,
            metodos_pago_module_1.MetodosPagoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map