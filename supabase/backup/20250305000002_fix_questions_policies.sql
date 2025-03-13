-- Remover políticas existentes (caso existam)
DROP POLICY IF EXISTS "Perguntas visíveis para todos" ON public.questions;
DROP POLICY IF EXISTS "Usuários autenticados podem criar perguntas" ON public.questions;
DROP POLICY IF EXISTS "Usuários podem editar suas próprias perguntas" ON public.questions;
DROP POLICY IF EXISTS "Usuários podem deletar suas próprias perguntas" ON public.questions;

-- Garantir que RLS está habilitado
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura para todos
CREATE POLICY "Perguntas visíveis para todos"
ON public.questions
FOR SELECT
USING (true);

-- Criar política para permitir inserção por usuários autenticados
CREATE POLICY "Usuários autenticados podem criar perguntas"
ON public.questions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Criar política para permitir atualização por usuários autenticados
CREATE POLICY "Usuários podem editar suas próprias perguntas"
ON public.questions
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

-- Criar política para permitir deleção por usuários autenticados
CREATE POLICY "Usuários podem deletar suas próprias perguntas"
ON public.questions
FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

-- Garantir que o serviço tem acesso à tabela
GRANT ALL ON public.questions TO authenticated;
GRANT ALL ON public.questions TO service_role; 