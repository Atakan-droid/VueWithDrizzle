import { UserTable } from "~/drizzle/schema";
import { db } from "../sqlite-service";

export default defineEventHandler(async (event) => {
	try {
		const users = await db.select().from(UserTable).all();
		return { users: users };
	} catch (e) {
		console.log(e);
		throw createError({
			message: "Failed to get users",
			status: 500,
		});
	}
});
