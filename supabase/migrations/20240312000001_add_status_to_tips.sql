-- Verificar se a coluna já existe antes de tentar adicioná-la
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'tips'
        AND column_name = 'status'
    ) THEN
        -- Adicionar coluna status à tabela tips
        ALTER TABLE public.tips 
        ADD COLUMN status TEXT DEFAULT 'published' NOT NULL;

        -- Adicionar comentário explicativo para a coluna
        COMMENT ON COLUMN public.tips.status IS 'Status da dica: draft, published ou archived';
    END IF;
END $$;

-- Também adicionamos um índice para otimizar consultas por status
CREATE INDEX IF NOT EXISTS idx_tips_status ON public.tips(status);

-- Atualizar os registros existentes para ter o status 'published'
UPDATE public.tips
SET status = 'published'
WHERE status IS NULL OR status = ''; 