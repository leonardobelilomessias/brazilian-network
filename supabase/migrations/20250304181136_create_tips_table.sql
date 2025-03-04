CREATE TABLE public.tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL CHECK (LENGTH(title) >= 5), -- Título obrigatório
    content TEXT NOT NULL CHECK (LENGTH(content) > 10), -- Conteúdo da dica
    created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    theme_id UUID NOT NULL REFERENCES public.themes(id) ON DELETE RESTRICT,
    country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE RESTRICT, -- FK para países
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    image_url TEXT, -- URL opcional de uma imagem relacionada à dica
    likes_count INT DEFAULT 0, -- Contador de curtidas
    created_at TIMESTAMP DEFAULT now()
);