-- Agregar campos de timestamps a la tabla usuarios
ALTER TABLE usuarios
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Crear trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_usuarios_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS usuarios_updated_at_trigger ON usuarios;

CREATE TRIGGER usuarios_updated_at_trigger
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION update_usuarios_updated_at();
