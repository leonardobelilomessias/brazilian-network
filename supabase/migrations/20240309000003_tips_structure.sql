-- Criar tabela de dicas
CREATE TABLE public.tips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    theme_id UUID REFERENCES public.themes(id) ON DELETE SET NULL,
    country_id UUID REFERENCES public.countries(id) ON DELETE SET NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela de likes em dicas
CREATE TABLE public.tips_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tip_id UUID NOT NULL REFERENCES public.tips(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tip_id, user_id)
);

-- Criar tabela de comentários em dicas
CREATE TABLE public.tips_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tip_id UUID NOT NULL REFERENCES public.tips(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers
CREATE TRIGGER update_tips_updated_at
    BEFORE UPDATE ON public.tips
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tips_comments_updated_at
    BEFORE UPDATE ON public.tips_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tips_comments ENABLE ROW LEVEL SECURITY;

-- Políticas para tips
CREATE POLICY "Todos podem ver dicas"
    ON public.tips FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem criar dicas"
    ON public.tips FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Usuários podem editar suas próprias dicas"
    ON public.tips FOR UPDATE
    TO authenticated
    USING (auth.uid() = created_by);

CREATE POLICY "Usuários podem deletar suas próprias dicas"
    ON public.tips FOR DELETE
    TO authenticated
    USING (auth.uid() = created_by);

-- Políticas para likes
CREATE POLICY "Todos podem ver likes"
    ON public.tips_likes FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem dar like"
    ON public.tips_likes FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem remover seus próprios likes"
    ON public.tips_likes FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Políticas para comentários
CREATE POLICY "Todos podem ver comentários"
    ON public.tips_comments FOR SELECT
    USING (true);

CREATE POLICY "Usuários autenticados podem comentar"
    ON public.tips_comments FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar seus próprios comentários"
    ON public.tips_comments FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios comentários"
    ON public.tips_comments FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id); 