-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SMSToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "SMSToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SMSToken" ("created_at", "id", "token", "updated_at", "userId") SELECT "created_at", "id", "token", "updated_at", "userId" FROM "SMSToken";
DROP TABLE "SMSToken";
ALTER TABLE "new_SMSToken" RENAME TO "SMSToken";
CREATE UNIQUE INDEX "SMSToken_token_key" ON "SMSToken"("token");
CREATE TABLE "new_Recycle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "photo" TEXT NOT NULL,
    "address" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Recycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Recycle" ("address", "created_at", "description", "id", "photo", "price", "title", "updated_at", "userId", "views") SELECT "address", "created_at", "description", "id", "photo", "price", "title", "updated_at", "userId", "views" FROM "Recycle";
DROP TABLE "Recycle";
ALTER TABLE "new_Recycle" RENAME TO "Recycle";
CREATE TABLE "new_Like" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "recycleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "recycleId"),
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_recycleId_fkey" FOREIGN KEY ("recycleId") REFERENCES "Recycle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("created_at", "recycleId", "updated_at", "userId") SELECT "created_at", "recycleId", "updated_at", "userId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_key_check("SMSToken");
PRAGMA foreign_key_check("Recycle");
PRAGMA foreign_key_check("Like");
PRAGMA foreign_keys=ON;
