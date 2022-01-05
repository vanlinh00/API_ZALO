-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2022 at 04:42 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blocks`
--

CREATE TABLE `tbl_blocks` (
  `id` int(11) NOT NULL,
  `id_blockA` int(200) NOT NULL,
  `id_blockB` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_blocks`
--

INSERT INTO `tbl_blocks` (`id`, `id_blockA`, `id_blockB`) VALUES
(13, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat`
--

CREATE TABLE `tbl_chat` (
  `id` int(11) NOT NULL,
  `Id_user_A` int(11) NOT NULL,
  `Id_user_B` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `create_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_chat`
--

INSERT INTO `tbl_chat` (`id`, `Id_user_A`, `Id_user_B`, `content`, `create_date`) VALUES
(1, 1, 2, 'alo hoan', '0000-00-00 00:00:00.000000'),
(2, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(3, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(4, 2, 1, 'f', '0000-00-00 00:00:00.000000'),
(5, 2, 1, 'ho', '0000-00-00 00:00:00.000000'),
(6, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(7, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(8, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(9, 2, 1, 'k', '0000-00-00 00:00:00.000000'),
(10, 2, 1, 'van linh', '0000-00-00 00:00:00.000000'),
(11, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(12, 1, 2, 'duoc chua', '0000-00-00 00:00:00.000000'),
(13, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(14, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(15, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(16, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(17, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(18, 2, 1, 'f', '0000-00-00 00:00:00.000000'),
(19, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(20, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(21, 1, 3, 'hi', '0000-00-00 00:00:00.000000'),
(22, 1, 2, 'd', '0000-00-00 00:00:00.000000'),
(23, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(24, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(25, 1, 2, 'hi', '0000-00-00 00:00:00.000000'),
(26, 1, 2, 'hi', '2021-12-15 04:27:57.350241'),
(27, 1, 3, 'hi', '2021-12-15 04:28:24.164025'),
(28, 1, 2, 'hi', '2021-12-15 04:28:37.463601'),
(29, 1, 6, 'hi', '2021-12-15 04:33:09.396617'),
(30, 1, 2, 'hi', '2021-12-15 04:40:37.470918'),
(31, 1, 3, 'hi', '2021-12-15 04:41:49.643945'),
(32, 1, 2, 'hi', '2021-12-15 04:47:01.558660'),
(33, 1, 3, 'hi', '2021-12-15 04:47:09.030612'),
(34, 1, 2, 'hi', '2021-12-15 04:47:21.113353'),
(35, 2, 1, 'f', '2021-12-15 04:50:08.936478'),
(36, 2, 1, 'f', '2021-12-15 04:50:22.386525'),
(37, 1, 2, 'hi', '2021-12-15 08:14:07.928649'),
(38, 2, 1, 'oi', '2021-12-15 08:31:13.328545'),
(39, 1, 2, 'hi', '2021-12-15 08:31:25.760361'),
(40, 2, 1, 'okok', '2021-12-15 08:31:30.725547'),
(41, 1, 2, 'hi', '2021-12-15 08:34:16.917902'),
(42, 1, 2, 'hi', '2021-12-15 08:51:25.030278'),
(43, 1, 2, 'hi', '2021-12-15 08:54:00.023130'),
(44, 1, 2, 'lam gi day', '2021-12-15 08:54:03.967484'),
(45, 2, 1, 'co lam gi dau', '2021-12-15 08:56:00.021092'),
(46, 1, 2, 'tai sao khong lam gi', '2021-12-15 08:56:31.962461'),
(47, 2, 1, 'ok lam gi day', '2021-12-15 08:56:40.539276'),
(48, 1, 2, 'ukm', '2021-12-15 08:57:08.949985'),
(49, 1, 3, 'alo', '2021-12-15 08:58:34.511384'),
(50, 1, 3, 'alo', '2021-12-15 08:58:43.296052'),
(51, 3, 1, 'goi gi day', '2021-12-15 08:59:52.998650'),
(52, 1, 6, 'alo', '2021-12-15 09:11:27.689887'),
(53, 1, 6, 'hi', '2021-12-15 09:13:42.097839'),
(54, 1, 6, 'hi', '2021-12-15 09:13:48.662762'),
(55, 1, 6, 'd', '2021-12-15 09:17:33.465742'),
(56, 1, 6, 'loi dau', '2021-12-15 09:17:36.960510'),
(57, 1, 3, 'alo', '2021-12-16 03:37:22.913366'),
(58, 1, 2, 'hi', '2021-12-16 03:37:38.526510'),
(59, 2, 1, 'alo', '2021-12-16 03:38:30.914175'),
(60, 1, 2, 'chat nhanh phet', '2021-12-16 03:38:40.556064'),
(61, 1, 2, 'ok', '2021-12-18 06:28:57.343656'),
(62, 2, 1, 'khong co gi', '2021-12-18 06:29:15.924434'),
(63, 1, 6, 'alo a', '2021-12-18 06:52:33.397729'),
(64, 3, 1, 'oi', '2021-12-18 06:56:16.845156'),
(65, 1, 3, 'khong gi', '2021-12-18 06:56:31.610591'),
(66, 2, 1, 'okok', '2021-12-22 10:12:04.830127'),
(67, 3, 1, 'hi', '2021-12-22 10:12:09.469150'),
(68, 2, 1, 'lam gi day', '2021-12-22 10:12:18.150007'),
(69, 3, 1, 'lam gi day', '2021-12-22 10:12:24.306102'),
(70, 1, 6, 'hi', '2021-12-22 15:20:06.165150'),
(71, 1, 6, 'ok bạn', '2021-12-22 15:20:09.387201'),
(72, 1, 6, 'ok b', '2021-12-22 15:20:16.995350'),
(73, 1, 6, 'lam gi', '2021-12-22 15:20:23.718922'),
(74, 1, 6, 'hi', '2021-12-22 15:20:43.959282'),
(75, 1, 6, 'hi', '2021-12-22 15:20:45.851189'),
(76, 1, 6, 'alo', '2021-12-22 15:21:56.507926'),
(77, 1, 6, 'ko', '2021-12-22 15:22:16.828228'),
(78, 1, 6, 'hi', '2021-12-22 15:23:42.298666'),
(79, 1, 6, 'lam gi day', '2021-12-22 15:23:53.829126'),
(80, 1, 6, 'sao lai khong duoc', '2021-12-22 15:24:06.029966'),
(81, 1, 6, 'hi', '2021-12-22 15:25:10.494934'),
(82, 1, 6, 'alo', '2021-12-22 15:25:17.496734'),
(83, 1, 3, 'alo', '2021-12-22 15:27:43.149995'),
(84, 1, 2, 'alo', '2021-12-22 15:27:54.014621'),
(85, 1, 2, 'ok', '2021-12-22 15:27:57.498250'),
(86, 1, 6, 'ok', '2021-12-22 15:28:06.095476'),
(87, 1, 6, 'd', '2021-12-22 15:28:08.851706'),
(88, 2, 4, 'oi', '2021-12-24 16:08:13.269596'),
(89, 2, 4, 'oi', '2021-12-24 16:08:15.102304'),
(90, 2, 4, 'oi', '2021-12-24 16:08:17.741486'),
(91, 1, 2, 'ok', '2021-12-24 16:09:35.142811'),
(92, 2, 1, 'alo', '2021-12-24 16:09:39.503541'),
(93, 2, 4, 'ko nhe chat ngon day', '2021-12-24 16:11:37.988161'),
(94, 4, 2, 'hi', '2021-12-24 16:13:20.613786'),
(95, 4, 2, 'hi', '2021-12-24 16:13:25.896011'),
(96, 2, 4, 'okok', '2021-12-24 16:13:33.080334'),
(97, 1, 2, '', '2021-12-25 15:05:06.469674'),
(98, 1, 2, '', '2021-12-25 15:05:07.182462'),
(99, 1, 2, 'hi', '2021-12-25 15:35:48.519085'),
(100, 1, 2, 'test hoi nhieu roi day', '2021-12-25 15:36:37.149181'),
(101, 1, 2, 'lam gi dau m\n', '2021-12-25 15:48:13.576134'),
(102, 1, 2, 'lam gi d', '2021-12-25 15:49:39.364246'),
(103, 1, 2, 'tai sao khong duoc', '2021-12-25 15:54:48.836868'),
(104, 1, 2, 'd', '2021-12-25 15:55:20.263802'),
(105, 1, 2, 'd', '2021-12-25 15:55:34.079818'),
(106, 1, 2, 'khong con mua thu\n', '2021-12-25 15:58:07.846422'),
(107, 1, 2, 'trang roi ben them', '2021-12-25 15:58:40.557638'),
(108, 1, 2, 'aaaa', '2021-12-25 15:59:08.125644'),
(109, 1, 2, 'duoc chua nhi', '2021-12-25 16:03:10.501681'),
(110, 1, 2, 'hi\n', '2021-12-25 16:11:17.223369'),
(111, 1, 2, 's', '2021-12-25 16:11:43.817586'),
(112, 1, 2, 'ok roi mai moi xong', '2021-12-25 16:11:55.782591'),
(113, 2, 1, 'giao diện đẹp phết đấy', '2021-12-25 16:22:22.430242'),
(114, 1, 2, 'ok rồi chat ngon', '2021-12-25 16:22:33.004079'),
(115, 1, 7, 'làm gì đấy bạn', '2021-12-25 16:30:10.919690'),
(116, 1, 3, 't co lam gi dau', '2021-12-26 01:40:28.792162'),
(117, 1, 2, '', '2021-12-30 13:04:29.654836'),
(118, 1, 7, 'không nói gì à', '2022-01-02 16:13:57.936611'),
(119, 1, 3, 'ok', '2022-01-03 04:16:35.291697');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_codevrify`
--

CREATE TABLE `tbl_codevrify` (
  `id` int(11) NOT NULL,
  `phomenumber` int(11) NOT NULL,
  `code` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_codevrify`
--

INSERT INTO `tbl_codevrify` (`id`, `phomenumber`, `code`) VALUES
(1, 982691474, 0),
(2, 982691472, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_comment`
--

CREATE TABLE `tbl_comment` (
  `id` int(11) NOT NULL,
  `id_user` int(200) NOT NULL,
  `content_cm` varchar(200) NOT NULL,
  `createdate_cm` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_comment`
--

INSERT INTO `tbl_comment` (`id`, `id_user`, `content_cm`, `createdate_cm`) VALUES
(1, 1, 'bài viết rất hay', ''),
(9, 4, 'bài viết rất không hay tối rất thích bài viết', ''),
(10, 4, 'bài viết rất không hay tối rất thích bài viết', ''),
(11, 4, 'bài viết rất không hay tối rất thích bài viết', ''),
(12, 4, 'bài viết hay đấy nhưng tôi không thích nhé bạn', ''),
(13, 4, 'bài viết hay đấy nhưng tôi không thích nhé bạn', ''),
(14, 4, 'bài viết hay đấy nhưng tôi không thích nhé bạn', ''),
(16, 4, 'bài viết hay đấy nhưng tôi không thích nhé bạn', ''),
(17, 4, 'bài viết hay đấy nhưng tôi không thích nhé bạn', ''),
(18, 4, 'bài viết hay đấy nhưng tôi không thích nhé bạn', ''),
(20, 5, 'them  moi 1 comment nhe ah ban', ''),
(21, 5, 'bai viet moi', ''),
(22, 5, 'bai viet moi duoc chưa', ''),
(24, 5, 'test loi comment nay', ''),
(25, 5, 'sua them nhe', ''),
(27, 5, 'toi co binh luon moi 9999999999', ''),
(28, 5, 'toi co binh luon moi 9999999999', ''),
(29, 5, 'toi co binh luon moi 9999999999', ''),
(30, 2, 'bai viet hay day', ''),
(31, 2, 'binh luan hay', ''),
(32, 2, 'bai viet rat ha 2', '1641121412496'),
(33, 2, 'bai viet rat ha 2', '1641121557927'),
(45, 7, 'bai viet rat ', '1641269948991'),
(46, 7, 'bai viet rat ', '1641269956441'),
(50, 7, 'commet cua user 7', '1641271214469');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_conversation`
--

CREATE TABLE `tbl_conversation` (
  `id` int(11) NOT NULL,
  `id_user_A` int(11) NOT NULL,
  `Id_user_B` int(11) NOT NULL,
  `list_id_chat` varchar(20000) NOT NULL,
  `create_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_conversation`
--

INSERT INTO `tbl_conversation` (`id`, `id_user_A`, `Id_user_B`, `list_id_chat`, `create_date`) VALUES
(1, 1, 2, '46,47,48,58,59,60,61,62,66,68,84,85,91,92,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,', '2022-01-04 15:34:29.040366'),
(10, 1, 3, '33,49,50,51,57,64,65,67,69,83,116,119,', '2022-01-03 04:16:35.299798'),
(15, 2, 4, '88,93,94,95,96,', '2021-12-24 16:13:33.090325');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_friend`
--

CREATE TABLE `tbl_friend` (
  `id` int(11) NOT NULL,
  `id_user_a` int(11) NOT NULL,
  `id_user_b` int(11) NOT NULL,
  `date_friend` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_friend`
--

INSERT INTO `tbl_friend` (`id`, `id_user_a`, `id_user_b`, `date_friend`) VALUES
(1, 1, 2, '2021-10-31 03:40:21'),
(2, 1, 3, '2021-10-31 03:40:21'),
(4, 6, 1, '2021-10-31 08:34:33'),
(5, 1, 7, '2021-12-23 10:22:55'),
(6, 4, 2, '2021-12-24 16:07:31'),
(7, 15, 2, '2022-01-04 02:01:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_post`
--

CREATE TABLE `tbl_post` (
  `id` int(11) NOT NULL,
  `id_user` int(5) NOT NULL,
  `content_post` varchar(200) NOT NULL,
  `media` varchar(200) NOT NULL,
  `id_list_user_cm` varchar(2000) NOT NULL,
  `id_list_user_like` varchar(2000) NOT NULL,
  `url_post` varchar(200) NOT NULL,
  `date_create` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_post`
--

INSERT INTO `tbl_post` (`id`, `id_user`, `content_post`, `media`, `id_list_user_cm`, `id_list_user_like`, `url_post`, `date_create`) VALUES
(10, 2, 'bài viêt có id là 1 đã được chỉnh sửa', 'link media', '1,9,10,11,12,13,20,21,22,24,25,', '1,2,3,5,', '2/new url', ''),
(11, 1, 'day la bai veit moi cua van linh rat hay ', 'link media', '14,', '0', '1/new url', ''),
(12, 1, 'cam thay gi do rat la gi do ', 'link media', '16,17,', '2,1,5,', '1/new url', ''),
(13, 1, 'nguoi co id la 1 da them 1 bai viet ve con bo rat hay ', 'link media', '0', '', '1/new url', ''),
(14, 2, 'toi nhin thay một cái gì đó rất là gì toi rat cam sux ki lam ', 'link media', '18,', '2,7,1,', '2/new url', ''),
(15, 2, 'bai viet nay se la bai viet id 15 nhe ', 'link media', '0', '0', '2/new url', ''),
(16, 2, 'bai viet nay se la bai viet id 16 nhe', 'link media', '0', '0', '2/new url', ''),
(17, 2, 'lam on hay like bai viet nay cho toi, bai viet lai thay hay va ham dan, plz toi ', 'link media', '0', '5,', '2/new url', ''),
(18, 2, 'toi phai viet them nhie bai nũa ', 'link media', '0', '0', '2/new url', ''),
(19, 2, 'Máy quay dường như đang chậm lại, ', 'link media', '0', '0', '2/new url', ''),
(20, 2, 'Thầy Nguyễn Văn Tâm - từng dạy Toán trường THCS Chợ Chu cũng là người thầy được ', 'link media', '0', '0', '2/new url', ''),
(21, 8, 'Bài văn xúc động người đọc bởi cảm xúc chân thành từ chính tình cảm của con dành cho người cha tần tảo của mình. ', 'link media', '0', '0', '8/new url', ''),
(22, 8, 'PC-Covid bắt đầu được triển khai tại một số tỉnh thành', 'link media', '0', '0', '8/new url', ''),
(23, 8, 'Facebook bị Anh phạt gần 70 triệu USD trong thương vụ mua Giphy, còn CEO Mark Zuckerberg sắp phải điều trần tại Mỹ và đối mặt kiện tụng. ', 'link media', '0', '0', '8/new url', ''),
(24, 8, 'Oppo tự thiết kế chip', 'link media', '0', '0', '8/new url', ''),
(25, 8, 'Doanh nghiệp Việt giải bài toán đầu tư chăm sóc khách hàng', 'link media', '0', '0', '8/new url', ''),
(26, 8, 'Công ty Facebook sắp đổi tên', 'link media', '0', '0', '8/new url', ''),
(27, 4, 'Jack Ma ra nước ngoài lần đầu sau hơn một năm', 'link media', '0', '0', '4/new url', ''),
(28, 4, 'Facebook \'khai thác\' người dùng thế nào', 'link media', '0', '0', '4/new url', ''),
(29, 4, 'Hacker dùng Tinder \'săn\' nạn nhân Bitcoin', 'link media', '0', '0', '4/new url', ''),
(30, 4, 'id post 30', 'link media', '0', '0', '4/new url', ''),
(32, 4, 'id post new', 'link media', '0', '0', '4/new url', ''),
(33, 4, 'bài viêt có id là 1 đã được chỉnh sửa', 'link media', '0', '0', '4/new url', ''),
(34, 4, 'id post', 'link media', '0', '0', '4/new url', ''),
(36, 5, 'string', 'link media', '0', '0', '/new url5', ''),
(37, 5, 'string', 'link media', '0', '0', '/new url5', ''),
(38, 5, 'string', 'link media', '0', '0', '/new url5', ''),
(39, 5, 'bai viet moi nhe ae', 'link media', '0', '0', '/new url5', ''),
(40, 5, 'trung toi co 1 bai viet moi nhe', 'link media', '45,46,', '0', '/new url5', ''),
(41, 5, 'trung toi co 1 bai viet moi nhe1', 'link media', '0', '0', '/new url5', ''),
(42, 14, 'day la 1 bai viet moi aaaaaaaaaaaaaaaaaaaa', 'link media', '0', '0', '/new url14', ''),
(43, 14, 'day la 1 bai viet moi bbbbbbbbbbbbbb', 'link media', '27,28,', '', '/new url14', '1640356156634'),
(44, 14, 'toi dang edit xong 12333', 'link media', '29,', '0', '/new url14', '1640357559110'),
(46, 15, '', 'E:\\2021_1\\2_Web\\chatrealtime_\\file\\uploads\\image-1641029535932', '0', '0', '/new url164102953600115', '1641029536001'),
(47, 15, 'day bai viet co anh', 'E:\\2021_1\\2_Web\\chatrealtime_\\file\\uploads\\image-1641030840341', '0', '0', '/new url164103084035615', '1641030840356'),
(48, 15, 'day bai viet co anh', 'E:\\2021_1\\2_Web\\chatrealtime_\\file\\uploads\\image-1641044143832', '0', '0', '/new url164104414391115', '1641044143911'),
(49, 15, '', '', '50,', '4,', '/new url164104419272815', '1641044192728'),
(50, 15, '', '', '', '7,4,', '/new url164104428362615', '1641044283626'),
(51, 15, 'mot cai gi do', 'E:\\2021_1\\2_Web\\chatrealtime_\\file\\uploads\\image-1641048269327', '0', '4,', '/new url164104826935815', '1641048269358'),
(59, 21, 'sua bai viet 59', '', '0', '0', '/new url164128054851821', '1641280548518'),
(60, 21, 'bóng đã việt nam thái lan', '', '0', '0', '/new url164131268872021', '1641312688720'),
(61, 21, 'việt nam bóng đã nữ vô địch', '', '0', '0', '/new url164131270602321', '1641312706023'),
(62, 21, 'thái lan và drama bóng đá', '', '0', '0', '/new url164131272036121', '1641312720361');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_report`
--

CREATE TABLE `tbl_report` (
  `id` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `detail` varchar(200) NOT NULL,
  `is_report` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_report`
--

INSERT INTO `tbl_report` (`id`, `id_post`, `id_user`, `detail`, `is_report`) VALUES
(1, 11, 2, 'nhìn ngữa mắt', 0),
(2, 11, 4, 'nhìn ngữa mắt', 0),
(3, 56, 4, 'nhìn ngữa mắt', 0),
(4, 56, 2, 'nhìn ngữa mắt', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_requested_friend`
--

CREATE TABLE `tbl_requested_friend` (
  `id` int(11) NOT NULL,
  `id_user_A` int(11) NOT NULL,
  `id_user_B` int(11) NOT NULL,
  `createdate_requested` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_requested_friend`
--

INSERT INTO `tbl_requested_friend` (`id`, `id_user_A`, `id_user_B`, `createdate_requested`) VALUES
(20, 2, 15, '2022-01-04 16:55:37');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_role`
--

CREATE TABLE `tbl_role` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_role`
--

INSERT INTO `tbl_role` (`id`, `name`) VALUES
(0, 'user'),
(1, 'admin'),
(3, 'superadmin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_search`
--

CREATE TABLE `tbl_search` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `keword` varchar(200) NOT NULL,
  `create_date` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_search`
--

INSERT INTO `tbl_search` (`id`, `id_user`, `keword`, `create_date`) VALUES
(7, 2, 'bài viết', '1641312569190'),
(8, 2, 'ham dan', '1641312603787'),
(9, 2, 'bóng đá', '1641312736069'),
(10, 2, 'bóng việt nam đá', '1641312748294'),
(11, 2, 'bóng', '1641312779141'),
(13, 2, 'việt nam', '1641312817346');

-- --------------------------------------------------------

--
-- Table structure for table `tb_block_diary`
--

CREATE TABLE `tb_block_diary` (
  `id` int(11) NOT NULL,
  `id_blockA` int(11) NOT NULL,
  `id_blockB` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(50) NOT NULL,
  `pass_user` varchar(15) NOT NULL,
  `sdt_user` varchar(10) NOT NULL,
  `linkavatar_user` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `set_request_friend` varchar(300) NOT NULL,
  `get_requested_friend` varchar(300) NOT NULL,
  `linkuser` varchar(200) NOT NULL,
  `online` int(2) NOT NULL,
  `isactive` int(2) NOT NULL,
  `role` int(11) NOT NULL,
  `described` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `lastlogin` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `name_user`, `pass_user`, `sdt_user`, `linkavatar_user`, `token`, `set_request_friend`, `get_requested_friend`, `linkuser`, `online`, `isactive`, `role`, `described`, `address`, `lastlogin`) VALUES
(1, 'Nguyễn Văn Linh', 'vanvan', '0982691474', '/link/anh/hamdan', 'token09826914741641118583069', '', '', '', 0, 0, 1, 'thật thà, nghiêm túc', 'Tân Hưng - Sóc Sơn - Hà Nội', '1641118583069'),
(2, 'hoàn lại văn', 'vanhoan', '0982691470', 'link/anh', 'token09826914701641117164614', '', '', '', 0, 0, 0, 'a b c', 'Ninh Bình - Việt Nam', '1641117164614'),
(3, 'Trần Nguyên Hãn', 'vandong', '0982691471', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ2YW5kb25nIiwic3ViIjoiMDk4MjY5MTQ3MSIsImlhdCI6MTYzNDgzMjQxMDMwNSwiZXhwIjpudWxsfQ.K6cumfVo9JRVxS3424fYL1zLOWBZV72grueBPrjyPa0', '', '', '', 0, 0, 0, '', '', ''),
(4, 'New User ', 'vandond', '0982691473', '', 'token09826914731641117058901', '', '5,', '', 0, 0, 0, '', '', '1641117058901'),
(5, 'Trần Nguyên Hãn', 'vanquan', '0982691472', '', 'token09826914721641049010794', '4,', '', '', 0, 1, 1, '', '', '1641049010794'),
(6, 'New User ', 'vanquan1', '0982691476', '', '', '', '', '', 0, 0, 0, '', '', ''),
(7, 'New User ', 'vanvan1', '0982691478', '', 'token09826914781641116163638', '', '', '', 0, 0, 0, '', '', '1641116163638'),
(8, '', 'vanvan1', '0982691480', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ2YW52YW4xIiwic3ViIjoiMDk4MjY5MTQ4MCIsImlhdCI6MTYzNDg5NDUzNzI1MCwiZXhwIjpudWxsfQ.P_f5rydaAS2CZIXcUR1Lb9LQivX6PiZd3DPatn7VRuI', '', '', '', 0, 0, 0, '', '', ''),
(9, 'admina', 'admina', '0982691488', '', 'token09826914881641313535349', '', '', '', 0, 0, 2, '', '', '1641313535349'),
(13, '', 'vanvan1', '0982691491', '', 'token09826914911641043483676', '', '', '', 0, 0, 0, '', '', '1641043483676'),
(14, 'Trần Nguyên Hãn', 'vanvan1', '0982691490', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ2YW52YW4xIiwic3ViIjoiMDk4MjY5MTQ5MCIsImlhdCI6MTY0MDM1NDg5NTIzMiwiZXhwIjpudWxsfQ.yEdR2Wt5Grp151_noYPA86jTUZa9tgHKReLBdQHQW-0', '', '', '', 0, 0, 0, '', '', ''),
(15, '', 'vanvan1', '0102030405', '', 'token01020304051641029070517', '', '', '', 0, 0, 0, '', '', ''),
(16, '', 'vanvan1', '0999999999', '', '', '', '', '', 0, 0, 0, '', '', ''),
(17, 'User', 'vanvan1', '0982691456', '', '', '', '', '', 0, 0, 0, '', '', '1641043738188'),
(21, 'User', 'vanvan1', '0982691455', '', 'token09826914551641312667940', '', '', '0982691455/url', 0, 0, 0, '', '', '1641312667940'),
(22, 'nguyễn văn a', 'vanlinh', '0333364966', '', '', '', '', '0333364966/url', 0, 0, 0, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_blocks`
--
ALTER TABLE `tbl_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_codevrify`
--
ALTER TABLE `tbl_codevrify`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_comment`
--
ALTER TABLE `tbl_comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_conversation`
--
ALTER TABLE `tbl_conversation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_friend`
--
ALTER TABLE `tbl_friend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_post`
--
ALTER TABLE `tbl_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tbl_report`
--
ALTER TABLE `tbl_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_requested_friend`
--
ALTER TABLE `tbl_requested_friend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_role`
--
ALTER TABLE `tbl_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_search`
--
ALTER TABLE `tbl_search`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_block_diary`
--
ALTER TABLE `tb_block_diary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_blocks`
--
ALTER TABLE `tbl_blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_chat`
--
ALTER TABLE `tbl_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `tbl_codevrify`
--
ALTER TABLE `tbl_codevrify`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_comment`
--
ALTER TABLE `tbl_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `tbl_conversation`
--
ALTER TABLE `tbl_conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_friend`
--
ALTER TABLE `tbl_friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_post`
--
ALTER TABLE `tbl_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `tbl_report`
--
ALTER TABLE `tbl_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_requested_friend`
--
ALTER TABLE `tbl_requested_friend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tbl_role`
--
ALTER TABLE `tbl_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_search`
--
ALTER TABLE `tbl_search`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_block_diary`
--
ALTER TABLE `tb_block_diary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
