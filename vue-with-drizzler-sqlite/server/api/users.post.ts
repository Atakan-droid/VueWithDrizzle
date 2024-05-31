import { UserTable } from "~/drizzle/schema";
import { db } from "../sqlite-service";

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const user = await db.insert(UserTable).values(body).run();
		return { user: user };
	} catch (e) {
		console.log(e);
		throw createError({
			message: "Failed to create user",
			status: 404,
		});
	}
});
