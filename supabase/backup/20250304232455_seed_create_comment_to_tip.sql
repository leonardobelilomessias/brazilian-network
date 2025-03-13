-- Primeiro vamos verificar se o usuário existe e pegar seu ID
DO $$
DECLARE
  first_user_id UUID;
BEGIN
  -- Pega o primeiro usuário disponível na tabela users
  SELECT id INTO first_user_id FROM users LIMIT 1;
  
  -- Insere os comentários usando o ID do usuário existente
  INSERT INTO comments (content, tip_id, user_id) VALUES
  ('Excelente dica! Muito útil para quem está planejando uma viagem.', 'dbd318d2-cbef-45b1-8ee3-1bb101f0aeff', first_user_id),
  ('Concordo totalmente! Já fiz algo parecido e funcionou muito bem.', 'dbd318d2-cbef-45b1-8ee3-1bb101f0aeff', first_user_id),
  ('Obrigado por compartilhar essa experiência! Vou usar essas dicas na minha próxima viagem.', 'dbd318d2-cbef-45b1-8ee3-1bb101f0aeff', first_user_id);
END $$;

