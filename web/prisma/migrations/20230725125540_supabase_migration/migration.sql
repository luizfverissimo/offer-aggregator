-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "urlOffer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "offerPrice" INTEGER NOT NULL,
    "normalPrice" INTEGER NOT NULL,
    "offerText" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAtDb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coupon" TEXT NOT NULL DEFAULT 'SEM',
    "affiliateId" INTEGER NOT NULL DEFAULT 4,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "createdAtDb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferSuggestion" (
    "id" SERIAL NOT NULL,
    "offerLink" TEXT NOT NULL,
    "createdAtDb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "OfferSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateLink" (
    "id" SERIAL NOT NULL,
    "store" TEXT NOT NULL,
    "affiliateLink" TEXT NOT NULL,

    CONSTRAINT "AffiliateLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "AffiliateLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
