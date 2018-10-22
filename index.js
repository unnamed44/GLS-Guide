String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` };
const Vec3 = require('tera-vec3');

const mapID = [9782, 9982];
const HuntingZn = [782, 982];
const BossID = [1000, 2000, 3000];

const config = require('./config.json');
const FirstBossActions = {
//	101: {msg: '101'},
//	102: {msg: '2 Укуса'},
//	103: {msg: 'Под землю'},
	104: {msg: '104'},
	105: {msg: '105'},
	106: {msg: 'Мощный удар'},
	107: {msg: 'Волна назад (отталкивание)'},
	108: {msg: 'Шипы (Подбрасывание)'},
	109: {msg: 'Камни'},
	110: {msg: 'Камни'},
	111: {msg: '111'},
	112: {msg: '112'},
	113: {msg: '113'},
	114: {msg: '114'},
	115: {msg: '115'},
	116: {msg: 'Полноэкранная атака!'},
	117: {msg: '117'},
	118: {msg: '118'},
	119: {msg: '119'},
	120: {msg: '120'},
	121: {msg: '121'},
	122: {msg: '122'},
	123: {msg: '123'},
	124: {msg: '124'},
	201: {msg: 'Зеленый дебаф'},
	202: {msg: '202'},
	203: {msg: '203'},
	204: {msg: '304'},
	205: {msg: '205'},
	206: {msg: '206'},
	207: {msg: '207'},
	208: {msg: '208'},
	209: {msg: '209'},
	210: {msg: '210'},
	301: {msg: 'Кусь'},
	302: {msg: '302'},
	303: {msg: '303'},
	304: {msg: '304'},
	305: {msg: '305'},
	306: {msg: '306'},
	307: {msg: 'Клетка (запрещена)'},
	308: {msg: 'АОЕ'},
	309: {msg: '1 цветок'},
	310: {msg: '2 цветка'},
	311: {msg: '311'},
	312: {msg: 'Золотой цветок !!'},
	313: {msg: '313'},
	314: {msg: '314'},
	315: {msg: '315'},
	316: {msg: '316'},
	317: {msg: '317'},
	318: {msg: '318'},
	319: {msg: '319'},
	320: {msg: '320'},
	345: {msg: '345'},
	346: {msg: '346'},
	347: {msg: '347'},
	348: {msg: '348'}
	
};
const SecondBossActions = {
//	101: {msg: '101'},
//	102: {msg: '102'},
//	103: {msg: '103'},
	104: {msg: '104'},
	105: {msg: 'Откат назад'},
	106: {msg: 'Волна вперед (Танк)'},
	107: {msg: '107'},
	108: {msg: '108'},
	109: {msg: 'Блювотня'},
	110: {msg: '110'},
	111: {msg: '111'},
	112: {msg: 'Волна вперед'},
	113: {msg: 'Руки (Стан)'},
	114: {msg: 'Три удара(внешний бублик)'},
	115: {msg: '115'},
	116: {msg: '(передний) (после)'},
	301: {msg: 'Внутренний'},
	302: {msg: 'Внешний бублик'}
};
const ThirdBossActions = {
	101: {msg: '101'},
	102: {msg: '102'},
	103: {msg: '103'},
	104: {msg: '104'},
	105: {msg: '105'},
	106: {msg: '106'},
	107: {msg: '107'},
	108: {msg: '108'},
	109: {msg: '109'},
	110: {msg: '110'},
	111: {msg: '111'},
	112: {msg: '112'},
	113: {msg: '113'},
	114: {msg: '114'},
	115: {msg: '115'},
	116: {msg: '116'},
	117: {msg: '117'},
	118: {msg: 'Лазеры и дыхание (слева-справа-дыхание)'},
	143: {msg: '<<< Левый задний 143'},
	145: {msg: '<<< Левый задний 145'},
	146: {msg: '146 Левый задний (диффузионный)', sign_degrees: 330, sign_distance: 320},
	154: {msg: '154 Левый задний (диффузионный)', sign_degrees: 330, sign_distance: 320},
	144: {msg: '144 Правый задний'},
	147: {msg: '147 Правый задний'},
	148: {msg: '148 Правый задний (диффузионный)', sign_degrees: 30, sign_distance: 320},
	155: {msg: '155 Правый задний (диффузионный)', sign_degrees: 30, sign_distance: 320},
	161: {msg: '161 передний привкус'},
	162: {msg: '162 передний привкус'},
	213: {msg: '213 хвост'},
	215: {msg: '215 хвост'},

	139: {msg: 'Анига По часовой Ван ударил вправо', sign_degrees: 270, sign_distance: 200}, //151
	150: {msg: 'Анига По часовой Ван ударил вправо', sign_degrees: 270, sign_distance: 200}, //151
	141: {msg: 'Против часовой стрелки (качающаяся головка) Ван ударил влево', sign_degrees: 90, sign_distance: 200}, //153
	152: {msg: 'Против часовой стрелки (посадка)', sign_degrees: 90, sign_distance: 200}, //153

	300: {msg: 'Первичное пробуждение (Отталкивание)'},
	360: {msg: 'Взрыв! Взрыв!'},
	399: {msg: 'Вторичное пробуждение'}
};

module.exports = function GrottoOfLostSoulsGuide(d) {
	let	enabled = config.enabled,
		sendToParty = config.sendToParty,
		streamenabled = config.streamenabled,

		isTank = false,
		insidemap = false,
		insidezone = false,
		whichmode = 0,
		whichboss = 0,
		hooks = [], bossCurLocation, bossCurAngle, uid0 = 999999999, uid1 = 899999999, uid2 = 799999999, power = false, Level = 0, powerMsg = '';

	d.command.add('gguide', (arg) => {
		if (!arg) {
			enabled = !enabled;
			d.command.message('Вспомогательное приглашение ' + (enabled ? 'Включить'.clr('56B4E9') : 'запрещать'.clr('E69F00')));
		} else {
			switch (arg) {
				case "p":
				case "party":
					sendToParty = !sendToParty;
					d.command.message('Отправить уведомление ' + (sendToParty ? 'команда'.clr('56B4E9') : 'собственный'.clr('E69F00')));
					break;
				case "proxy":
					streamenabled = !streamenabled;
					d.command.message('Прокси-канал ' + (streamenabled ? 'Включить'.clr('56B4E9') : 'запрещать'.clr('E69F00')));
					break;
				case "debug":
					d.command.message('Переключатель модуля: ' + `${enabled}`.clr('00FFFF'));
					d.command.message('Копировать карту: ' + insidemap);
					d.command.message('Региональное местоположение: ' + insidezone);
					d.command.message('Сложность копирования: ' + whichmode);
					d.command.message('Лидер копирования: ' + whichboss);
					d.command.message('Отправить уведомление ' + (sendToParty ? 'Реальная команда'.clr('56B4E9') : 'Увидимся только'.clr('E69F00')));
					d.command.message('Классификация карьеры ' + (isTank ? 'бак'.clr('00FFFF') : 'Головорезы'.clr('FF0000')));
					sendMessage('test');
					break;
				default :
					d.command.message('Недопустимый параметр!'.clr('FF0000'));
					break;
			}
		}
	});

	d.hook('S_LOGIN', 10, sLogin)
	d.hook('S_LOAD_TOPO', 3, sLoadTopo);

	function sLogin(event) {
		let job = (event.templateId - 10101) % 100;
		if (job === 1 || job === 10) {
			isTank = true;
		} else {
			isTank = false;
		}
	}

	function sLoadTopo(event) {
		if (event.zone === mapID[0]) {								
			insidemap = true;
			d.command.message('Добро пожаловать: ' + 'Мастерская Леандра '.clr('56B4E9') + '[Нормал]'.clr('E69F00'));
			load();
		} else if (event.zone === mapID[1]) {
			insidemap = true;
			d.command.message('Добро пожаловать: ' + 'Мастерская Леандра '.clr('56B4E9') + '[Хард]'.clr('00FFFF'));
			load();
		} else {
			unload();
		}
    }

	function load() {
		if (!hooks.length) {
			hook('S_BOSS_GAGE_INFO', 3, sBossGageInfo);
			hook('S_ACTION_STAGE', 8, sActionStage);

			function sBossGageInfo(event) {
				if (!insidemap) return;

				let bosshp = (event.curHp / event.maxHp);

				if (bosshp <= 0) {
					whichboss = 0;
				}

				if (event.curHp == event.maxHp) {
					power = false,
					Level = 0,
					powerMsg = '';
				}

				if (event.huntingZoneId == HuntingZn[0]) {
					insidezone = true;
					whichmode = 1;
				} else if (event.huntingZoneId == HuntingZn[1]) {
					insidezone = true;
					whichmode = 2;
				} else {
					insidezone = false;
					whichmode = 0;
				}

				if (event.templateId == BossID[0]) whichboss = 1;
				else if (event.templateId == BossID[1]) whichboss = 2;
				else if (event.templateId == BossID[2]) whichboss = 3;
				else whichboss = 0;
			}

			function sActionStage(event) {
				if (!enabled || !insidezone || whichboss==0) return;
				if (event.templateId!=BossID[0] && event.templateId!=BossID[1] && event.templateId!=BossID[2]) return;
				let skillid = event.skill.id % 1000;
				bossCurLocation = event.loc;
				bossCurAngle = event.w;

				if (whichboss==1 && FirstBossActions[skillid]) {
					if (!isTank && skillid === 106) return;
					if ( isTank && (skillid === 107 || skillid === 108 || skillid === 307)) return;
					sendMessage(FirstBossActions[skillid].msg);
				}

				if (whichboss==2 && SecondBossActions[skillid]) {
					// 2王 内外圈
					if (skillid === 114 || skillid === 301 || skillid === 302) {
						Spawnitem(603, 20, 260);
						Spawnitem(603, 40, 260);
						Spawnitem(603, 60, 260);
						Spawnitem(603, 80, 260);
						Spawnitem(603, 100, 260);
						Spawnitem(603, 120, 260);
						Spawnitem(603, 140, 260);
						Spawnitem(603, 160, 260);
						Spawnitem(603, 180, 260);
						Spawnitem(603, 200, 260);
						Spawnitem(603, 220, 260);
						Spawnitem(603, 240, 260);
						Spawnitem(603, 260, 260);
						Spawnitem(603, 280, 260);
						Spawnitem(603, 300, 260);
						Spawnitem(603, 320, 260);
						Spawnitem(603, 340, 260);
						Spawnitem(603, 360, 260);
					}
					// 2王 前砸后砸 横向对称轴
					if (skillid === 116) {
						Spawnitem(603, 90, 25);
						Spawnitem(603, 90, 50);
						Spawnitem(603, 90, 75);
						Spawnitem(603, 90, 100);
						Spawnitem(603, 90, 125);
						Spawnitem(603, 90, 150);
						Spawnitem(603, 90, 175);
						Spawnitem(603, 90, 200);
						Spawnitem(603, 90, 225);
						Spawnitem(603, 90, 250);
						Spawnitem(603, 90, 275);
						Spawnitem(603, 90, 300);
						Spawnitem(603, 90, 325);
						Spawnitem(603, 90, 350);
						Spawnitem(603, 90, 375);
						Spawnitem(603, 90, 400);
						Spawnitem(603, 90, 425);
						Spawnitem(603, 90, 450);
						Spawnitem(603, 90, 475);
						Spawnitem(603, 90, 500);

						Spawnitem(603, 270, 25);
						Spawnitem(603, 270, 50);
						Spawnitem(603, 270, 75);
						Spawnitem(603, 270, 100);
						Spawnitem(603, 270, 125);
						Spawnitem(603, 270, 150);
						Spawnitem(603, 270, 175);
						Spawnitem(603, 270, 200);
						Spawnitem(603, 270, 225);
						Spawnitem(603, 270, 250);
						Spawnitem(603, 270, 275);
						Spawnitem(603, 270, 300);
						Spawnitem(603, 270, 325);
						Spawnitem(603, 270, 350);
						Spawnitem(603, 270, 375);
						Spawnitem(603, 270, 400);
						Spawnitem(603, 270, 425);
						Spawnitem(603, 270, 450);
						Spawnitem(603, 270, 475);
						Spawnitem(603, 270, 500);
					}
					sendMessage(SecondBossActions[skillid].msg);
				}

				if (whichboss==3 && ThirdBossActions[skillid]) {
					// 蓄电层数计数
					if (whichmode==2) {
						// 一次觉醒 开始充能计数
						if (skillid===300) power = true, Level = 0, powerMsg = '';
						// 放电爆炸 重置充能计数
						if (skillid===360) Level = 0;
						// 二次觉醒 重置充能计数
						if (skillid===399) Level = 0;
						// 充能开关打开 并且 施放以下技能 则增加一层
						if (power) {
							switch (skillid) {
								case 118:	// 三连击

								case 143:	// 左后
								case 145:	// 左后

								case 146:	// 左后 (扩散)
								case 154:	// 左后 (扩散)

								case 144:	// 右后
								case 147:	// 右后

								case 148:	// 右后 (扩散)
								case 155:	// 右后 (扩散)

								case 161:	// (后砸) (前砸)
								case 162:	// (后砸) (前砸)

								case 213:	// 尾巴
								case 215:	// 尾巴
									Level++;
									powerMsg = '<font color="#FF0000">' + Level + '</font>层 ';
									break;
								default :
									powerMsg = '';
									break;
							}
						}
						// 屏蔽[三连击]技能连续触发充能
						if (power && (skillid===118)) {
							power = false;
							setTimeout(function() { power = true }, 4000);
						}
					}

					// 3王 左右扩散初始位置标记
					if (skillid === 146 || skillid === 154 || skillid === 148 || skillid === 155) {
						SpawnThing(ThirdBossActions[skillid].sign_degrees, ThirdBossActions[skillid].sign_distance, 8000);
					}

					// 3王 飞天半屏攻击
					if (skillid === 139 || skillid === 150 || skillid === 141 || skillid === 152) {
						// 垂直对称轴
						Spawnitem(603, 0, 25);
						Spawnitem(603, 0, 50);
						Spawnitem(603, 0, 75);
						Spawnitem(603, 0, 100);
						Spawnitem(603, 0, 125);
						Spawnitem(603, 0, 150);
						Spawnitem(603, 0, 175);
						Spawnitem(603, 0, 200);
						Spawnitem(603, 0, 225);
						Spawnitem(556, 0, 250);

						Spawnitem(603, 180, 25);
						Spawnitem(603, 180, 50);
						Spawnitem(603, 180, 75);
						Spawnitem(603, 180, 100);
						Spawnitem(603, 180, 125);
						Spawnitem(603, 180, 150);
						Spawnitem(603, 180, 175);
						Spawnitem(603, 180, 200);
						Spawnitem(603, 180, 225);
						Spawnitem(603, 180, 250);
						Spawnitem(603, 180, 275);
						Spawnitem(603, 180, 300);
						Spawnitem(603, 180, 325);
						Spawnitem(603, 180, 350);
						Spawnitem(603, 180, 375);
						Spawnitem(603, 180, 400);
						Spawnitem(603, 180, 425);
						Spawnitem(603, 180, 450);
						Spawnitem(603, 180, 475);
						Spawnitem(603, 180, 500);
						// 光柱+告示牌
						SpawnThing(ThirdBossActions[skillid].sign_degrees, ThirdBossActions[skillid].sign_distance, 5000);
					}

					sendMessage(powerMsg + ThirdBossActions[skillid].msg);
				}
			}

		}
	}

	function hook() {
		hooks.push(d.hook(...arguments));
	}

	function unload() {
		if (hooks.length) {
			for (let h of hooks)
				d.unhook(h);
			hooks = [];
		}
		reset();
	}

	function reset() {
		insidemap = false,
		insidezone = false,
		whichmode = 0,
		whichboss = 0,
		power = false,
		Level = 0,
		powerMsg = '';
	}

	function sendMessage(msg) {
		if (sendToParty) {
			d.toServer('C_CHAT', 1, {
				channel: 21, //21 = p-notice, 1 = party, 2 = guild
				message: msg
			});
		} else if (streamenabled) {
			d.command.message(msg);
		} else {
			d.toClient('S_CHAT', 2, {
				channel: 21, //21 = p-notice, 1 = party
				authorName: 'DG-Guide',
				message: msg
			});
		}
	}
	//地面提示(花朵)
	function Spawnitem(item, degrees, radius) { //显示物品 偏移角度 半径距离
		let r = null, rads = null, finalrad = null, spawnx = null, spawny = null, pos = null;

		r = bossCurAngle - Math.PI;
		rads = (degrees * Math.PI/180);
		finalrad = r - rads;
		spawnx = bossCurLocation.x + radius * Math.cos(finalrad);
		spawny = bossCurLocation.y + radius * Math.sin(finalrad);
		pos = {x:spawnx, y:spawny};
		// 花朵
		d.toClient('S_SPAWN_COLLECTION', 4, {
			gameId : uid0,
			id : item,
			amount : 1,
			loc : new Vec3(pos.x, pos.y, bossCurLocation.z),
			w : r,
			unk1 : 0,
			unk2 : 0
		});
		// 延时消除
		setTimeout(Despawn, 5000, uid0)
		uid0--;
	}
	// 消除花朵
	function Despawn(uid_arg0) {
		d.toClient('S_DESPAWN_COLLECTION', 2, {
			gameId : uid_arg0
		});
	}
	// 地面提示(光柱+告示牌)
	function SpawnThing(degrees, radius, times) { //偏移角度 半径距离 持续时间
		let r = null, rads = null, finalrad = null, spawnx = null, spawny = null, pos = null;

		r = bossCurAngle - Math.PI;
		rads = (degrees * Math.PI/180);
		finalrad = r - rads;
		spawnx = bossCurLocation.x + radius * Math.cos(finalrad);
		spawny = bossCurLocation.y + radius * Math.sin(finalrad);
		pos = {x:spawnx, y:spawny};
		// 告示牌
		d.toClient('S_SPAWN_BUILD_OBJECT', 2, {
			gameId : uid1,
			itemId : 1,
			loc : new Vec3(pos.x, pos.y, bossCurLocation.z),
			w : r,
			unk : 0,
			ownerName : '提示',
			message : '提示区'
		});

		// 龙头光柱
		bossCurLocation.z = bossCurLocation.z - 100;
		d.toClient('S_SPAWN_DROPITEM', 6, {
			gameId: uid2,
			loc: new Vec3(pos.x, pos.y, bossCurLocation.z),
			item: 98260,
			amount: 1,
			expiry: 6000,
			owners: [{playerId: uid2}]
		});
		bossCurLocation.z = bossCurLocation.z + 100;

		// 延迟消除
		setTimeout(DespawnThing, times, uid1, uid2);
		uid1--;
		uid2--;
	}
	// 消除 光柱+告示牌
	function DespawnThing(uid_arg1, uid_arg2) {
		d.toClient('S_DESPAWN_BUILD_OBJECT', 2, {
			gameId : uid_arg1,
			unk : 0
		});
		d.toClient('S_DESPAWN_DROPITEM', 4, {
			gameId: uid_arg2
		});
	}

}
