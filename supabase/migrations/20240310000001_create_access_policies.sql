-- Habilitar RLS para todas as tabelas (caso ainda não esteja)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions_likes ENABLE ROW LEVEL SECURITY;

-- *** PROFILES (USUÁRIOS) ***
-- Política para leitura de perfis (todos podem ver todos os perfis)
DROP POLICY IF EXISTS "Perfis visíveis para todos" ON public.profiles;
CREATE POLICY "Perfis visíveis para todos" 
  ON public.profiles FOR SELECT 
  USING (true);

-- Política para criação de perfil (só pode criar o próprio perfil)
DROP POLICY IF EXISTS "Usuários podem criar seu perfil" ON public.profiles;
CREATE POLICY "Usuários podem criar seu perfil" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Política para atualização de perfil (só pode atualizar o próprio perfil)
DROP POLICY IF EXISTS "Usuários podem atualizar seu perfil" ON public.profiles;
CREATE POLICY "Usuários podem atualizar seu perfil" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Política para remoção de perfil (só pode remover o próprio perfil)
DROP POLICY IF EXISTS "Usuários podem remover seu perfil" ON public.profiles;
CREATE POLICY "Usuários podem remover seu perfil" 
  ON public.profiles FOR DELETE 
  USING (auth.uid() = id);

-- *** THEMES (TEMAS) ***
-- Política para leitura de temas (todos podem ver)
DROP POLICY IF EXISTS "Temas visíveis para todos" ON public.themes;
CREATE POLICY "Temas visíveis para todos" 
  ON public.themes FOR SELECT 
  USING (true);

-- Política para criação/edição/remoção de temas (apenas admins)
-- Nota: Você deve implementar uma lógica de verificação de admin

-- *** COUNTRIES (PAÍSES) ***
-- Política para leitura de países (todos podem ver)
DROP POLICY IF EXISTS "Países visíveis para todos" ON public.countries;
CREATE POLICY "Países visíveis para todos" 
  ON public.countries FOR SELECT 
  USING (true);

-- Política para criação/edição/remoção de países (apenas admins)
-- Nota: Você deve implementar uma lógica de verificação de admin

-- *** TIPS (DICAS) ***
-- Política para leitura de dicas (todos podem ver)
DROP POLICY IF EXISTS "Dicas visíveis para todos" ON public.tips;
CREATE POLICY "Dicas visíveis para todos" 
  ON public.tips FOR SELECT 
  USING (true);

-- Política para criação de dicas (usuários autenticados podem criar)
DROP POLICY IF EXISTS "Usuários autenticados podem criar dicas" ON public.tips;
CREATE POLICY "Usuários autenticados podem criar dicas" 
  ON public.tips FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

-- Política para atualização de dicas (apenas o criador pode atualizar)
DROP POLICY IF EXISTS "Usuários podem atualizar suas dicas" ON public.tips;
CREATE POLICY "Usuários podem atualizar suas dicas" 
  ON public.tips FOR UPDATE 
  USING (auth.uid() = created_by);

-- Política para remoção de dicas (apenas o criador pode remover)
DROP POLICY IF EXISTS "Usuários podem remover suas dicas" ON public.tips;
CREATE POLICY "Usuários podem remover suas dicas" 
  ON public.tips FOR DELETE 
  USING (auth.uid() = created_by);

-- *** TIPS_COMMENTS (COMENTÁRIOS DE DICAS) ***
-- Política para leitura de comentários (todos podem ver)
DROP POLICY IF EXISTS "Comentários de dicas visíveis para todos" ON public.tips_comments;
CREATE POLICY "Comentários de dicas visíveis para todos" 
  ON public.tips_comments FOR SELECT 
  USING (true);

-- Política para criação de comentários (usuários autenticados podem criar)
DROP POLICY IF EXISTS "Usuários autenticados podem comentar dicas" ON public.tips_comments;
CREATE POLICY "Usuários autenticados podem comentar dicas" 
  ON public.tips_comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para atualização de comentários (apenas o autor pode atualizar)
DROP POLICY IF EXISTS "Usuários podem atualizar seus comentários em dicas" ON public.tips_comments;
CREATE POLICY "Usuários podem atualizar seus comentários em dicas" 
  ON public.tips_comments FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para remoção de comentários (o autor do comentário OU o autor da dica podem remover)
DROP POLICY IF EXISTS "Usuários podem remover seus comentários em dicas" ON public.tips_comments;
CREATE POLICY "Usuários podem remover seus comentários em dicas" 
  ON public.tips_comments FOR DELETE 
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.tips 
      WHERE tips.id = tips_comments.tip_id AND tips.created_by = auth.uid()
    )
  );

