-- Criação da migration para adicionar status e username na tabela users

ALTER TABLE public.users
ADD COLUMN status text DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'banido'));

ALTER TABLE public.users
ADD COLUMN username text UNIQUE NOT NULL;
