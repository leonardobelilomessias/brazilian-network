-- Criando a tabela de curtidas separada
CREATE TABLE public.tips_likes (
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    tip_id UUID NOT NULL REFERENCES public.tips(id) ON DELETE CASCADE,
    liked_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (user_id, tip_id) -- Garante que um usuário só pode curtir uma vez
);