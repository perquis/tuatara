-- CreateTable
CREATE TABLE "Installment" (
    "id" TEXT NOT NULL,
    "monthlyPayment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "remainingLoanBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferenceRate" (
    "id" TEXT NOT NULL,
    "referenceRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferenceRate_pkey" PRIMARY KEY ("id")
);
