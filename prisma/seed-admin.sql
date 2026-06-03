-- Ejecutar en psql como usuario con permisos (postgres):
-- psql -U postgres -d minimarket_licoreria -f prisma/seed-admin.sql

INSERT INTO roles (nombre) VALUES ('ADMIN') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO roles (nombre) VALUES ('CAJERO') ON CONFLICT (nombre) DO NOTHING;

INSERT INTO metodos_pago (nombre)
SELECT 'EFECTIVO' WHERE NOT EXISTS (SELECT 1 FROM metodos_pago WHERE nombre = 'EFECTIVO');

INSERT INTO unidades_medida (nombre, abreviatura)
SELECT 'Unidad', 'UND' WHERE NOT EXISTS (SELECT 1 FROM unidades_medida WHERE abreviatura = 'UND');

INSERT INTO usuarios (nombres, apellidos, usuario, password_hash, estado, id_rol)
SELECT
  'Carlos',
  'Administrador',
  'carlos',
  '$2b$10$yzcleTeau7yxZy.u5/COiOmTt1JrvZRKelO2gGc71cfNdiE.qAWLm',
  TRUE,
  (SELECT id_rol FROM roles WHERE nombre = 'ADMIN' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE usuario = 'carlos');
