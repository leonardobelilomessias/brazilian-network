-- Criar tabela de temas
CREATE TABLE public.themes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar tabela de países
CREATE TABLE public.countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    code TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS para themes e countries
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver temas"
    ON public.themes FOR SELECT
    USING (true);

CREATE POLICY "Todos podem ver países"
    ON public.countries FOR SELECT
    USING (true); 