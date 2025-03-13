-- Criar enum para status das perguntas
CREATE TYPE question_status AS ENUM ('draft', 'published', 'archived');

-- Criar tabela de perguntas
CREATE TABLE public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES public.themes(id) ON DELETE SET NULL,
    country_id UUID REFERENCES public.countries(id) ON DELETE SET NULL,
    status question_status DEFAULT 'published',
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar tabela de comentários das perguntas
CREATE TABLE public.questions_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Criar tabela de likes das perguntas
CREATE TABLE public.questions_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(question_id, user_id)
);

-- Criar índices para melhor performance
CREATE INDEX idx_questions_created_by ON public.questions(created_by);
CREATE INDEX idx_questions_theme_id ON public.questions(theme_id);
CREATE INDEX idx_questions_country_id ON public.questions(country_id);
CREATE INDEX idx_questions_comments_question_id ON public.questions_comments(question_id);
CREATE INDEX idx_questions_comments_user_id ON public.questions_comments(user_id);
CREATE INDEX idx_questions_likes_question_id ON public.questions_likes(question_id);
CREATE INDEX idx_questions_likes_user_id ON public.questions_likes(user_id);

-- Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger nas tabelas
CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_comments_updated_at
    BEFORE UPDATE ON public.questions_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Criar políticas de segurança (RLS)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions_likes ENABLE ROW LEVEL SECURITY;

-- Políticas para perguntas
CREATE POLICY "Perguntas visíveis para todos"
    ON public.questions
    FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem criar perguntas"
    ON public.questions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Usuários podem editar suas próprias perguntas"
    ON public.questions
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by);

CREATE POLICY "Usuários podem deletar suas próprias perguntas"
    ON public.questions
    FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);

-- Políticas para comentários
CREATE POLICY "Comentários visíveis para todos"
    ON public.questions_comments
    FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem comentar"
    ON public.questions_comments
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar seus próprios comentários"
    ON public.questions_comments
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios comentários"
    ON public.questions_comments
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Políticas para likes
CREATE POLICY "Likes visíveis para todos"
    ON public.questions_likes
    FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem dar like"
    ON public.questions_likes
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem remover seus próprios likes"
    ON public.questions_likes
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Função para atualizar contagem de likes
CREATE OR REPLACE FUNCTION update_question_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.questions
        SET likes_count = likes_count + 1
        WHERE id = NEW.question_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.questions
        SET likes_count = likes_count - 1
        WHERE id = OLD.question_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar likes_count
CREATE TRIGGER update_question_likes_count
    AFTER INSERT OR DELETE ON public.questions_likes
    FOR EACH ROW
    EXECUTE FUNCTION update_question_likes_count();

-- Inserir alguns dados de exemplo
INSERT INTO public.questions (title, content, created_by, theme_id, country_id)
SELECT
    'Como conseguir visto de trabalho em Portugal?',
    'Estou planejando me mudar para Portugal e gostaria de saber qual o melhor caminho para conseguir um visto de trabalho...',
    (SELECT id FROM public.users LIMIT 1),
    (SELECT id FROM public.themes WHERE name = 'Documentação' LIMIT 1),
    (SELECT id FROM public.countries WHERE name = 'Portugal' LIMIT 1);

INSERT INTO public.questions (title, content, created_by, theme_id, country_id)
SELECT
    'Qual o custo de vida médio em Dublin?',
    'Recebi uma proposta de trabalho em Dublin e gostaria de saber qual o custo de vida médio para uma pessoa...',
    (SELECT id FROM public.users LIMIT 1),
    (SELECT id FROM public.themes WHERE name = 'Moradia' LIMIT 1),
    (SELECT id FROM public.countries WHERE code = 'IE' LIMIT 1); 