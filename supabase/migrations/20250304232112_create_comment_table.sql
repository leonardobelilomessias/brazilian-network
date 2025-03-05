CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  tip_id UUID NOT NULL REFERENCES tips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Criar índices para melhorar performance de consultas
CREATE INDEX comments_tip_id_idx ON comments(tip_id);
CREATE INDEX comments_user_id_idx ON comments(user_id);

-- Criar trigger para atualizar o updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Adicionar RLS (Row Level Security)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Comentários são visíveis para todos" 
ON comments FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Usuários podem criar seus próprios comentários" 
ON comments FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar seus próprios comentários" 
ON comments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios comentários" 
ON comments FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

