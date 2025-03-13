-- Populando a tabela de temas
INSERT INTO public.themes (id, name) VALUES
  (gen_random_uuid(), 'Trabalho'),
  (gen_random_uuid(), 'Documentação'),
  (gen_random_uuid(), 'Moradia'),
  (gen_random_uuid(), 'Saúde'),
  (gen_random_uuid(), 'Educação');

-- Populando a tabela de países
INSERT INTO public.countries (id, name, code) VALUES
  (gen_random_uuid(), 'Brasil', 'BR'),
  (gen_random_uuid(), 'Estados Unidos', 'US'),
  (gen_random_uuid(), 'Portugal', 'PT'),
  (gen_random_uuid(), 'Canadá', 'CA'),
  (gen_random_uuid(), 'Alemanha', 'DE');

-- Populando a tabela de usuários
INSERT INTO public.users (id, name, email,bio, origem,current_in, user_name ) VALUES
  ('8e11389e-4b20-4389-904a-a3bcc4966015', 'João Silva', 'joao@email.com', 'estou aqui para ajudar','Belo Horizonte, Minas Gerais - Brasil','Watfort, Londres -Ingraterra','joao123'),
  ('6e8c57d4-c79d-47cb-8bd0-2ac67a68454f', 'Maria Oliveira', 'maria@email.com', 'Vamos construir uma bela comunidade','Grajau, São Paulo - Brasil', 'Algarve, Porto -Portugal','maria123'),
  ('55be19eb-79f9-412f-9fd6-7f58ee5bd47e', 'Carlos Souza', 'carlos@email.com', 'Europa é do Brazil','Bumenal, Santa Catarina  - Brasil', 'Robuelo, Madri -Espanha','carlos123');

-- Populando a tabela de dicas
INSERT INTO public.tips (id, title, content, created_by, theme_id, country_id, status, image_url, likes_count, created_at) VALUES
  (gen_random_uuid(), 'Dica para conseguir trabalho remoto', 'Aqui estão algumas dicas para encontrar trabalho remoto no Brasil.', 
   '8e11389e-4b20-4389-904a-a3bcc4966015', 
   (SELECT id FROM public.themes WHERE name = 'Trabalho'), 
   (SELECT id FROM public.countries WHERE name = 'Brasil'), -- Atualizado para country_id
   'approved', NULL, 0, now()),

  (gen_random_uuid(), 'Como validar documentos em Portugal', 'Se você está imigrando para Portugal, aqui estão os passos para validar seus documentos.', 
   '6e8c57d4-c79d-47cb-8bd0-2ac67a68454f', 
   (SELECT id FROM public.themes WHERE name = 'Documentação'), 
   (SELECT id FROM public.countries WHERE name = 'Portugal'), -- Atualizado para country_id
   'approved', NULL, 0, now());

-- Populando a tabela de likes
-- Populando a tabela de curtidas
INSERT INTO public.tips_likes (user_id, tip_id, liked_at) VALUES
  ('55be19eb-79f9-412f-9fd6-7f58ee5bd47e', 
   (SELECT id FROM public.tips ORDER BY random() LIMIT 1), now()),
  
  ('6e8c57d4-c79d-47cb-8bd0-2ac67a68454f', 
   (SELECT id FROM public.tips ORDER BY random() LIMIT 1), now());
