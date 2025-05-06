-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 06 2025 г., 09:08
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `registration`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `interests` set('sport','music','books') DEFAULT NULL,
  `country` enum('ru','by','kz') DEFAULT NULL,
  `about` text DEFAULT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `gender`, `interests`, `country`, `about`, `registration_date`) VALUES
(1, 'Павел', '$2b$10$SlPVSfjYb0aY0YaXKGlJAeTQJrWxKVS4uUiyMeiH9FY92.EohVQuS', 'dasha.sirenko2007@gmail.com', 'male', 'sport,music', 'by', 'asd', '2025-05-05 10:52:21'),
(3, 'Сиренко Дарья', '$2b$10$xzYs5bvwQG8upFk7wFg04OxZE0P6Eeh9JZQCjZH8gCxaooSsa8Xcm', 'dashqwa.sirenko2007@gmail.com', 'male', 'sport,music', 'ru', 'fcvgbh', '2025-05-05 10:59:03'),
(4, 'Сиренко Дарья Евгеньевна', '$2b$10$M7XGbkuclpl4C.XnTWrXvuzdFUnikrVnX9L9pG8myPRe6haYxzJKy', 'dasfdasdhha.sirenko2007@gmail.com', 'male', 'sport', 'kz', 'fcvgbh', '2025-05-05 11:09:42'),
(5, 'Павел', '$2b$10$jK6VzaDkRhpNAs3IandC9uWeWhV.2iJkmBOZ8JeI/yuF3DmACxz6.', 'dashsada.sirenko2007@gmail.com', 'male', 'music', 'by', 'fcvgbh', '2025-05-05 11:10:11'),
(6, 'Павел', '$2b$10$OPD8sB/HMkuJEbJy9rbVy.s.B7YjrOKvUfQWQRmqbjTCs8FML3D4y', 'dashseqwada.sirenko2007@gmail.com', 'female', '', 'ru', 'eqw', '2025-05-05 11:13:38'),
(7, 'Павел', '$2b$10$x6JAP27xAzspBQAmgtGAn.WQeNtyr56k.f.h5mQGeWPixVfNUSl.W', 'dashsgfqwada.sirenko2007@gmail.com', 'male', 'music', 'ru', 'ds', '2025-05-05 11:20:34'),
(8, 'ыва', '$2b$10$kw/BkdQpT.QNkM/Xz38Ccu..mXXz.SwfqnGlbDWw8/FecFo6yhQCG', 'ddsasha.sirenko2007@gmail.com', 'male', 'sport', 'ru', 'ds', '2025-05-05 11:48:44'),
(9, 'sad', '$2b$10$3RLMhtyXUnyXrYV/G9uY6u2QrJpCPYospkBFOkJu.nXVcH8QzLhYG', 'ddsasha.sirsdenko2007@gmail.com', 'male', 'sport', 'ru', 'sd', '2025-05-05 11:50:19'),
(10, 'sad', '$2b$10$sjAGkYGAA6RaC0C7frn7GOJ3tAwW.n8fQbQtek7mjUAoGmmvCB1vi', 'ddsa12sha.sirsdenko2007@gmail.com', 'male', 'sport', 'ru', 'eqw', '2025-05-05 11:52:41');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
