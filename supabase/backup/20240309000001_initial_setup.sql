-- Criar tabela de usuários
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    user_name TEXT,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    origem TEXT,
    current_in TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS para users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver todos os perfis"
    ON public.users FOR SELECT
    USING (true);

CREATE POLICY "Usuários podem editar próprio perfil"
    ON public.users FOR UPDATE
    USING (auth.uid() = id); 