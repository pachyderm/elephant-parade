/*
  Warnings:

  - Added the required column `accountExecutiveId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arr` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEngineerId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerSince` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextRenewalDate` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AccountExecutive" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "AccountExecutive_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CustomerEngineer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "CustomerEngineer_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT NOT NULL,
    "accountExecutiveId" TEXT NOT NULL,
    "customerSince" DATETIME NOT NULL,
    "nextRenewalDate" DATETIME NOT NULL,
    "arr" REAL NOT NULL,
    "customerEngineerId" TEXT NOT NULL,
    CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Customer_accountExecutiveId_fkey" FOREIGN KEY ("accountExecutiveId") REFERENCES "AccountExecutive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Customer_customerEngineerId_fkey" FOREIGN KEY ("customerEngineerId") REFERENCES "CustomerEngineer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("companyId", "createdAt", "id", "updatedAt") SELECT "companyId", "createdAt", "id", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_companyId_key" ON "Customer"("companyId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
