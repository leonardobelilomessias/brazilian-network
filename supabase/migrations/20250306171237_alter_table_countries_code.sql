-- Remover a restrição de unicidade na coluna 'code'
ALTER TABLE public.countries
DROP CONSTRAINT countries_code_key;
