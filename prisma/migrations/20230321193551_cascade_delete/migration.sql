-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_tabId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "Tab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
