-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/06/2024 às 20:54
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `n3svside`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `proprietario`
--

CREATE TABLE `proprietario` (
  `cpf` int(11) NOT NULL,
  `nome` varchar(70) DEFAULT NULL,
  `fone` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipo_veiculo`
--

CREATE TABLE `tipo_veiculo` (
  `id_tipo` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tipo_veiculo`
--

INSERT INTO `tipo_veiculo` (`id_tipo`, `tipo`) VALUES
(1, 'popular'),
(2, 'super luxo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculo`
--

CREATE TABLE `veiculo` (
  `id_veic` int(11) NOT NULL,
  `placa` varchar(20) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `preco` double DEFAULT NULL,
  `proprietario` int(11) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `proprietario`
--
ALTER TABLE `proprietario`
  ADD PRIMARY KEY (`cpf`);

--
-- Índices de tabela `tipo_veiculo`
--
ALTER TABLE `tipo_veiculo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Índices de tabela `veiculo`
--
ALTER TABLE `veiculo`
  ADD PRIMARY KEY (`id_veic`),
  ADD KEY `proprietario` (`proprietario`),
  ADD KEY `tipo` (`tipo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tipo_veiculo`
--
ALTER TABLE `tipo_veiculo`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `veiculo`
--
ALTER TABLE `veiculo`
  MODIFY `id_veic` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `veiculo`
--
ALTER TABLE `veiculo`
  ADD CONSTRAINT `veiculo_ibfk_1` FOREIGN KEY (`proprietario`) REFERENCES `proprietario` (`cpf`),
  ADD CONSTRAINT `veiculo_ibfk_2` FOREIGN KEY (`tipo`) REFERENCES `tipo_veiculo` (`id_tipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
