import { eq } from "drizzle-orm";
import { UserTable } from "~/drizzle/schema";
import { db } from "~/server/sqlite-service";

export default defineEventHandler(async (event) => {
	try {
		const userId = event.context.params?.id as string;
		const user = await db
			.select()
			.from(UserTable)
			.where(eq(UserTable.id, Number.parseInt(userId)))
			.get();
		return { user: user };
	} catch (e) {
		console.log(e);
		throw createError({
			message: "Failed to get users",
			status: 500,
		});
	}
});
