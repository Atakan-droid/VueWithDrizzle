import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const UserTable = sqliteTable("users", {
	id: integer("id").primaryKey(),
	name: text("name"),
	email: text("email"),
	password: text("password"),
});