-- *** TIPS_LIKES (CURTIDAS DE DICAS) ***
-- Política para leitura de curtidas (todos podem ver)
DROP POLICY IF EXISTS "Curtidas de dicas visíveis para todos" ON public.tips_likes;
CREATE POLICY "Curtidas de dicas visíveis para todos" 
  ON public.tips_likes FOR SELECT 
  USING (true);

-- Política para criação de curtidas (usuários autenticados podem curtir)
DROP POLICY IF EXISTS "Usuários autenticados podem curtir dicas" ON public.tips_likes;
CREATE POLICY "Usuários autenticados podem curtir dicas" 
  ON public.tips_likes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para remoção de curtidas (apenas o usuário que curtiu pode descurtir)
DROP POLICY IF EXISTS "Usuários podem remover suas curtidas em dicas" ON public.tips_likes;
CREATE POLICY "Usuários podem remover suas curtidas em dicas" 
  ON public.tips_likes FOR DELETE 
  USING (auth.uid() = user_id);

-- *** QUESTIONS (PERGUNTAS) ***
-- Política para leitura de perguntas (todos podem ver)
DROP POLICY IF EXISTS "Perguntas visíveis para todos" ON public.questions;
CREATE POLICY "Perguntas visíveis para todos" 
  ON public.questions FOR SELECT 
  USING (true);

-- Política para criação de perguntas (usuários autenticados podem criar)
DROP POLICY IF EXISTS "Usuários autenticados podem criar perguntas" ON public.questions;
CREATE POLICY "Usuários autenticados podem criar perguntas" 
  ON public.questions FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

-- Política para atualização de perguntas (apenas o autor pode atualizar)
DROP POLICY IF EXISTS "Usuários podem atualizar suas perguntas" ON public.questions;
CREATE POLICY "Usuários podem atualizar suas perguntas" 
  ON public.questions FOR UPDATE 
  USING (auth.uid() = created_by);

-- Política para remoção de perguntas (apenas o autor pode remover)
DROP POLICY IF EXISTS "Usuários podem remover suas perguntas" ON public.questions;
CREATE POLICY "Usuários podem remover suas perguntas" 
  ON public.questions FOR DELETE 
  USING (auth.uid() = created_by);

-- *** QUESTIONS_COMMENTS (COMENTÁRIOS DE PERGUNTAS) ***
-- Política para leitura de comentários de perguntas (todos podem ver)
DROP POLICY IF EXISTS "Comentários de perguntas visíveis para todos" ON public.questions_comments;
CREATE POLICY "Comentários de perguntas visíveis para todos" 
  ON public.questions_comments FOR SELECT 
  USING (true);

-- Política para criação de comentários em perguntas (usuários autenticados podem criar)
DROP POLICY IF EXISTS "Usuários autenticados podem comentar perguntas" ON public.questions_comments;
CREATE POLICY "Usuários autenticados podem comentar perguntas" 
  ON public.questions_comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para atualização de comentários em perguntas (apenas o autor pode atualizar)
DROP POLICY IF EXISTS "Usuários podem atualizar seus comentários em perguntas" ON public.questions_comments;
CREATE POLICY "Usuários podem atualizar seus comentários em perguntas" 
  ON public.questions_comments FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para remoção de comentários (o autor do comentário OU o autor da pergunta podem remover)
DROP POLICY IF EXISTS "Usuários podem remover seus comentários em perguntas" ON public.questions_comments;
CREATE POLICY "Usuários podem remover seus comentários em perguntas" 
  ON public.questions_comments FOR DELETE 
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.questions 
      WHERE questions.id = questions_comments.question_id AND questions.created_by = auth.uid()
    )
  );

-- *** QUESTIONS_LIKES (CURTIDAS DE PERGUNTAS) ***
-- Política para leitura de curtidas de perguntas (todos podem ver)
DROP POLICY IF EXISTS "Curtidas de perguntas visíveis para todos" ON public.questions_likes;
CREATE POLICY "Curtidas de perguntas visíveis para todos" 
  ON public.questions_likes FOR SELECT 
  USING (true);

-- Política para criação de curtidas em perguntas (usuários autenticados podem curtir)
DROP POLICY IF EXISTS "Usuários autenticados podem curtir perguntas" ON public.questions_likes;
CREATE POLICY "Usuários autenticados podem curtir perguntas" 
  ON public.questions_likes FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para remoção de curtidas (apenas o usuário que curtiu pode descurtir)
DROP POLICY IF EXISTS "Usuários podem remover suas curtidas em perguntas" ON public.questions_likes;
CREATE POLICY "Usuários podem remover suas curtidas em perguntas" 
  ON public.questions_likes FOR DELETE 
  USING (auth.uid() = user_id);

-- Conceder acesso para serviço e função anônima
-- Isto permite que a aplicação acesse as tabelas via API
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role; 