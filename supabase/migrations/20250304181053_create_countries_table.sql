CREATE TABLE public.countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL CHECK (LENGTH(name) >= 3),
    code TEXT UNIQUE NOT NULL CHECK (LENGTH(code) = 2), -- Código ISO-3166 (ex: BR, US, PT)
    created_at TIMESTAMP DEFAULT now()
);