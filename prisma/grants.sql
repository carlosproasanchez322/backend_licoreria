-- Ejecutar como superusuario postgres si carlos no tiene permisos:
-- psql -U postgres -d minimarket_licoreria -f prisma/grants.sql

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO carlos;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO carlos;
GRANT USAGE ON SCHEMA public TO carlos;
