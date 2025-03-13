CREATE TABLE public.themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL CHECK (LENGTH(name) >= 3),
    created_at TIMESTAMP DEFAULT now()
);
