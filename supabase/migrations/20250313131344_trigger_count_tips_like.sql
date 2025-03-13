CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tips SET likes_count = likes_count + 1 WHERE id = NEW.tip_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tips SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.tip_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_likes
AFTER INSERT OR DELETE ON tips_likes
FOR EACH ROW EXECUTE FUNCTION update_likes_count();
