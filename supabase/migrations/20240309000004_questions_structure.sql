-- Criar enum para status das perguntas apenas se não existir
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_status') THEN
        CREATE TYPE question_status AS ENUM ('draft', 'published', 'archived');
    END IF;
END$$;

-- Criar tabela de perguntas
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES public.themes(id) ON DELETE SET NULL,
    country_id UUID REFERENCES public.countries(id) ON DELETE SET NULL,
    status question_status DEFAULT 'published',
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela de comentários das perguntas
CREATE TABLE IF NOT EXISTS public.questions_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela de likes das perguntas
CREATE TABLE IF NOT EXISTS public.questions_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(question_id, user_id)
);

-- Triggers
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_questions_updated_at') THEN
        CREATE TRIGGER update_questions_updated_at
            BEFORE UPDATE ON public.questions
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_questions_comments_updated_at') THEN
        CREATE TRIGGER update_questions_comments_updated_at
            BEFORE UPDATE ON public.questions_comments
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END$$;

-- RLS
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions_likes ENABLE ROW LEVEL SECURITY;

-- Políticas para perguntas (drop e recria para garantir consistência)
DROP POLICY IF EXISTS "Perguntas visíveis para todos" ON public.questions;
CREATE POLICY "Perguntas visíveis para todos"
    ON public.questions FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Usuários autenticados podem criar perguntas" ON public.questions;
CREATE POLICY "Usuários autenticados podem criar perguntas"
    ON public.questions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Usuários podem editar suas próprias perguntas" ON public.questions;
CREATE POLICY "Usuários podem editar suas próprias perguntas"
    ON public.questions FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Usuários podem deletar suas próprias perguntas" ON public.questions;
CREATE POLICY "Usuários podem deletar suas próprias perguntas"
    ON public.questions FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);

-- Políticas para comentários
DROP POLICY IF EXISTS "Comentários visíveis para todos" ON public.questions_comments;
CREATE POLICY "Comentários visíveis para todos"
    ON public.questions_comments FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Usuários autenticados podem comentar" ON public.questions_comments;
CREATE POLICY "Usuários autenticados podem comentar"
    ON public.questions_comments FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem editar seus próprios comentários" ON public.questions_comments;
CREATE POLICY "Usuários podem editar seus próprios comentários"
    ON public.questions_comments FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem deletar seus próprios comentários" ON public.questions_comments;
CREATE POLICY "Usuários podem deletar seus próprios comentários"
    ON public.questions_comments FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Políticas para likes
DROP POLICY IF EXISTS "Likes visíveis para todos" ON public.questions_likes;
CREATE POLICY "Likes visíveis para todos"
    ON public.questions_likes FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Usuários autenticados podem dar like" ON public.questions_likes;
CREATE POLICY "Usuários autenticados podem dar like"
    ON public.questions_likes FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem remover seus próprios likes" ON public.questions_likes;
CREATE POLICY "Usuários podem remover seus próprios likes"
    ON public.questions_likes FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Índices
CREATE INDEX IF NOT EXISTS idx_questions_created_by ON public.questions(created_by);
CREATE INDEX IF NOT EXISTS idx_questions_theme_id ON public.questions(theme_id);
CREATE INDEX IF NOT EXISTS idx_questions_country_id ON public.questions(country_id);
CREATE INDEX IF NOT EXISTS idx_questions_comments_question_id ON public.questions_comments(question_id);
CREATE INDEX IF NOT EXISTS idx_questions_comments_user_id ON public.questions_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_likes_question_id ON public.questions_likes(question_id);
CREATE INDEX IF NOT EXISTS idx_questions_likes_user_id ON public.questions_likes(user_id);

-- Grants
GRANT ALL ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role;
GRANT ALL ON public.questions_comments TO authenticated;
GRANT ALL ON public.questions_comments TO service_role;
GRANT ALL ON public.questions_likes TO authenticated;
GRANT ALL ON public.questions_likes TO service_role; 