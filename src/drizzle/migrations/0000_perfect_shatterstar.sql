DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'USER', 'BASIC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar NOT NULL,
	"age" integer NOT NULL,
	"create_at" varchar DEFAULT 'now()' NOT NULL,
	"update_at" varchar DEFAULT 'now()' NOT NULL,
	"userRole" "user_role" DEFAULT 'BASIC' NOT NULL
);
