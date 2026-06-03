import db from "#db/client";

import { createFile } from "./queries/files";
import { createFolder } from "./queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seedFolders() {
  for (let i = 1; i <= 3; i++) {
    const folder = await createFolder("Folder " + i);
    for (let j = 1; j <= 5; j++) {
      await createFile(
        "File " + j,
        Math.floor(Math.random() * 1000),
        folder.id,
      );
    }
  }
}
