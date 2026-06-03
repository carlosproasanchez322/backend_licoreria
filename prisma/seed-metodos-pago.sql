-- Insertar métodos de pago
INSERT INTO metodos_pago (nombre) VALUES
  ('Efectivo'),
  ('Yape')
ON CONFLICT DO NOTHING;
