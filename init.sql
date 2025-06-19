-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 04:51:27
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

CREATE TABLE `consultas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_mascota` bigint(20) UNSIGNED NOT NULL,
  `motivo` text DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consultas`
--

INSERT INTO `consultas` (`id`, `id_mascota`, `motivo`, `notas`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 1, 'Vacunación anual', 'Vacuna antirrábica aplicada', '2025-06-18 21:04:18', '2025-06-18 21:04:18'),
(2, 1, 'Diarrea leve', 'Indigestión. Dieta blanda por 3 días', '2025-06-18 21:04:18', '2025-06-18 21:13:01'),
(3, 2, 'Revisión general', 'No se requirió tratamiento', '2025-06-18 21:04:18', '2025-06-18 21:04:18'),
(4, 2, 'Vómitos ocasionales', 'Posible gastritis. Omeprazol 5mg durante 5 días', '2025-06-18 21:04:18', '2025-06-18 21:11:41'),
(5, 3, 'Tos persistente', 'Traqueítis. Antibiótico por 7 días', '2025-06-18 21:04:18', '2025-06-18 21:12:10'),
(6, 3, 'Revisión post-tratamiento', 'Alta médica', '2025-06-18 21:04:18', '2025-06-18 21:04:18'),
(7, 4, 'Desparasitación', 'Antiparasitario oral', '2025-06-18 21:04:18', '2025-06-18 21:04:18'),
(8, 4, 'Esterilización', 'Cirugía exitosa. Antibiótico y reposo', '2025-06-18 21:04:18', '2025-06-18 21:12:27'),
(9, 5, 'Cojea pata trasera', 'Esguince leve. Reposo y antiinflamatorio', '2025-06-18 21:04:18', '2025-06-18 21:12:38'),
(10, 5, 'Control general', 'Recomendado ejercicio moderado', '2025-06-18 21:04:18', '2025-06-18 21:04:18'),
(11, 7, 'Control de rutina', 'Sin observaciones.', '2025-06-18 21:27:01', '2025-06-18 21:27:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `duenos`
--

CREATE TABLE `duenos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `inactivo` tinyint(1) DEFAULT 0,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `duenos`
--

INSERT INTO `duenos` (`id`, `nombre`, `apellido`, `telefono`, `direccion`, `email`, `inactivo`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Laura', 'Pérez', '1134567890', 'Av. Siempre Viva 123', 'laura.perez@email.com', 0, '2025-06-17 04:15:41', '2025-06-17 04:15:41'),
(2, 'Carlos', 'Gómez', '1145678901', 'Calle Falsa 456', 'carlos.gomez@email.com', 0, '2025-06-17 04:15:41', '2025-06-17 04:15:41'),
(3, 'María', 'López', '1156789012', 'Pasaje Luna 789', 'maria.lopez@email.com', 0, '2025-06-17 04:15:41', '2025-06-17 04:15:41'),
(4, 'Jorge', 'Martínez', '1167890123', 'Ruta 22 km 34', 'jorge.martinez@email.com', 0, '2025-06-17 04:15:41', '2025-06-17 04:42:23'),
(5, 'Ana', 'Rodríguez', '1178901234', 'Barrio Jardín 101', 'ana.rodriguez@email.com', 0, '2025-06-17 04:15:41', '2025-06-17 04:15:41'),
(7, 'Claudio', 'Masa', '1161195560', 'Manuel Castro 2030', 'cmasa@gmail.com', 0, '2025-06-18 04:52:30', '2025-06-18 04:53:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `especie` varchar(30) NOT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `id_dueno` bigint(20) UNSIGNED NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `inactivo` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `especie`, `raza`, `edad`, `peso`, `id_dueno`, `fecha_creacion`, `fecha_actualizacion`, `inactivo`) VALUES
(1, 'Luna', 'Perro', 'Labrador Retriever', 3, '25.50', 1, '2025-06-16 18:23:06', '2025-06-16 18:23:06', 0),
(2, 'Milo', 'Gato', 'Siames', 2, '4.30', 2, '2025-06-16 18:23:06', '2025-06-16 18:23:06', 0),
(3, 'Toby', 'Perro', 'Bulldog Francés', 5, '12.00', 3, '2025-06-16 18:23:06', '2025-06-16 18:23:06', 0),
(4, 'Nina', 'Gata', 'Mestiza', 1, '3.80', 4, '2025-06-16 18:23:06', '2025-06-17 04:40:39', 0),
(5, 'Simón', 'Perro', 'Golden Retriever', 6, '30.20', 5, '2025-06-16 18:23:06', '2025-06-16 18:23:06', 0),
(6, 'John', 'Perro', 'Mestiza', 5, '10.00', 5, '2025-06-16 18:23:06', '2025-06-16 18:23:06', 0),
(7, 'Gordon', 'Perro', 'Breton', 16, '11.00', 2, '2025-06-16 18:23:06', '2025-06-16 18:23:06', 0),
(10, 'Tito Mugattu', 'Gato', 'Mestizo', 2, '2.70', 3, '2025-06-16 21:39:30', '2025-06-17 00:30:05', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mascota` (`id`,`id_mascota`),
  ADD KEY `id_mascota_2` (`id_mascota`);

--
-- Indices de la tabla `duenos`
--
ALTER TABLE `duenos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mascotas_duenos` (`id_dueno`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `duenos`
--
ALTER TABLE `duenos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD CONSTRAINT `consultas_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `fk_mascotas_duenos` FOREIGN KEY (`id_dueno`) REFERENCES `duenos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_dueno`) REFERENCES `duenos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
