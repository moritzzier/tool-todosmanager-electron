USE tool_todosmanager_electron;

CREATE PROCEDURE IF NOT EXISTS `mitarbeiter_entfernen`(
	IN `_id` INT
)
LANGUAGE SQL
DETERMINISTIC
MODIFIES SQL DATA
SQL SECURITY DEFINER

BEGIN
	DELETE FROM todos_mitarbeiter WHERE mitarbeiter_id = _id;
	DELETE FROM mitarbeiter WHERE id = _id;
END;