/* Update from v 1.11 to 1.12 */
UPDATE `settings` set `version` = '1.12';

/* reset db check field */
UPDATE `settings` set `dbverified` = 0;

/* add gateway field to database */
ALTER TABLE `ipaddresses` ADD `is_gateway` TINYINT(1)  NULL  DEFAULT '0'  AFTER `ip_addr`;

/* change tag */
ALTER TABLE `ipaddresses` CHANGE `state` `state` INT(3)  NULL  DEFAULT '1';

/* ip types */
CREATE TABLE `ipTags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(32) DEFAULT NULL,
  `showtag` tinyint(4) DEFAULT '1',
  `bgcolor` varchar(7) DEFAULT '#000',
  `fgcolor` varchar(7) DEFAULT '#fff',
  `locked` set('No','Yes') NOT NULL DEFAULT 'No',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index` (`index`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/* insert default values */
INSERT INTO `ipTypes` (`id`, `type`, `showtag`, `bgcolor`, `fgcolor`, `locked`)
VALUES
	(0, 'Offline', 1, '#f59c99', '#ffffff', 'Yes'),
	(1, 'Used', 0, '#a9c9a4', '#ffffff', 'Yes'),
	(2, 'Reserved', 1, '#9ac0cd', '#ffffff', 'Yes'),
	(3, 'DHCP', 1, '#c9c9c9', '#ffffff', 'Yes');
