/*
  Warnings:

  - You are about to drop the `TrainingSentence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TrainingSentence";

-- CreateTable
CREATE TABLE "training_sentence" (
    "id" SERIAL NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "sentence" TEXT NOT NULL,
    "recommended_chunking" TEXT NOT NULL,
    "expected_failure_point" TEXT NOT NULL,
    "polysemy" BOOLEAN NOT NULL,
    "word_count" INTEGER NOT NULL,
    "diagnostic_tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_sentence_pkey" PRIMARY KEY ("id")
);
