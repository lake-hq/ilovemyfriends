/*
  Warnings:

  - The primary key for the `CharacterCard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CharacterCard` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CharacterCard" DROP CONSTRAINT "CharacterCard_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CharacterCard_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "bio" SET NOT NULL;
