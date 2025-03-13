-- Primeiro, verificamos se a constraint existe e a removemos
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'tips_created_by_fkey'
        AND table_schema = 'public'
        AND table_name = 'tips'
    ) THEN
        ALTER TABLE public.tips DROP CONSTRAINT tips_created_by_fkey;
    END IF;
END $$;

-- Agora adicionamos a nova constraint referenciando profiles
ALTER TABLE public.tips
ADD CONSTRAINT tips_created_by_fkey
FOREIGN KEY (created_by)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- Fazemos o mesmo para a tabela questions
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'questions_created_by_fkey'
        AND table_schema = 'public'
        AND table_name = 'questions'
    ) THEN
        ALTER TABLE public.questions DROP CONSTRAINT questions_created_by_fkey;
    END IF;
END $$;

ALTER TABLE public.questions
ADD CONSTRAINT questions_created_by_fkey
FOREIGN KEY (created_by)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- Também ajustamos a tabela tips_comments
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'tips_comments_user_id_fkey'
        AND table_schema = 'public'
        AND table_name = 'tips_comments'
    ) THEN
        ALTER TABLE public.tips_comments DROP CONSTRAINT tips_comments_user_id_fkey;
    END IF;
END $$;

ALTER TABLE public.tips_comments
ADD CONSTRAINT tips_comments_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- E a tabela tips_likes
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'tips_likes_user_id_fkey'
        AND table_schema = 'public'
        AND table_name = 'tips_likes'
    ) THEN
        ALTER TABLE public.tips_likes DROP CONSTRAINT tips_likes_user_id_fkey;
    END IF;
END $$;

ALTER TABLE public.tips_likes
ADD CONSTRAINT tips_likes_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- Ajustamos também questions_comments
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'questions_comments_user_id_fkey'
        AND table_schema = 'public'
        AND table_name = 'questions_comments'
    ) THEN
        ALTER TABLE public.questions_comments DROP CONSTRAINT questions_comments_user_id_fkey;
    END IF;
END $$;

ALTER TABLE public.questions_comments
ADD CONSTRAINT questions_comments_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- E finalmente questions_likes
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'questions_likes_user_id_fkey'
        AND table_schema = 'public'
        AND table_name = 'questions_likes'
    ) THEN
        ALTER TABLE public.questions_likes DROP CONSTRAINT questions_likes_user_id_fkey;
    END IF;
END $$;

ALTER TABLE public.questions_likes
ADD CONSTRAINT questions_likes_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE; 