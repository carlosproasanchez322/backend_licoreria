-- Script para crear tabla media_productos manualmente

CREATE TABLE IF NOT EXISTS media_productos (
  id_media SERIAL PRIMARY KEY,
  id_producto INTEGER NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  nombre_archivo VARCHAR(255) NOT NULL,
  ruta VARCHAR(500) NOT NULL,
  url_publica VARCHAR(500),
  tamano INTEGER NOT NULL,
  mime_type VARCHAR(50) NOT NULL,
  es_principal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_media_productos_id_producto ON media_productos(id_producto);
CREATE INDEX IF NOT EXISTS idx_media_productos_es_principal ON media_productos(es_principal);

-- Verificar que la tabla se creó
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'media_productos';
