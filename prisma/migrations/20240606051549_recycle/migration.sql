/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `Like` table. All the data in the column will be lost.
  - Added the required column `recycleId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "Recycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recycle" ("address", "created_at", "description", "id", "photo", "price", "title", "updated_at", "userId") SELECT "address", "created_at", "description", "id", "photo", "price", "title", "updated_at", "userId" FROM "Recycle";
DROP TABLE "Recycle";
ALTER TABLE "new_Recycle" RENAME TO "Recycle";
CREATE TABLE "new_Like" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "recycleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "recycleId"),
    CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_recycleId_fkey" FOREIGN KEY ("recycleId") REFERENCES "Recycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("created_at", "updated_at", "userId") SELECT "created_at", "updated_at", "userId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_key_check("Recycle");
PRAGMA foreign_key_check("Like");
PRAGMA foreign_keys=ON;
