-- CreateTable
CREATE TABLE "diagnostic_tag" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "tag_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnostic_tag_pkey" PRIMARY KEY ("id")
);
