-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-04-2020 a las 03:31:28
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilahresto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `hora` time NOT NULL DEFAULT current_timestamp(),
  `pago` varchar(60) NOT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `estado`, `hora`, `pago`, `usuario`) VALUES
(1, 'CONFIRMADO', '10:34:23', 'pendiente', 2),
(2, 'NUEVO', '19:55:06', 'pendiente', 3),
(3, 'NUEVO', '22:35:41', 'pendiente', 3),
(4, 'NUEVO', '22:39:31', 'pendiente', 3),
(5, 'NUEVO', '23:51:38', 'pendiente', 1),
(6, 'NUEVO', '16:17:00', 'pendiente', 3),
(7, 'NUEVO', '20:31:14', 'pendiente', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `precio` float NOT NULL,
  `urlimagen` varchar(220) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `urlimagen`) VALUES
(1, 'Hamburguesa con jamón, queso y tomate + papas fritas', 280, 'https://image.freepik.com/foto-gratis/hamburguesa-papas-fritas-tabla-cortar_23-2148273000.jpg'),
(2, 'Pizza especial + Cerveza artesanal', 600, 'https://image.freepik.com/foto-gratis/arreglo-encantador-cena-dia-san-valentin-pizza-forma-corazon-espacio-copia_23-2148392074.jpg'),
(3, 'Papas con salsa a eleccion', 240, 'https://image.freepik.com/foto-gratis/vista-superior-papas-fritas-salsa-tomate_23-2148272963.jpg'),
(4, 'Papas al Verdeo', 240, 'https://image.freepik.com/foto-gratis/tazon-papas-fritas-espacio-copia_23-2148272959.jpg'),
(5, 'Finger de pollo', 280, 'https://image.freepik.com/foto-gratis/bocaditos-crujientes-pollo-palitos-ketcup-sobre-tabla-madera_114579-1416.jpg'),
(6, 'Pizza Muzzarella con Aceitunas y Oregano', 380, 'https://image.freepik.com/foto-gratis/lay-flat-pizza-mesa-madera_23-2148273088.jpg'),
(7, 'Cerveza Artesana Pinta', 180, 'https://image.freepik.com/foto-gratis/vaso-lleno-cerveza-lager_73989-5043.jpg'),
(8, 'CocaCola 1,5L', 130, 'https://image.freepik.com/foto-gratis/vidrio-cola-hielo_1339-6220.jpg'),
(9, 'Lata Cerveza', 160, 'https://image.freepik.com/foto-gratis/lata-cerveza-madera_19-127481.jpg'),
(10, 'Brochetas de barbacoa con carne y verdura', 230, 'https://image.freepik.com/foto-gratis/brochetas-barbacoa-carne-verdura-sobre-pizarra-circular-negra_23-2148206998.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productosxpedidos`
--

CREATE TABLE `productosxpedidos` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productosxpedidos`
--

INSERT INTO `productosxpedidos` (`id`, `id_pedido`, `id_producto`) VALUES
(1, 1, 2),
(2, 1, 5),
(3, 2, 2),
(4, 2, 4),
(5, 3, 2),
(6, 3, 8),
(7, 4, 3),
(8, 4, 9),
(9, 5, 10),
(10, 5, 7),
(11, 6, 9),
(12, 7, 1),
(13, 7, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(40) NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `tel` int(20) NOT NULL,
  `adress` varchar(60) NOT NULL,
  `pass` varchar(150) NOT NULL,
  `usertype` varchar(30) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `fullname`, `email`, `tel`, `adress`, `pass`, `usertype`) VALUES
(1, 'Administrador', 'Gabriel Maselli', 'gmaselli@gmail.com', 159753, 'Mar del Plata', '$2a$10$7qJnIo1JnGyjx7SvdmEb1unL0TRD7bwpzSaC0DZvpOgO6kdBHZIm6', 'admin'),
(2, 'Admin', 'Gabriel Maselli', 'admin@delilahresto.com', 123456, 'Mar del Plata', '$2a$10$cFcN.I6gzsGwW9pTx8B0Z.KzAuRdbwkJOcQ5gSccHC41.I770owiy', 'admin'),
(3, 'username', 'fullname', 'email@email.com', 123456, 'his house', '$2a$10$nhSsDBg4CQFwQYcbb5AzUONxTI5SAHP0QwGWrGEV29pqKek2YIJc2', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productosxpedidos`
--
ALTER TABLE `productosxpedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productosxpedidos`
--
ALTER TABLE `productosxpedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
