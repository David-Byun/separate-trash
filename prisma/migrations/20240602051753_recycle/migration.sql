-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recycle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "address" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Recycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recycle" ("address", "created_at", "description", "id", "photo", "price", "title", "updated_at", "userId") SELECT "address", "created_at", "description", "id", "photo", "price", "title", "updated_at", "userId" FROM "Recycle";
DROP TABLE "Recycle";
ALTER TABLE "new_Recycle" RENAME TO "Recycle";
PRAGMA foreign_key_check("Recycle");
PRAGMA foreign_keys=ON;
