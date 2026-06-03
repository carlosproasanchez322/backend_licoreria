export declare const ROLES: readonly ["ADMIN", "CAJERO", "INVENTARIO"];
export declare const METODOS_PAGO: readonly ["EFECTIVO", "TARJETA", "YAPE", "PLIN", "TRANSFERENCIA"];
export declare const UNIDADES: readonly [{
    readonly nombre: "Unidad";
    readonly abreviatura: "UND";
}, {
    readonly nombre: "Caja";
    readonly abreviatura: "CJA";
}, {
    readonly nombre: "Pack x6";
    readonly abreviatura: "P6";
}, {
    readonly nombre: "Litro";
    readonly abreviatura: "LT";
}, {
    readonly nombre: "Botella";
    readonly abreviatura: "BOT";
}, {
    readonly nombre: "Six Pack";
    readonly abreviatura: "SIX";
}];
export declare const CATEGORIAS: readonly [{
    readonly nombre: "Licores";
    readonly descripcion: "Whisky, ron, vodka, gin";
}, {
    readonly nombre: "Cervezas";
    readonly descripcion: "Nacionales e importadas";
}, {
    readonly nombre: "Vinos";
    readonly descripcion: "Tintos, blancos, espumantes";
}, {
    readonly nombre: "Piscos";
    readonly descripcion: "Quebranta, Italia, mosto";
}, {
    readonly nombre: "Ron";
    readonly descripcion: "Ron nacional e importado";
}, {
    readonly nombre: "Whisky";
    readonly descripcion: "Blended y single malt";
}, {
    readonly nombre: "Vodka";
    readonly descripcion: "Vodkas premium y económicos";
}, {
    readonly nombre: "Gaseosas";
    readonly descripcion: "Refrescos y aguas";
}, {
    readonly nombre: "Snacks";
    readonly descripcion: "Piqueos y botanas";
}, {
    readonly nombre: "Cigarros";
    readonly descripcion: "Tabaco y accesorios";
}, {
    readonly nombre: "Energizantes";
    readonly descripcion: "Bebidas energéticas";
}, {
    readonly nombre: "MIXERS";
    readonly descripcion: "Jugos y complementos";
}];
export declare const MARCAS: readonly ["Johnnie Walker", "Jack Daniels", "Absolut", "Smirnoff", "Bacardi", "Havana Club", "Campari", "Ballantines", "Chivas Regal", "Glenfiddich", "Don Julio", "Jose Cuervo", "Santa Rita", "Tabernero", "Pisco Portón", "Ocucaje", "Cusqueña", "Pilsen", "Corona", "Heineken", "Red Bull", "Monster", "Coca-Cola", "Inca Kola", "Marlboro", "Lucky Strike"];
export declare const PROVEEDORES: readonly [{
    readonly razonSocial: "Distribuidora Lima SAC";
    readonly ruc: "20100000001";
    readonly telefono: "014567890";
    readonly email: "ventas@distribuidora.com";
}, {
    readonly razonSocial: "Importadora Andina EIRL";
    readonly ruc: "20100000002";
    readonly telefono: "014567891";
    readonly email: "compras@andina.com";
}, {
    readonly razonSocial: "Bebidas del Norte SA";
    readonly ruc: "20100000003";
    readonly telefono: "014567892";
    readonly email: "logistica@norte.com";
}, {
    readonly razonSocial: "Comercial Sur Peru";
    readonly ruc: "20100000004";
    readonly telefono: "014567893";
    readonly email: "info@sursa.com";
}, {
    readonly razonSocial: "Licores Premium SAC";
    readonly ruc: "20100000005";
    readonly telefono: "014567894";
    readonly email: "premium@licores.pe";
}, {
    readonly razonSocial: "Cervezas Unidos";
    readonly ruc: "20100000006";
    readonly telefono: "014567895";
    readonly email: "pedidos@cervezas.pe";
}, {
    readonly razonSocial: "Vinos y Más";
    readonly ruc: "20100000007";
    readonly telefono: "014567896";
    readonly email: "vinos@vinosymas.pe";
}, {
    readonly razonSocial: "Snack Distribución";
    readonly ruc: "20100000008";
    readonly telefono: "014567897";
    readonly email: "snacks@distrib.pe";
}];
export declare const USUARIOS: readonly [{
    readonly nombres: "Carlos";
    readonly apellidos: "Administrador";
    readonly usuario: "carlos";
    readonly rol: "ADMIN";
}, {
    readonly nombres: "María";
    readonly apellidos: "González";
    readonly usuario: "maria";
    readonly rol: "CAJERO";
}, {
    readonly nombres: "Juan";
    readonly apellidos: "Pérez";
    readonly usuario: "juan";
    readonly rol: "CAJERO";
}, {
    readonly nombres: "Ana";
    readonly apellidos: "Torres";
    readonly usuario: "ana";
    readonly rol: "CAJERO";
}, {
    readonly nombres: "Luis";
    readonly apellidos: "Ramírez";
    readonly usuario: "luis";
    readonly rol: "INVENTARIO";
}, {
    readonly nombres: "Rosa";
    readonly apellidos: "Vega";
    readonly usuario: "rosa";
    readonly rol: "INVENTARIO";
}, {
    readonly nombres: "Pedro";
    readonly apellidos: "Castro";
    readonly usuario: "pedro";
    readonly rol: "CAJERO";
}];
export declare const PRODUCTOS_BASE: readonly [{
    readonly nombre: "Whisky Black Label 750ml";
    readonly cat: "Whisky";
    readonly marca: "Johnnie Walker";
    readonly compra: 85;
    readonly venta: 120;
    readonly licor: true;
    readonly alcohol: 40;
}, {
    readonly nombre: "Whisky Red Label 750ml";
    readonly cat: "Whisky";
    readonly marca: "Johnnie Walker";
    readonly compra: 55;
    readonly venta: 78;
    readonly licor: true;
    readonly alcohol: 40;
}, {
    readonly nombre: "Whisky Chivas 12 años";
    readonly cat: "Whisky";
    readonly marca: "Chivas Regal";
    readonly compra: 95;
    readonly venta: 135;
    readonly licor: true;
    readonly alcohol: 40;
}, {
    readonly nombre: "Jack Daniels 750ml";
    readonly cat: "Licores";
    readonly marca: "Jack Daniels";
    readonly compra: 70;
    readonly venta: 98;
    readonly licor: true;
    readonly alcohol: 40;
}, {
    readonly nombre: "Ron Cartavio Black";
    readonly cat: "Ron";
    readonly marca: "Havana Club";
    readonly compra: 28;
    readonly venta: 42;
    readonly licor: true;
    readonly alcohol: 40;
}, {
    readonly nombre: "Ron Bacardi Superior";
    readonly cat: "Ron";
    readonly marca: "Bacardi";
    readonly compra: 32;
    readonly venta: 48;
    readonly licor: true;
    readonly alcohol: 37.5;
}, {
    readonly nombre: "Vodka Absolut 750ml";
    readonly cat: "Vodka";
    readonly marca: "Absolut";
    readonly compra: 45;
    readonly venta: 65;
    readonly licor: true;
    readonly alcohol: 40;
}, {
    readonly nombre: "Vodka Smirnoff 750ml";
    readonly cat: "Vodka";
    readonly marca: "Smirnoff";
    readonly compra: 28;
    readonly venta: 40;
    readonly licor: true;
    readonly alcohol: 37.5;
}, {
    readonly nombre: "Pisco Quebranta 750ml";
    readonly cat: "Piscos";
    readonly marca: "Pisco Portón";
    readonly compra: 22;
    readonly venta: 35;
    readonly licor: true;
    readonly alcohol: 42;
}, {
    readonly nombre: "Pisco Italia 750ml";
    readonly cat: "Piscos";
    readonly marca: "Ocucaje";
    readonly compra: 18;
    readonly venta: 28;
    readonly licor: true;
    readonly alcohol: 42;
}, {
    readonly nombre: "Gin Bombay Sapphire";
    readonly cat: "Licores";
    readonly marca: "Campari";
    readonly compra: 55;
    readonly venta: 78;
    readonly licor: true;
    readonly alcohol: 47;
}, {
    readonly nombre: "Tequila Don Julio";
    readonly cat: "Licores";
    readonly marca: "Don Julio";
    readonly compra: 120;
    readonly venta: 165;
    readonly licor: true;
    readonly alcohol: 38;
}, {
    readonly nombre: "Cerveza Cusqueña 630ml";
    readonly cat: "Cervezas";
    readonly marca: "Cusqueña";
    readonly compra: 4.5;
    readonly venta: 7;
    readonly licor: true;
    readonly alcohol: 5;
}, {
    readonly nombre: "Cerveza Pilsen 630ml";
    readonly cat: "Cervezas";
    readonly marca: "Pilsen";
    readonly compra: 4;
    readonly venta: 6.5;
    readonly licor: true;
    readonly alcohol: 4.8;
}, {
    readonly nombre: "Cerveza Corona 355ml";
    readonly cat: "Cervezas";
    readonly marca: "Corona";
    readonly compra: 3.5;
    readonly venta: 6;
    readonly licor: true;
    readonly alcohol: 4.5;
}, {
    readonly nombre: "Cerveza Heineken 330ml";
    readonly cat: "Cervezas";
    readonly marca: "Heineken";
    readonly compra: 4;
    readonly venta: 7;
    readonly licor: true;
    readonly alcohol: 5;
}, {
    readonly nombre: "Vino Tabernero Gran Reserva";
    readonly cat: "Vinos";
    readonly marca: "Tabernero";
    readonly compra: 25;
    readonly venta: 38;
    readonly licor: true;
    readonly alcohol: 13.5;
}, {
    readonly nombre: "Vino Santa Rita 120";
    readonly cat: "Vinos";
    readonly marca: "Santa Rita";
    readonly compra: 18;
    readonly venta: 28;
    readonly licor: true;
    readonly alcohol: 13;
}, {
    readonly nombre: "Red Bull 250ml";
    readonly cat: "Energizantes";
    readonly marca: "Red Bull";
    readonly compra: 4;
    readonly venta: 7.5;
    readonly licor: false;
}, {
    readonly nombre: "Monster Energy 473ml";
    readonly cat: "Energizantes";
    readonly marca: "Monster";
    readonly compra: 3.5;
    readonly venta: 6.5;
    readonly licor: false;
}, {
    readonly nombre: "Coca-Cola 2L";
    readonly cat: "Gaseosas";
    readonly marca: "Coca-Cola";
    readonly compra: 5;
    readonly venta: 8.5;
    readonly licor: false;
}, {
    readonly nombre: "Inca Kola 2L";
    readonly cat: "Gaseosas";
    readonly marca: "Inca Kola";
    readonly compra: 5;
    readonly venta: 8.5;
    readonly licor: false;
}, {
    readonly nombre: "Papas Lays 150g";
    readonly cat: "Snacks";
    readonly marca: "Coca-Cola";
    readonly compra: 2.5;
    readonly venta: 4.5;
    readonly licor: false;
}, {
    readonly nombre: "Mani salado 200g";
    readonly cat: "Snacks";
    readonly marca: "Coca-Cola";
    readonly compra: 1.8;
    readonly venta: 3.5;
    readonly licor: false;
}, {
    readonly nombre: "Cigarro Marlboro Box";
    readonly cat: "Cigarros";
    readonly marca: "Marlboro";
    readonly compra: 12;
    readonly venta: 16;
    readonly licor: false;
}, {
    readonly nombre: "Cigarro Lucky Strike";
    readonly cat: "Cigarros";
    readonly marca: "Lucky Strike";
    readonly compra: 11;
    readonly venta: 15;
    readonly licor: false;
}];
