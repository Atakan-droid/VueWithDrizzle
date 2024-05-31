<script setup>
import "dotenv/config"
import { db } from "../src/drizzle/db"
import { UserPreferencesTable, UserTable } from "../src/drizzle/schema";
import { eq } from "drizzle-orm";

async function fetchUsers() {
    const users = await db.select(UserTable).all();
    console.log(users);
}

async function addUser() {
    const user = await db.insert(UserTable)
        .values({
            name: "Mock User",
            email: "Mock User Email",
        }).returning({
            id: UserTable.id
        });

    console.log(user)
}

async function getUserByEmail(email) {
    const user = await db.query.UserTable
        .findMany({
            with: {
                preferences: true,
                posts: true
            },
            offset: 0,
            where: {
                email: email
            }
        });

    console.log(user);
}
async function updateUser(userid) {
    const user = await db.update(UserTable)
        .set({
            name: "Updated Name"
        })
        .where(eq(UserTable.id, userid));
}
async function selectUser() {
    const userPreferences = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, 1))
        .leftJoin(UserPreferencesTable, eq(UserTable.id, UserPreferencesTable.userId));
    console.log(userPreferences);
}
</script>

<template>
    <div>
        <h1>Hello World</h1>
        <button @click="fetchUsers">Fetch Users</button>
        <button @click="addUser">Add User (Adds Mock User)</button>
    </div>
</template>