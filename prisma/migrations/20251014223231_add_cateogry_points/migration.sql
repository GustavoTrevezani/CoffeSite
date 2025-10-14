-- CreateTable
CREATE TABLE "categoryPoints" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoryPoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoryPoints_category_key" ON "categoryPoints"("category");
