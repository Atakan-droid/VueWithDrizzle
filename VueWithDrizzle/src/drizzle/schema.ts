import { relations } from "drizzle-orm";
import {
	pgTable,
	uuid,
	varchar,
	integer,
	pgEnum,
	unique,
	index,
	boolean,
	real,
	timestamp,
	primaryKey,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("user_role", ["ADMIN", "USER", "BASIC"]);
export const UserTable = pgTable(
	"users",
	{
		id: uuid("id").primaryKey(),
		name: varchar("name").notNull(),
		email: varchar("email", { length: 255 }).notNull(),
		password: varchar("password").notNull(),
		age: integer("age").notNull().$type<12 | 100>(),
		createAt: varchar("create_at").notNull().default("now()"),
		updateAt: varchar("update_at").notNull().default("now()"),
		role: UserRole("userRole").default("BASIC").notNull(),
	},
	(table) => {
		return {
			unique: {
				uniqueEmail: unique("email").on(table.email),
			},
			index: {
				indexName: index("email").on(table.email),
			},
		};
	},
); // Add an empty object as the second argument

export const UserPreferencesTable = pgTable("user_preferences", {
	id: uuid("id").primaryKey(),
	emailUpdated: boolean("email_updated").notNull().default(false),
	userId: uuid("user_id")
		.references(() => UserTable.id)
		.notNull(),
});

export const PostTable = pgTable("posts", {
	id: uuid("id").primaryKey(),
	title: varchar("title").notNull(),
	content: varchar("content").notNull(),
	averateRating: real("average_rating").notNull().default(0),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow(),
	authorId: uuid("author_id")
		.references(() => UserTable.id)
		.notNull(),
	published: boolean("published").notNull().default(false),
});

export const CategoryTable = pgTable("categories", {
	id: uuid("id").primaryKey(),
	name: varchar("name").notNull(),
});

// Many-to-many relationship between Post and Category
export const PstCategoryTable = pgTable(
	"postCategory",
	{
		postId: uuid("post_id")
			.references(() => PostTable.id)
			.notNull(),
		categoryId: uuid("category_id")
			.references(() => CategoryTable.id)
			.notNull(),
	},
	(table) => {
		return {
			//composite primary key
			pk: primaryKey({ columns: [table.postId, table.categoryId] }),
		};
	},
);

//Relations
export const UserTableRelations = relations(UserTable, ({ one, many }) => {
	return {
		preferences: one(UserPreferencesTable),
		posts: many(PostTable),
	};
});
