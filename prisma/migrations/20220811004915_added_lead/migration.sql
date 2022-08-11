/*
  Warnings:

  - Added the required column `leadId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "projectKey" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    CONSTRAINT "Project_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "name", "projectKey", "updatedAt", "uri") SELECT "createdAt", "description", "id", "name", "projectKey", "updatedAt", "uri" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_projectKey_key" ON "Project"("projectKey");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
