-- AlterTable
ALTER TABLE `Consulta` ADD COLUMN `csvCompleto` JSON NULL,
    ADD COLUMN `leilao` JSON NULL,
    ADD COLUMN `multasPrf` JSON NULL,
    ADD COLUMN `multasResumo` JSON NULL,
    ADD COLUMN `rouboFurto` JSON NULL;
