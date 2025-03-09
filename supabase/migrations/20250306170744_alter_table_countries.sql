-- Remover a restrição de unicidade na coluna 'name'
ALTER TABLE public.countries
DROP CONSTRAINT countries_name_key;
