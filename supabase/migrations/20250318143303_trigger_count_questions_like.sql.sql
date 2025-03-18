-- Função para atualizar o contador de likes
CREATE OR REPLACE FUNCTION update_questions_likes_count() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE questions SET likes_count = likes_count + 1 WHERE id = NEW.question_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE questions SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.question_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Verificar se o trigger já existe antes de criar
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_questions_likes') THEN
        CREATE TRIGGER trigger_update_questions_likes
        AFTER INSERT OR DELETE ON public.questions_likes
        FOR EACH ROW EXECUTE FUNCTION update_questions_likes_count();
    END IF;
END$$;