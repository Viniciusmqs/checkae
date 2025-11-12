-- CreateTable
CREATE TABLE `Consulta` (
    `id` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `cpfCnpj` VARCHAR(191) NOT NULL,
    `status` ENUM('PROCESSANDO', 'CONCLUIDA', 'ERRO') NOT NULL DEFAULT 'PROCESSANDO',
    `dadosCadastrais` JSON NULL,
    `valorFipe` JSON NULL,
    `resumoDebitos` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Debito` (
    `id` VARCHAR(191) NOT NULL,
    `consultaId` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `anoExercicio` INTEGER NULL,
    `descricao` VARCHAR(191) NULL,
    `valorPrincipal` DECIMAL(12, 2) NULL,
    `jurosMulta` DECIMAL(12, 2) NULL,
    `valorTotal` DECIMAL(12, 2) NULL,
    `orgao` VARCHAR(191) NULL,
    `situacao` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProviderEvento` (
    `id` VARCHAR(191) NOT NULL,
    `consultaId` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `correlationId` VARCHAR(191) NULL,
    `payload` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Debito` ADD CONSTRAINT `Debito_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProviderEvento` ADD CONSTRAINT `ProviderEvento_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
