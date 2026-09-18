/* ============================================================
   КОНСТАНТЫ
   ============================================================ */
const DEFAULT_CATEGORIES = [
  { id: 'blocks',      name: 'Блоки',            icon: '🧱' },
  { id: 'items',       name: 'Предметы',         icon: '🗡️' },
  { id: 'armor',       name: 'Броня',            icon: '🛡️' },
  { id: 'entity',      name: 'Сущности',         icon: '🐷' },
  { id: 'environment', name: 'Небо / Окружение', icon: '☁️' },
  { id: 'gui',         name: 'GUI',              icon: '🖼️' },
  { id: 'font',        name: 'Шрифт',            icon: '🔤' },
  { id: 'particle',    name: 'Частицы',          icon: '✨' },
  { id: 'painting',    name: 'Картины',          icon: '🎨' },
  { id: 'misc',        name: 'Разное',           icon: '📦' }
];
const CAT_ORDER = ['blocks','items','armor','entity','environment','gui','font','particle','painting','misc'];

const MC_COLORS = {
  '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
  '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
  '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
  'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF'
};

const CAT_ICONS = {
  blocks:'🧱', items:'🗡️', armor:'🛡️', entity:'🐷', environment:'☁️',
  gui:'🖼️', font:'🔤', particle:'✨', painting:'🎨', misc:'📦',
  models:'🧊', colormap:'🎨', map:'🗺️', mob_effect:'💫',
  destroy_stage:'💥', effect:'💫', particle_alt:'✨'
};
function catIcon(id) {
  if (id === 'mcpatcher/sky')    return '🌌';
  if (id === 'mcpatcher/ctm')    return '🔲';
  if (id === 'mcpatcher/cit')    return '🖼️';
  if (id === 'mcpatcher/grass')  return '🌿';
  if (id === 'mcpatcher/anim')   return '🎬';
  if (id.startsWith('mcpatcher/')) return '⚙️';
  return CAT_ICONS[id] || '📁';
}
function catName(id) {
  if (id === 'mcpatcher/sky')   return 'Небо (MCPatcher)';
  if (id === 'mcpatcher/ctm')   return 'CTM (MCPatcher)';
  if (id === 'mcpatcher/cit')   return 'CIT (MCPatcher)';
  if (id === 'mcpatcher/grass') return 'Трава (MCPatcher)';
  if (id === 'mcpatcher/anim')  return 'Анимация (MCPatcher)';
  if (id.startsWith('mcpatcher/')) return 'MCP: ' + prettifyName(id.slice(10));
  return prettifyName(id);
}
function prettifyName(id) {
  return id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' ');
}

/* ============================================================
   📚 БИБЛИОТЕКА ВАНИЛЬНЫХ ТЕКСТУР MINECRAFT 1.8.9
   Формат: 'filename': [w, h, 'Русское название']
   ============================================================ */
const TEXTURE_LIBRARY = {
  blocks: {
    'stone':[16,16,'Камень'], 'dirt':[16,16,'Земля'], 'grass_top':[16,16,'Трава (верх)'],
    'grass_side':[16,16,'Трава (бок)'], 'grass_side_overlay':[16,16,'Трава (оверлей)'],
    'cobblestone':[16,16,'Булыжник'], 'mossy_cobblestone':[16,16,'Мшистый булыжник'],
    'sand':[16,16,'Песок'], 'sandstone_top':[16,16,'Песчаник (верх)'],
    'sandstone_bottom':[16,16,'Песчаник (низ)'], 'sandstone_normal':[16,16,'Песчаник (бок)'],
    'sandstone_carved':[16,16,'Песчаник (резной)'], 'sandstone_smooth':[16,16,'Песчаник (гладкий)'],
    'gravel':[16,16,'Гравий'], 'clay':[16,16,'Глина'], 'bedrock':[16,16,'Бедрок'],
    'obsidian':[16,16,'Обсидиан'], 'netherrack':[16,16,'Адский камень'],
    'end_stone':[16,16,'Камень Края'], 'ice':[16,16,'Лёд'], 'packed_ice':[16,16,'Плотный лёд'],
    'snow':[16,16,'Снег'], 'glass':[16,16,'Стекло'], 'glass_pane_top':[16,16,'Стеклянная панель (ребро)'],
    'iron_bars':[16,16,'Железные прутья'], 'brick':[16,16,'Кирпич'], 'stone_brick':[16,16,'Каменный кирпич'],
    'nether_brick':[16,16,'Адский кирпич'], 'quartz_block_top':[16,16,'Кварц (верх)'],
    'quartz_block_side':[16,16,'Кварц (бок)'], 'quartz_block_bottom':[16,16,'Кварц (низ)'],
    'oak_planks':[16,16,'Доски (дуб)'], 'spruce_planks':[16,16,'Доски (ель)'],
    'birch_planks':[16,16,'Доски (берёза)'], 'jungle_planks':[16,16,'Доски (тропики)'],
    'acacia_planks':[16,16,'Доски (акация)'], 'dark_oak_planks':[16,16,'Доски (тёмный дуб)'],
    'oak_log':[16,16,'Бревно дуба (бок)'], 'oak_log_top':[16,16,'Бревно дуба (торец)'],
    'spruce_log':[16,16,'Бревно ели (бок)'], 'birch_log':[16,16,'Бревно берёзы (бок)'],
    'jungle_log':[16,16,'Бревно тропиков (бок)'], 'acacia_log':[16,16,'Бревно акации (бок)'],
    'dark_oak_log':[16,16,'Бревно тёмного дуба'], 'coal_ore':[16,16,'Угольная руда'],
    'iron_ore':[16,16,'Железная руда'], 'gold_ore':[16,16,'Золотая руда'],
    'diamond_ore':[16,16,'Алмазная руда'], 'emerald_ore':[16,16,'Изумрудная руда'],
    'redstone_ore':[16,16,'Редстоуновая руда'], 'lapis_ore':[16,16,'Лазуритовая руда'],
    'coal_block':[16,16,'Угольный блок'], 'iron_block':[16,16,'Железный блок'],
    'gold_block':[16,16,'Золотой блок'], 'diamond_block':[16,16,'Алмазный блок'],
    'emerald_block':[16,16,'Изумрудный блок'], 'redstone_block':[16,16,'Редстоуновый блок'],
    'lapis_block':[16,16,'Лазуритовый блок'],
    'wool_colored_white':[16,16,'Белая шерсть'], 'wool_colored_orange':[16,16,'Оранжевая шерсть'],
    'wool_colored_magenta':[16,16,'Пурпурная шерсть'], 'wool_colored_light_blue':[16,16,'Голубая шерсть'],
    'wool_colored_yellow':[16,16,'Жёлтая шерсть'], 'wool_colored_lime':[16,16,'Лаймовая шерсть'],
    'wool_colored_pink':[16,16,'Розовая шерсть'], 'wool_colored_gray':[16,16,'Серая шерсть'],
    'wool_colored_silver':[16,16,'Светло-серая шерсть'], 'wool_colored_cyan':[16,16,'Бирюзовая шерсть'],
    'wool_colored_purple':[16,16,'Фиолетовая шерсть'], 'wool_colored_blue':[16,16,'Синяя шерсть'],
    'wool_colored_brown':[16,16,'Коричневая шерсть'], 'wool_colored_green':[16,16,'Зелёная шерсть'],
    'wool_colored_red':[16,16,'Красная шерсть'], 'wool_colored_black':[16,16,'Чёрная шерсть'],
    'crafting_table_top':[16,16,'Верстак (верх)'], 'crafting_table_side':[16,16,'Верстак (бок)'],
    'crafting_table_front':[16,16,'Верстак (перёд)'], 'furnace_front_off':[16,16,'Печь (перёд)'],
    'furnace_front_on':[16,16,'Печь (топка)'], 'furnace_side':[16,16,'Печь (бок)'],
    'furnace_top':[16,16,'Печь (верх)'], 'chest':[16,16,'Сундук'],
    'ender_chest':[16,16,'Эндер-сундук'], 'trapped_chest':[16,16,'Сундук-ловушка'],
    'bookshelf':[16,16,'Книжная полка'], 'glowstone':[16,16,'Светокамень'],
    'soul_sand':[16,16,'Песок душ'], 'cactus_side':[16,16,'Кактус (бок)'],
    'cactus_top':[16,16,'Кактус (верх)'], 'cactus_bottom':[16,16,'Кактус (низ)'],
    'pumpkin_side':[16,16,'Тыква (бок)'], 'pumpkin_top':[16,16,'Тыква (верх)'],
    'pumpkin_face_off':[16,16,'Тыква (лицо)'], 'pumpkin_face_on':[16,16,'Светильник Джека'],
    'melon_side':[16,16,'Арбуз (бок)'], 'melon_top':[16,16,'Арбуз (верх)'],
    'hay_block_side':[16,16,'Стог сена (бок)'], 'hay_block_top':[16,16,'Стог сена (верх)'],
    'tnt_side':[16,16,'ТНТ (бок)'], 'tnt_top':[16,16,'ТНТ (верх)'], 'tnt_bottom':[16,16,'ТНТ (низ)'],
    'water_still':[16,16,'Вода'], 'water_flow':[32,32,'Вода (поток)'],
    'lava_still':[16,16,'Лава'], 'lava_flow':[32,32,'Лава (поток)'],
    'spawner':[16,16,'Спавнер'], 'dragon_egg':[16,16,'Яйцо дракона'], 'beacon':[16,16,'Маяк'],
    'anvil_base':[16,16,'Наковальня (основа)'], 'anvil_top_damaged_0':[16,16,'Наковальня (верх)'],
    'enchanting_table_top':[16,16,'Стол зачарований (верх)'], 'enchanting_table_side':[16,16,'Стол зачарований (бок)']
  },
  items: {
    'stick':[16,16,'Палка'], 'coal':[16,16,'Уголь'], 'charcoal':[16,16,'Древесный уголь'],
    'iron_ingot':[16,16,'Железный слиток'], 'gold_ingot':[16,16,'Золотой слиток'],
    'diamond':[16,16,'Алмаз'], 'emerald':[16,16,'Изумруд'], 'redstone':[16,16,'Редстоун'],
    'lapis_lazuli':[16,16,'Лазурит'], 'quartz':[16,16,'Кварц'],
    'apple':[16,16,'Яблоко'], 'golden_apple':[16,16,'Золотое яблоко'],
    'bread':[16,16,'Хлеб'], 'wheat':[16,16,'Пшеница'], 'seeds':[16,16,'Семена'],
    'bone':[16,16,'Кость'], 'feather':[16,16,'Перо'], 'flint':[16,16,'Кремень'],
    'leather':[16,16,'Кожа'], 'string':[16,16,'Нить'], 'gunpowder':[16,16,'Порох'],
    'paper':[16,16,'Бумага'], 'book':[16,16,'Книга'], 'enchanted_book':[16,16,'Зачарованная книга'],
    'writable_book':[16,16,'Книга и перо'], 'written_book':[16,16,'Записанная книга'],
    'egg':[16,16,'Яйцо'], 'cookie':[16,16,'Печенье'], 'bowl':[16,16,'Миска'],
    'bucket':[16,16,'Ведро'], 'water_bucket':[16,16,'Ведро воды'], 'lava_bucket':[16,16,'Ведро лавы'],
    'milk_bucket':[16,16,'Ведро молока'], 'flint_and_steel':[16,16,'Огниво'],
    'shears':[16,16,'Ножницы'], 'fishing_rod':[16,16,'Удочка'], 'carrot':[16,16,'Морковь'],
    'golden_carrot':[16,16,'Золотая морковь'], 'potato':[16,16,'Картофель'],
    'baked_potato':[16,16,'Печёный картофель'], 'poisonous_potato':[16,16,'Ядовитый картофель'],
    'arrow':[16,16,'Стрела'], 'bow':[16,16,'Лук'],
    'wood_sword':[16,16,'Деревянный меч'], 'stone_sword':[16,16,'Каменный меч'],
    'iron_sword':[16,16,'Железный меч'], 'gold_sword':[16,16,'Золотой меч'],
    'diamond_sword':[16,16,'Алмазный меч'],
    'wood_pickaxe':[16,16,'Деревянная кирка'], 'stone_pickaxe':[16,16,'Каменная кирка'],
    'iron_pickaxe':[16,16,'Железная кирка'], 'gold_pickaxe':[16,16,'Золотая кирка'],
    'diamond_pickaxe':[16,16,'Алмазная кирка'],
    'wood_axe':[16,16,'Деревянный топор'], 'stone_axe':[16,16,'Каменный топор'],
    'iron_axe':[16,16,'Железный топор'], 'gold_axe':[16,16,'Золотой топор'],
    'diamond_axe':[16,16,'Алмазный топор'],
    'wood_shovel':[16,16,'Деревянная лопата'], 'stone_shovel':[16,16,'Каменная лопата'],
    'iron_shovel':[16,16,'Железная лопата'], 'gold_shovel':[16,16,'Золотая лопата'],
    'diamond_shovel':[16,16,'Алмазная лопата'],
    'wood_hoe':[16,16,'Деревянная мотыга'], 'stone_hoe':[16,16,'Каменная мотыга'],
    'iron_hoe':[16,16,'Железная мотыга'], 'gold_hoe':[16,16,'Золотая мотыга'],
    'diamond_hoe':[16,16,'Алмазная мотыга'],
    'door_wood':[16,16,'Деревянная дверь'], 'door_iron':[16,16,'Железная дверь'],
    'sign':[16,16,'Табличка'], 'ender_pearl':[16,16,'Эндер-жемчуг'],
    'blaze_rod':[16,16,'Огненный стержень'], 'blaze_powder':[16,16,'Огненный порошок'],
    'ender_eye':[16,16,'Око Края'], 'ghast_tear':[16,16,'Слеза гаста'],
    'nether_wart':[16,16,'Адский нарост'], 'magma_cream':[16,16,'Магмовый крем'],
    'sugar':[16,16,'Сахар'], 'slimeball':[16,16,'Слизь'], 'sugar_cane':[16,16,'Сахарный тростник'],
    'rotten_flesh':[16,16,'Гнилая плоть'], 'spider_eye':[16,16,'Паучий глаз'],
    'fermented_spider_eye':[16,16,'Маринованный паучий глаз'], 'mushroom_stew':[16,16,'Грибной суп'],
    'raw_porkchop':[16,16,'Сырая свинина'], 'cooked_porkchop':[16,16,'Жареная свинина'],
    'raw_beef':[16,16,'Сырая говядина'], 'cooked_beef':[16,16,'Стейк'],
    'raw_chicken':[16,16,'Сырая курица'], 'cooked_chicken':[16,16,'Жареная курица'],
    'raw_fish':[16,16,'Сырая рыба'], 'cooked_fish':[16,16,'Жареная рыба'],
    'pumpkin_pie':[16,16,'Тыквенный пирог'], 'melon':[16,16,'Ломтик арбуза'], 'cake':[16,16,'Торт'],
    'painting':[16,16,'Картина'], 'item_frame':[16,16,'Рамка'], 'boat':[16,16,'Лодка'],
    'minecart_normal':[16,16,'Вагонетка'], 'minecart_chest':[16,16,'Вагонетка с сундуком'],
    'minecart_furnace':[16,16,'Вагонетка с печью'], 'minecart_hopper':[16,16,'Вагонетка-воронка'],
    'minecart_tnt':[16,16,'Вагонетка с ТНТ'], 'saddle':[16,16,'Седло'], 'name_tag':[16,16,'Бирка'],
    'lead':[16,16,'Поводок'], 'comparator':[16,16,'Компаратор'], 'repeater':[16,16,'Повторитель'],
    'redstone_torch_on':[16,16,'Редстоун-факел'], 'torch_on':[16,16,'Факел'], 'lever':[16,16,'Рычаг'],
    'stone_button':[16,16,'Каменная кнопка'], 'wooden_button':[16,16,'Деревянная кнопка'],
    'stone_pressure_plate':[16,16,'Каменная плита'], 'wooden_pressure_plate':[16,16,'Деревянная плита'],
    'tripwire_hook':[16,16,'Крюк'], 'daylight_detector_top':[16,16,'Датчик света'],
    'redstone_dust_cross':[16,16,'Редстоун (крест)'], 'redstone_dust_line':[16,16,'Редстоун (линия)'],
    'record_13':[16,16,'Пластинка 13'], 'record_cat':[16,16,'Пластинка cat'],
    'record_blocks':[16,16,'Пластинка blocks'], 'record_chirp':[16,16,'Пластинка chirp'],
    'record_far':[16,16,'Пластинка far'], 'record_mall':[16,16,'Пластинка mall'],
    'record_mellohi':[16,16,'Пластинка mellohi'], 'record_stal':[16,16,'Пластинка stal'],
    'record_strad':[16,16,'Пластинка strad'], 'record_ward':[16,16,'Пластинка ward'],
    'record_11':[16,16,'Пластинка 11'], 'record_wait':[16,16,'Пластинка wait']
  },
  armor: {
    'leather_helmet':[16,16,'Кожаный шлем'], 'leather_chestplate':[16,16,'Кожаная куртка'],
    'leather_leggings':[16,16,'Кожаные штаны'], 'leather_boots':[16,16,'Кожаные ботинки'],
    'iron_helmet':[16,16,'Железный шлем'], 'iron_chestplate':[16,16,'Железная кираса'],
    'iron_leggings':[16,16,'Железные штаны'], 'iron_boots':[16,16,'Железные ботинки'],
    'gold_helmet':[16,16,'Золотой шлем'], 'gold_chestplate':[16,16,'Золотая кираса'],
    'gold_leggings':[16,16,'Золотые штаны'], 'gold_boots':[16,16,'Золотые ботинки'],
    'chainmail_helmet':[16,16,'Кольчужный шлем'], 'chainmail_chestplate':[16,16,'Кольчуга'],
    'chainmail_leggings':[16,16,'Кольчужные штаны'], 'chainmail_boots':[16,16,'Кольчужные ботинки'],
    'diamond_helmet':[16,16,'Алмазный шлем'], 'diamond_chestplate':[16,16,'Алмазная кираса'],
    'diamond_leggings':[16,16,'Алмазные штаны'], 'diamond_boots':[16,16,'Алмазные ботинки'],
    'leather_layer_1':[64,32,'Кожа (слой 1)'], 'leather_layer_2':[64,32,'Кожа (слой 2)'],
    'iron_layer_1':[64,32,'Железо (слой 1)'], 'iron_layer_2':[64,32,'Железо (слой 2)'],
    'gold_layer_1':[64,32,'Золото (слой 1)'], 'gold_layer_2':[64,32,'Золото (слой 2)'],
    'chainmail_layer_1':[64,32,'Кольчуга (слой 1)'], 'chainmail_layer_2':[64,32,'Кольчуга (слой 2)'],
    'diamond_layer_1':[64,32,'Алмаз (слой 1)'], 'diamond_layer_2':[64,32,'Алмаз (слой 2)']
  },
  entity: {
    'steve':[64,64,'Стив'], 'alex':[64,64,'Алекс'], 'zombie':[64,64,'Зомби'],
    'zombie_villager':[64,64,'Зомби-житель'], 'skeleton':[64,64,'Скелет'],
    'wither_skeleton':[64,64,'Скелет-иссушитель'], 'creeper':[64,64,'Крипер'],
    'enderman':[64,64,'Эндермен'], 'enderman_eyes':[16,16,'Эндермен (глаза)'],
    'spider':[64,64,'Паук'], 'spider_eyes':[16,16,'Паук (глаза)'],
    'cave_spider':[64,64,'Пещерный паук'], 'silverfish':[64,64,'Чешуйница'],
    'pig':[64,32,'Свинья'], 'cow':[64,32,'Корова'], 'mooshroom':[64,32,'Грибная корова'],
    'sheep':[64,32,'Овца'], 'sheep_fur':[64,32,'Овечья шерсть'], 'chicken':[64,32,'Курица'],
    'wolf':[64,32,'Волк'], 'ocelot':[64,32,'Оцелот'], 'villager':[64,64,'Житель'],
    'horse':[64,32,'Лошадь'], 'donkey':[64,32,'Осёл'], 'mule':[64,32,'Мул'],
    'skeleton_horse':[64,32,'Скелет-лошадь'], 'zombie_horse':[64,32,'Зомби-лошадь'],
    'bat':[64,64,'Летучая мышь'], 'ghast':[64,32,'Гаст'], 'slime':[64,32,'Слизень'],
    'magma_cube':[64,32,'Магмовый куб'], 'blaze':[64,32,'Всполох'], 'squid':[64,32,'Спрут'],
    'iron_golem':[128,128,'Железный голем'], 'snowman':[64,32,'Снеговик'],
    'wither':[64,64,'Иссушитель'], 'ender_dragon':[256,256,'Дракон Края']
  },
  environment: {
    'sun':[32,32,'Солнце'], 'moon_phases':[32,64,'Фазы луны'], 'clouds':[256,256,'Облака'],
    'rain':[64,64,'Дождь'], 'snow':[64,64,'Снег'], 'end_sky':[128,128,'Небо Края'],
    'end_portal':[32,32,'Портал Края'], 'particle_field':[128,128,'Поле частиц']
  },
  gui: {
    'widgets':[256,256,'Виджеты GUI'], 'icons':[256,256,'Иконки GUI'],
    'options_background':[16,16,'Фон настроек'], 'hotbar':[182,22,'Хотбар'],
    'heart':[9,9,'Сердечко (полное)'], 'heart_empty':[9,9,'Сердечко (пустое)'],
    'heart_half':[9,9,'Сердечко (половина)'], 'food_full':[9,9,'Голод (полный)'],
    'food_empty':[9,9,'Голод (пустой)'], 'food_half':[9,9,'Голод (половина)'],
    'xp_bar_empty':[182,5,'Полоса опыта (пусто)'], 'xp_bar_full':[182,5,'Полоса опыта (полная)'],
    'achievement_background':[16,16,'Фон достижений'], 'book':[256,256,'Книга (фон)'],
    'container':[256,256,'Контейнер'], 'crafting_table':[256,256,'Верстак (GUI)'],
    'furnace':[256,256,'Печь (GUI)'], 'dispenser':[256,256,'Раздатчик (GUI)'],
    'inventory':[256,256,'Инвентарь'], 'creative_inventory':[256,256,'Креатив (GUI)'],
    'beacon':[256,256,'Маяк (GUI)'], 'anvil':[256,256,'Наковальня (GUI)'],
    'brewing_stand':[256,256,'Варочная стойка (GUI)'], 'enchanting_table':[256,256,'Стол зачарований (GUI)'],
    'hopper':[256,256,'Воронка (GUI)'], 'villager':[256,256,'Торговля (GUI)'],
    'trading':[256,256,'Сделки (GUI)']
  },
  font: { 'default':[128,128,'Шрифт по умолчанию'] },
  particle: { 'particles':[128,128,'Частицы'] },
  painting: {
    'kebab':[16,16,'Картина «Кебаб»'], 'aztec':[16,16,'Картина «Ацтек»'],
    'alban':[16,16,'Картина «Альбан»'], 'aztec2':[16,16,'Картина «Ацтек 2»'],
    'bomb':[16,16,'Картина «Бомба»'], 'plant':[16,16,'Картина «Растение»'],
    'wasteland':[16,16,'Картина «Пустошь»'], 'pool':[32,16,'Картина «Бассейн»'],
    'courbet':[32,16,'Картина «Курбе»'], 'sea':[32,16,'Картина «Море»'],
    'sunset':[32,16,'Картина «Закат»'], 'creebet':[32,16,'Картина «Крибет»'],
    'wanderer':[16,32,'Картина «Странник»'], 'graham':[16,32,'Картина «Грэм»'],
    'match':[32,32,'Картина «Матч»'], 'bust':[32,32,'Картина «Бюст»'],
    'stage':[32,32,'Картина «Сцена»'], 'void':[32,32,'Картина «Пустота»'],
    'skull_and_roses':[32,32,'Картина «Череп и розы»'], 'wither':[32,32,'Картина «Иссушитель»'],
    'fighters':[64,32,'Картина «Бойцы»'], 'pointer':[64,64,'Картина «Указатель»'],
    'pigscene':[64,64,'Картина «Свинки»'], 'burning_skull':[64,64,'Картина «Горящий череп»']
  }
};

/* ============================================================
   СОСТОЯНИЕ
   ============================================================ */
const state = {
  pack: { name: 'My Resource Pack', description: '', icon: null, version: '1.8.9' },
  categories: [],
  textures: {},
  activeCategory: null,
  rpLoaded: false
};

/* ============================================================
   УТИЛИТЫ
   ============================================================ */
const $ = id => document.getElementById(id);

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function renderMCText(text) {
  let html = '', cls = [], color = null;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '§' && i + 1 < text.length) {
      const code = text[i + 1].toLowerCase();
      i++;
      if (MC_COLORS[code]) { color = MC_COLORS[code]; cls = []; }
      else if (code === 'l') cls.push('mc-bold');
      else if (code === 'o') cls.push('mc-italic');
      else if (code === 'n') cls.push('mc-underline');
      else if (code === 'm') cls.push('mc-strike');
      else if (code === 'r') { color = null; cls = []; }
      continue;
    }
    const style = color ? `color:${color}` : '';
    html += `<span class="${cls.join(' ')}" style="${style}">${escapeHtml(ch)}</span>`;
  }
  return html;
}

function insertAtCursor(input, text, onChange) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const v = input.value;
  input.value = v.slice(0, start) + text + v.slice(end);
  const pos = start + text.length;
  input.setSelectionRange(pos, pos);
  input.focus();
  input.dispatchEvent(new Event('input'));
  if (onChange) onChange();
}

function buildMCPalette(paletteEl, inputEl, onChange) {
  paletteEl.innerHTML = '';
  ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'].forEach(code => {
    const b = document.createElement('button');
    b.textContent = 'A';
    b.style.background = MC_COLORS[code];
    b.title = `§${code}`;
    b.onclick = () => insertAtCursor(inputEl, `§${code}`, onChange);
    paletteEl.appendChild(b);
  });
  [['l','Ж','Жирный'],['o','К','Курсив'],['n','Ч','Подчёркнутый'],['m','З','Зачёркнутый'],['r','С','Сброс']]
    .forEach(([code, letter, title]) => {
      const b = document.createElement('button');
      b.className = 'fmt';
      b.textContent = letter;
      b.title = `${title} (§${code})`;
      b.onclick = () => insertAtCursor(inputEl, `§${code}`, onChange);
      paletteEl.appendChild(b);
    });
}

function fileToDataURL(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}
function isImageDataUrl(dataUrl, name) {
  if (typeof dataUrl !== 'string') return false;
  if (/^data:image\//i.test(dataUrl)) return true;
  if (name && /\.png$/i.test(name) && /^data:/i.test(dataUrl)) return true;
  return false;
}
function normalizeDataUrl(dataUrl, name) {
  if (typeof dataUrl !== 'string') return dataUrl;
  if (/^data:image\//i.test(dataUrl)) return dataUrl;
  if (!/^data:/i.test(dataUrl)) return dataUrl;
  if (name && /\.png$/i.test(name)) return dataUrl.replace(/^data:[^;,]*/, 'data:image/png');
  return dataUrl;
}
function isTextFile(name) {
  return /\.(properties|txt|json|mcmeta|cfg|lang)$/i.test(name);
}
function textDataUrlToText(dataUrl) {
  const idx = dataUrl.indexOf(',');
  if (idx < 0) return '';
  const head = dataUrl.slice(0, idx);
  const body = dataUrl.slice(idx + 1);
  if (head.includes(';base64')) {
    try {
      const bin = atob(body);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder('utf-8').decode(bytes);
    } catch { return ''; }
  }
  try { return decodeURIComponent(body); } catch { return ''; }
}
function textToDataUrl(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return 'data:text/plain;base64,' + btoa(bin);
}
function setStatus(text, kind) {
  const el = $('load-status');
  if (!el) return;
  if (!text) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  el.className = 'load-status' + (kind ? ' ' + kind : '');
  const spin = kind === 'loading' ? '<div class="spin"></div>' : '';
  el.innerHTML = spin + `<span>${escapeHtml(text)}</span>`;
}

/* ============================================================
   ПУТИ / КАТЕГОРИИ
   ============================================================ */
function parseTexPath(p) {
  const path = String(p).replace(/\\/g, '/');
  let m = path.match(/assets\/minecraft\/mcpatcher\/([^/]+)\/(.+)$/i);
  if (m) return { cat: 'mcpatcher/' + m[1], name: m[2] };
  m = path.match(/assets\/minecraft\/textures\/([^/]+)\/(.+)$/i);
  if (!m) return null;
  if (!/\.(png|properties|txt|json|mcmeta|lang)$/i.test(m[2])) return null;
  return { cat: m[1], name: m[2] };
}
function sortCategories() {
  state.categories.sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a.id), ib = CAT_ORDER.indexOf(b.id);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    const ma = a.id.startsWith('mcpatcher/') ? 1 : 0;
    const mb = b.id.startsWith('mcpatcher/') ? 1 : 0;
    if (ma !== mb) return ma - mb;
    return a.id.localeCompare(b.id);
  });
}
function applyImportedTextures(items) {
  state.textures = {};
  const catSet = new Set();
  let count = 0;
  for (const { path, dataUrl } of items) {
    const parsed = parseTexPath(path);
    if (!parsed) continue;
    const { cat, name } = parsed;
    if (!state.textures[cat]) state.textures[cat] = {};
    state.textures[cat][name] = normalizeDataUrl(dataUrl, name);
    catSet.add(cat);
    count++;
  }
  state.categories = [...catSet].map(id => ({ id, name: catName(id), icon: catIcon(id) }));
  sortCategories();
  state.activeCategory = state.categories[0]?.id || null;
  state.rpLoaded = count > 0;
  return count;
}

/* ============================================================
   АВТОЗАГРУЗКА
   ============================================================ */
async function tryAutoLoadRPZip() {
  const paths = ['RP/RP.zip', 'RP/rp.zip', 'RP/Напишите имя своего ресурс-пака ).zip'];
  if (location.protocol === 'file:') return false;
  for (const path of paths) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) continue;
      const blob = await res.blob();
      if (!blob.size) continue;
      setStatus(`Распаковываю ${path} (${(blob.size / 1024 / 1024).toFixed(1)} МБ)...`, 'loading');
      const data = await Storage.importPack(blob);
      const items = [];
      for (const cat of Object.keys(data.textures)) {
        for (const name of Object.keys(data.textures[cat])) {
          let p;
          if (cat.startsWith('mcpatcher/')) p = `assets/minecraft/${cat}/${name}`;
          else p = `assets/minecraft/textures/${cat}/${name}`;
          items.push({ path: p, dataUrl: data.textures[cat][name] });
        }
      }
      const count = applyImportedTextures(items);
      if (data.pack.description) {
        state.pack.description = data.pack.description;
        $('pack-desc').value = data.pack.description;
        updateDescPreview();
      }
      if (data.pack.icon) {
        state.pack.icon = data.pack.icon;
        $('icon-preview').src = data.pack.icon;
        $('icon-drop').classList.add('has-image');
      }
      const baseName = path.split('/').pop().replace(/\.zip$/i, '');
      if (baseName) { state.pack.name = baseName; $('pack-name').value = baseName; updateNamePreview(); }
      setStatus(`✅ Загружено ${count} файлов из ${path} — нажми «Открыть редактор»`, 'ok');
      $('tpl-vanilla-badge').hidden = false;
      $('tpl-vanilla-desc').textContent = `Готово · ${count} файлов`;
      return true;
    } catch (e) { console.warn('Не загрузилось', path, e); }
  }
  return false;
}
async function tryAutoLoadRP() {
  setStatus('Проверяю RP.zip...', 'loading');
  const ok = await tryAutoLoadRPZip();
  if (!ok) setStatus('');
  return ok;
}

/* ============================================================
   HOME SCREEN
   ============================================================ */
const homeNameInput = $('pack-name');
const homeDescInput = $('pack-desc');

function updateNamePreview() {
  $('name-preview').innerHTML = homeNameInput.value ? renderMCText(homeNameInput.value) : '';
  state.pack.name = homeNameInput.value || 'My Resource Pack';
}
function updateDescPreview() {
  $('desc-preview').innerHTML = homeDescInput.value ? renderMCText(homeDescInput.value) : '';
  state.pack.description = homeDescInput.value;
}
homeNameInput.addEventListener('input', updateNamePreview);
homeDescInput.addEventListener('input', updateDescPreview);
buildMCPalette($('name-mc-colors'), homeNameInput, updateNamePreview);
buildMCPalette($('desc-mc-colors'), homeDescInput, updateDescPreview);
updateNamePreview();
updateDescPreview();

$('pack-version').addEventListener('change', e => state.pack.version = e.target.value);

const iconDrop = $('icon-drop');
const iconInput = $('icon-input');
iconDrop.addEventListener('click', () => iconInput.click());
iconInput.addEventListener('change', e => { const f = e.target.files[0]; if (f) loadIcon(f); e.target.value = ''; });
iconDrop.addEventListener('drop', e => {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f && f.type === 'image/png') loadIcon(f);
});
['dragenter','dragover'].forEach(ev => iconDrop.addEventListener(ev, e => { e.preventDefault(); iconDrop.classList.add('drag'); }));
['dragleave','drop'].forEach(ev => iconDrop.addEventListener(ev, e => { e.preventDefault(); iconDrop.classList.remove('drag'); }));
function loadIcon(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, 128, 128);
      const url = c.toDataURL('image/png');
      state.pack.icon = url;
      $('icon-preview').src = url;
      iconDrop.classList.add('has-image');
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

$('btn-create').addEventListener('click', () => {
  if (!homeNameInput.value.trim()) { alert('Введи название'); homeNameInput.focus(); return; }
  state.pack.name = homeNameInput.value;
  state.pack.description = homeDescInput.value;
  enterEditor();
});
$('btn-import-zip').addEventListener('click', () => $('zip-input').click());
$('folder-input').addEventListener('change', async e => {
  const files = [...e.target.files]; e.target.value = '';
  if (!files.length) return;
  await loadFromFolder(files);
});
$('zip-input').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  await loadFromZip(f);
});

async function loadFromZip(file) {
  setStatus('Распаковываю .zip...', 'loading');
  try {
    const data = await Storage.importPack(file);
    const items = [];
    for (const cat of Object.keys(data.textures)) {
      for (const name of Object.keys(data.textures[cat])) {
        let path;
        if (cat.startsWith('mcpatcher/')) path = `assets/minecraft/${cat}/${name}`;
        else path = `assets/minecraft/textures/${cat}/${name}`;
        items.push({ path, dataUrl: data.textures[cat][name] });
      }
    }
    const count = applyImportedTextures(items);
    if (data.pack.description) { state.pack.description = data.pack.description; $('pack-desc').value = data.pack.description; updateDescPreview(); }
    if (data.pack.icon) { state.pack.icon = data.pack.icon; $('icon-preview').src = data.pack.icon; iconDrop.classList.add('has-image'); }
    const name = file.name.replace(/\.zip$/i, '');
    if (name) { state.pack.name = name; $('pack-name').value = name; updateNamePreview(); }
    setStatus(`✅ Импортировано ${count} файлов — нажми «Открыть редактор»`, 'ok');
  } catch (err) { console.error(err); setStatus('Ошибка импорта: ' + err.message, 'error'); }
}

async function loadFromFolder(files) {
  setStatus('Сканирую папку...', 'loading');
  const texFiles = [];
  let mcmetaFile = null, packPngFile = null;
  for (const f of files) {
    const rel = (f.webkitRelativePath || f.name).replace(/\\/g, '/');
    if (/assets\/minecraft\/textures\/.+\.(png|properties|txt|json)$/i.test(rel)) texFiles.push(f);
    else if (/assets\/minecraft\/mcpatcher\/.+/i.test(rel)) texFiles.push(f);
    else if (/(^|\/)pack\.mcmeta$/i.test(rel)) mcmetaFile = f;
    else if (/(^|\/)pack\.png$/i.test(rel)) packPngFile = f;
  }
  if (!texFiles.length) { setStatus('Не найдено ни одного файла в assets/minecraft/.', 'error'); return; }
  const items = [];
  const CHUNK = 80;
  for (let i = 0; i < texFiles.length; i += CHUNK) {
    const chunk = texFiles.slice(i, i + CHUNK);
    const results = await Promise.all(chunk.map(async f => {
      const rel = (f.webkitRelativePath || f.name).replace(/\\/g, '/');
      const idx = rel.indexOf('assets/');
      const assetPath = idx >= 0 ? rel.slice(idx) : rel;
      return { path: assetPath, dataUrl: await fileToDataURL(f) };
    }));
    items.push(...results);
    setStatus(`Загружаю... ${Math.min(i + CHUNK, texFiles.length)} / ${texFiles.length}`, 'loading');
  }
  const count = applyImportedTextures(items);
  if (mcmetaFile) {
    try { const json = JSON.parse(await mcmetaFile.text()); if (json?.pack?.description) { state.pack.description = String(json.pack.description); $('pack-desc').value = state.pack.description; updateDescPreview(); } } catch (e) {}
  }
  if (packPngFile) { const url = await fileToDataURL(packPngFile); state.pack.icon = url; $('icon-preview').src = url; $('icon-drop').classList.add('has-image'); }
  const firstRel = (files[0]?.webkitRelativePath || '').replace(/\\/g, '/');
  const rootName = firstRel.split('/')[0];
  if (rootName) { state.pack.name = rootName; $('pack-name').value = rootName; updateNamePreview(); }
  setStatus(`✅ Загружено ${count} файлов · ${state.categories.length} категорий — нажми «Открыть редактор»`, 'ok');
}

const dropOverlay = $('drop-overlay');
let dragCounter = 0;
document.addEventListener('dragenter', e => { if (!e.dataTransfer.types.includes('Files')) return; dragCounter++; dropOverlay.classList.add('active'); });
document.addEventListener('dragleave', () => { dragCounter--; if (dragCounter <= 0) { dragCounter = 0; dropOverlay.classList.remove('active'); } });
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', async e => {
  e.preventDefault(); dragCounter = 0; dropOverlay.classList.remove('active');
  if (e.target.closest('#icon-drop')) return;
  if (e.target.closest('.modal')) return;
  const files = [...e.dataTransfer.files];
  if (files.length > 0 && /\.zip$/i.test(files[0].name)) { await loadFromZip(files[0]); return; }
  const items = e.dataTransfer.items;
  if (!items || !items.length) return;
  const first = items[0].webkitGetAsEntry?.();
  if (!first) {
    if (files.length && /\.png$/i.test(files[0].name)) return;
    await loadFromFolder(files);
    return;
  }
  setStatus('Сканирую папку...', 'loading');
  const folderFiles = await readEntry(first);
  if (!folderFiles.length) { setStatus('Пустая папка', 'error'); return; }
  await loadFromFolder(folderFiles);
});

async function readEntry(entry, prefix = '') {
  if (entry.isFile) {
    return new Promise(resolve => {
      entry.file(file => {
        try { Object.defineProperty(file, 'webkitRelativePath', { value: prefix + file.name, configurable: true }); } catch (e) {}
        resolve([file]);
      }, () => resolve([]));
    });
  }
  if (entry.isDirectory) {
    const reader = entry.createReader();
    const all = [];
    while (true) {
      const entries = await new Promise(res => reader.readEntries(res, () => res([])));
      if (!entries.length) break;
      for (const e of entries) { const sub = await readEntry(e, prefix + entry.name + '/'); all.push(...sub); }
    }
    return all;
  }
  return [];
}

/* ============================================================
   TEMPLATE MODAL
   ============================================================ */
const templateModal = $('template-modal');
function openTemplateModal() { templateModal.classList.add('active'); }
function closeTemplateModal() { templateModal.classList.remove('active'); }

$('btn-templates').addEventListener('click', openTemplateModal);
$('tpl-cancel').addEventListener('click', closeTemplateModal);
templateModal.addEventListener('click', e => { if (e.target === templateModal) closeTemplateModal(); });

templateModal.querySelectorAll('.template-item').forEach(btn => {
  btn.addEventListener('click', async () => {
    const tpl = btn.dataset.tpl;
    if (tpl === 'empty') {
      state.textures = {};
      state.categories = DEFAULT_CATEGORIES.map(c => ({ ...c }));
      state.categories.forEach(c => state.textures[c.id] = {});
      state.activeCategory = 'blocks';
      state.rpLoaded = false;
      closeTemplateModal();
      setStatus('✅ Пустой пакет готов — нажми «Открыть редактор»', 'ok');
      return;
    }
    if (tpl === 'vanilla') {
      closeTemplateModal();
      setStatus('Загружаю Vanilla 1.8.9...', 'loading');
      const ok = await tryAutoLoadRPZip();
      if (!ok) setStatus('RP/RP.zip не найден. Импортируй .zip вручную.', 'warn');
      return;
    }
    if (tpl === 'folder') { closeTemplateModal(); $('folder-input').click(); return; }
    if (tpl === 'zip')    { closeTemplateModal(); $('zip-input').click();    return; }
  });
});

/* ============================================================
   EDITOR
   ============================================================ */
function enterEditor() {
  $('home-screen').classList.remove('active');
  $('editor-screen').classList.add('active');
  $('editor-title').innerHTML = renderMCText(state.pack.name);
  if (!state.categories.length) {
    state.categories = DEFAULT_CATEGORIES.map(c => ({ ...c }));
    state.categories.forEach(c => state.textures[c.id] = {});
    state.activeCategory = 'blocks';
  }
  if (!state.categories.find(c => c.id === state.activeCategory)) {
    state.activeCategory = state.categories[0]?.id || null;
  }
  renderCategories();
  renderTextures();
}

$('btn-back').addEventListener('click', () => {
  $('editor-screen').classList.remove('active');
  $('home-screen').classList.add('active');
});

$('btn-export').addEventListener('click', async () => {
  try {
    const count = await Storage.exportPack(state);
    if (count === 0 && !confirm('В паке нет файлов. Всё равно скачать?')) return;
  } catch (err) { console.error(err); alert('Ошибка: ' + err.message); }
});

function renderCategories() {
  const ul = $('categories');
  ul.innerHTML = '';
  if (!state.categories.length) {
    const li = document.createElement('li');
    li.innerHTML = '<span class="cat-name" style="color:#6b7280;font-style:italic">Нет категорий</span>';
    ul.appendChild(li);
    return;
  }
  state.categories.forEach(cat => {
    const li = document.createElement('li');
    if (cat.id === state.activeCategory) li.classList.add('active');
    const count = Object.keys(state.textures[cat.id] || {}).length;
    li.innerHTML = `
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-name">${escapeHtml(cat.name)}</span>
      <span class="cat-count">${count}</span>
    `;
    li.onclick = () => { state.activeCategory = cat.id; renderCategories(); renderTextures(); };
    li.addEventListener('mousemove', e => {
      const r = li.getBoundingClientRect();
      li.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      li.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
    ul.appendChild(li);
  });
}

$('btn-add-cat').addEventListener('click', () => {
  const name = prompt('Название категории (латиницей, без пробелов):');
  if (!name) return;
  const id = name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_\/]/g, '');
  if (!id) { alert('Некорректное'); return; }
  if (state.categories.find(c => c.id === id)) { alert('Уже есть'); return; }
  state.categories.push({ id, name: catName(id), icon: catIcon(id) });
  sortCategories();
  state.textures[id] = {};
  state.activeCategory = id;
  renderCategories();
  renderTextures();
});

function renderTextures() {
  const grid = $('texture-grid');
  const empty = $('empty-state');
  const cat = state.categories.find(c => c.id === state.activeCategory);
  $('cat-title').textContent = cat ? cat.name : '—';
  grid.innerHTML = '';
  if (!cat) { empty.hidden = false; return; }
  const files = state.textures[cat.id] || {};
  const names = Object.keys(files).sort();
  if (!names.length) { empty.hidden = false; return; }
  empty.hidden = true;
  names.forEach(name => {
    const dataUrl = files[name];
    const img = isImageDataUrl(dataUrl, name);
    const card = document.createElement('div');
    card.className = 'tex-card';
    const inner = img ? `<img src="${dataUrl}" alt="">` : `<div class="file-ico">📄</div>`;
    card.innerHTML = `
      <div class="tex-thumb">${inner}</div>
      <div class="tex-name" title="${escapeHtml(name)}">${escapeHtml(name)}</div>
      <button class="tex-del" title="Удалить">✕</button>
    `;
    card.addEventListener('click', e => {
      if (e.target.classList.contains('tex-del')) return;
      if (img) openPainter(state.activeCategory, name, dataUrl);
      else if (isTextFile(name)) openTextEditor(state.activeCategory, name, dataUrl);
    });
    card.querySelector('.tex-del').addEventListener('click', e => {
      e.stopPropagation();
      if (confirm(`Удалить "${name}"?`)) {
        delete state.textures[state.activeCategory][name];
        renderCategories(); renderTextures();
      }
    });
    grid.appendChild(card);
  });
}

/* ============================================================
   TEXT EDITOR
   ============================================================ */
const textModal = $('text-modal');
let textContext = { cat: null, name: null };

function openTextEditor(cat, name, dataUrl) {
  textContext = { cat, name };
  $('text-filename').value = name;
  $('text-content').value = textDataUrlToText(dataUrl);
  textModal.classList.add('active');
  setTimeout(() => $('text-content').focus(), 50);
}
function closeTextEditor() { textModal.classList.remove('active'); textContext = { cat: null, name: null }; }
$('text-cancel').addEventListener('click', closeTextEditor);
textModal.addEventListener('click', e => { if (e.target === textModal) closeTextEditor(); });
$('text-save').addEventListener('click', () => {
  let name = $('text-filename').value.trim();
  if (!name) { alert('Введи имя'); return; }
  const content = $('text-content').value;
  const dataUrl = textToDataUrl(content);
  const cat = textContext.cat;
  if (!state.textures[cat]) state.textures[cat] = {};
  if (textContext.name !== name) delete state.textures[cat][textContext.name];
  state.textures[cat][name] = dataUrl;
  closeTextEditor(); renderCategories(); renderTextures();
});
document.addEventListener('keydown', e => {
  if (!textModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeTextEditor();
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); $('text-save').click(); }
});

/* ============================================================
   NEW TEXTURE MODAL — 2 ВКЛАДКИ
   ============================================================ */
const newtexModal = $('newtex-modal');
let newtexActiveTab = 'create';
let libraryActiveCat = null;

function openNewTextureModal() {
  if (!state.activeCategory) { alert('Сначала выбери категорию'); return; }
  $('newtex-name').value = '';
  $('newtex-w').value = 16;
  $('newtex-h').value = 16;
  $('newtex-search').value = '';
  libraryActiveCat = null;
  updateLibraryCountBadge();
  switchPickerTab('create');
  newtexModal.classList.add('active');
}
function closeNewTextureModal() { newtexModal.classList.remove('active'); }

function switchPickerTab(tab) {
  newtexActiveTab = tab;

  document.querySelectorAll('.picker-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });

  const panelCreate = $('newtex-panel-create');
  const panelLibrary = $('newtex-panel-library');

  if (tab === 'create') {
    panelCreate.hidden = false;
    panelCreate.style.display = 'flex';
    panelLibrary.hidden = true;
    panelLibrary.style.display = 'none';
    setTimeout(() => $('newtex-name').focus(), 60);
  } else {
    panelCreate.hidden = true;
    panelCreate.style.display = 'none';
    panelLibrary.hidden = false;
    panelLibrary.style.display = 'flex';
    renderLibrary();
    setTimeout(() => $('newtex-search').focus(), 60);
  }
}

function updateLibraryCountBadge() {
  let total = 0;
  for (const cat of Object.keys(TEXTURE_LIBRARY)) total += Object.keys(TEXTURE_LIBRARY[cat]).length;
  const badge = $('newtex-library-count');
  if (badge) badge.textContent = `${total} ванильных текстур`;
}

function renderLibraryCats() {
  const wrap = $('newtex-lib-cats');
  wrap.innerHTML = '';

  const totalAll = Object.values(TEXTURE_LIBRARY).reduce((s, c) => s + Object.keys(c).length, 0);
  const allBtn = document.createElement('button');
  allBtn.className = 'lib-cat' + (libraryActiveCat === null ? ' active' : '');
  allBtn.type = 'button';
  allBtn.innerHTML = `★ Все <span class="lc-count">${totalAll}</span>`;
  allBtn.onclick = () => { libraryActiveCat = null; renderLibraryCats(); renderLibraryGrid(); };
  wrap.appendChild(allBtn);

  Object.keys(TEXTURE_LIBRARY).forEach(catId => {
    const cat = state.categories.find(c => c.id === catId) || { id: catId, icon: catIcon(catId), name: catName(catId) };
    const count = Object.keys(TEXTURE_LIBRARY[catId]).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lib-cat' + (libraryActiveCat === catId ? ' active' : '');
    btn.innerHTML = `${cat.icon} ${cat.name} <span class="lc-count">${count}</span>`;
    btn.onclick = () => { libraryActiveCat = catId; renderLibraryCats(); renderLibraryGrid(); };
    wrap.appendChild(btn);
  });
}

function renderLibraryGrid() {
  const list = $('newtex-list');
  const search = $('newtex-search').value.trim().toLowerCase();
  const counter = $('newtex-count');

  const all = [];
  for (const catId of Object.keys(TEXTURE_LIBRARY)) {
    const cat = TEXTURE_LIBRARY[catId];
    for (const name of Object.keys(cat)) {
      const [w, h, ru] = cat[name];
      all.push({ cat: catId, name, w, h, ru: ru || '' });
    }
  }

  let filtered = all;
  if (libraryActiveCat) filtered = filtered.filter(t => t.cat === libraryActiveCat);
  if (search) {
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(search) ||
      (t.ru && t.ru.toLowerCase().includes(search))
    );
  }

  counter.textContent = filtered.length;

  if (!filtered.length) {
    list.innerHTML = `
      <div class="existing-empty">
        <span class="ee-icon">🔍</span>
        <p>Ничего не найдено. Попробуй другое слово.</p>
      </div>`;
    return;
  }

  const groups = {};
  for (const t of filtered) {
    if (!groups[t.cat]) groups[t.cat] = [];
    groups[t.cat].push(t);
  }

  const sortedCats = Object.keys(groups).sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a), ib = CAT_ORDER.indexOf(b);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return a.localeCompare(b);
  });

  list.innerHTML = '';
  for (const catId of sortedCats) {
    const items = groups[catId].sort((a, b) => a.name.localeCompare(b.name));
    const cat = state.categories.find(c => c.id === catId) || { id: catId, icon: catIcon(catId), name: catName(catId) };

    const title = document.createElement('div');
    title.className = 'existing-group-title';
    title.innerHTML = `${cat.icon} ${escapeHtml(cat.name)} <span class="g-count">${items.length}</span>`;
    list.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'existing-grid';
    for (const t of items) {
      const btn = document.createElement('button');
      btn.className = 'existing-item';
      btn.type = 'button';
      btn.title = `${t.name}.png — ${t.ru} (${t.w}×${t.h})`;

      const emoji = t.w === t.h ? '🖼️' : (t.w > t.h ? '▭' : '▯');
      btn.innerHTML = `
        <div class="ei-thumb"><div class="ei-file-ico">${emoji}</div></div>
        <div class="ei-name">${escapeHtml(t.name)}.png</div>
        <div class="ei-name-ru">${escapeHtml(t.ru)} · ${t.w}×${t.h}</div>
      `;

      btn.addEventListener('click', () => {
        if (!state.categories.find(c => c.id === t.cat)) {
          state.categories.push({ id: t.cat, name: catName(t.cat), icon: catIcon(t.cat) });
          sortCategories();
          if (!state.textures[t.cat]) state.textures[t.cat] = {};
        }
        state.activeCategory = t.cat;
        closeNewTextureModal();
        openPainter(t.cat, `${t.name}.png`, null, [t.w, t.h]);
      });
      grid.appendChild(btn);
    }
    list.appendChild(grid);
  }
}

function renderLibrary() {
  renderLibraryCats();
  renderLibraryGrid();
}

document.querySelectorAll('.picker-tab').forEach(btn => {
  btn.addEventListener('click', () => switchPickerTab(btn.dataset.tab));
});
$('newtex-close').addEventListener('click', closeNewTextureModal);
$('newtex-cancel').addEventListener('click', closeNewTextureModal);
newtexModal.addEventListener('click', e => { if (e.target === newtexModal) closeNewTextureModal(); });
$('newtex-search').addEventListener('input', renderLibraryGrid);
$('newtex-ok').addEventListener('click', () => {
  let name = $('newtex-name').value.trim();
  if (!name) { alert('Введи имя'); return; }
  if (!/\.png$/i.test(name)) name += '.png';
  const w = Math.max(1, Math.min(512, parseInt($('newtex-w').value, 10) || 16));
  const h = Math.max(1, Math.min(512, parseInt($('newtex-h').value, 10) || 16));
  closeNewTextureModal();
  openPainter(state.activeCategory, name, null, [w, h]);
});
document.addEventListener('keydown', e => {
  if (!newtexModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeNewTextureModal();
  if (e.key === 'Enter' && newtexActiveTab === 'create' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault(); $('newtex-ok').click();
  }
});
$('btn-new-texture').addEventListener('click', openNewTextureModal);
$('btn-empty-new').addEventListener('click', openNewTextureModal);

$('btn-import-textures').addEventListener('click', () => {
  if (!state.activeCategory) { alert('Нет активной категории'); return; }
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/png';
  inp.multiple = true;
  inp.onchange = async () => {
    const files = [...inp.files];
    for (const f of files) {
      const dataUrl = await fileToDataURL(f);
      let name = f.name;
      if (!/\.png$/i.test(name)) name += '.png';
      const cat = state.textures[state.activeCategory];
      if (cat[name]) {
        const base = name.replace(/\.png$/i, '');
        let i = 2;
        while (cat[`${base}_${i}.png`]) i++;
        name = `${base}_${i}.png`;
      }
      cat[name] = dataUrl;
    }
    renderCategories(); renderTextures();
  };
  inp.click();
});

/* ============================================================
   PAINTER
   ============================================================ */
const painterModal = $('painter-modal');
const painterNameInput = $('painter-name');
const paintCanvas = $('paint-canvas');
const gridOverlay = $('grid-overlay');
const canvasStage = $('canvas-stage');
const canvasViewport = $('canvas-viewport');
const canvasInfo = $('canvas-info');
const zoomDisplay = $('zoom-display');

const editor = new TextureEditor(paintCanvas, gridOverlay, canvasStage, canvasViewport);

const PALETTE = [
  '#000000','#1a1a1a','#333333','#555555','#808080','#aaaaaa','#d4d4d4','#ffffff',
  '#5b3a1e','#8b5a2b','#a0522d','#c19a6b','#d4a373','#e6c79c','#f5deb3','#ffebcd',
  '#7f1d1d','#b91c1c','#dc2626','#ef4444','#f87171','#fca5a5','#fecaca','#fee2e2',
  '#14532d','#166534','#16a34a','#22c55e','#4ade80','#86efac','#bbf7d0','#dcfce7',
  '#1e3a8a','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe','#dbeafe',
  '#4c1d95','#6d28d9','#7c3aed','#8b5cf6','#a78bfa','#c4b5fd','#ddd6fe','#ede9fe',
  '#78350f','#b45309','#d97706','#f59e0b','#fbbf24','#fcd34d','#fde68a','#fef3c7',
  '#831843','#be185d','#db2777','#ec4899','#f472b6','#f9a8d4','#fbcfe8','#fce7f3'
];
const paletteEl = $('palette');
PALETTE.forEach(c => {
  const b = document.createElement('button');
  b.style.background = c; b.title = c;
  b.onclick = () => setColor(c);
  paletteEl.appendChild(b);
});

const colorInput = $('color-input');
const colorHex = $('color-hex');
function setColor(hex) {
  hex = hex.toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(hex)) return;
  editor.color = hex;
  colorInput.value = hex;
  colorHex.value = hex;
}
colorInput.addEventListener('input', () => setColor(colorInput.value));
colorHex.addEventListener('input', () => {
  let v = colorHex.value.trim();
  if (!v.startsWith('#')) v = '#' + v;
  if (/^#[0-9a-f]{6}$/i.test(v)) setColor(v);
});
editor.onColorPick = hex => setColor(hex);

document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    editor.tool = btn.dataset.tool;
    canvasViewport.classList.toggle('hand-mode', btn.dataset.tool === 'hand');
  });
});

const brushRange = $('brush-range');
const brushValue = $('brush-value');
brushRange.addEventListener('input', () => {
  editor.brushSize = parseInt(brushRange.value, 10);
  brushValue.textContent = editor.brushSize;
});

const sizeWInput = $('size-w');
const sizeHInput = $('size-h');
function markSizeActive() {
  sizeWInput.value = editor.w; sizeHInput.value = editor.h;
  document.querySelectorAll('#size-list button').forEach(b => {
    b.classList.toggle('active', +b.dataset.w === editor.w && +b.dataset.h === editor.h);
  });
}
document.querySelectorAll('#size-list button').forEach(btn => {
  btn.addEventListener('click', () => {
    const w = +btn.dataset.w, h = +btn.dataset.h;
    if (editor.w === w && editor.h === h) return;
    if (editor.undoStack.length > 0 && !confirm('Изменение размера очистит холст. Продолжить?')) return;
    editor.setSize(w, h);
    editor.ctx.clearRect(0, 0, w, h);
    markSizeActive(); updateCanvasInfo();
  });
});
$('size-apply').addEventListener('click', () => {
  const w = Math.max(1, Math.min(512, parseInt(sizeWInput.value, 10) || 16));
  const h = Math.max(1, Math.min(512, parseInt(sizeHInput.value, 10) || 16));
  if (editor.w === w && editor.h === h) return;
  if (editor.undoStack.length > 0 && !confirm('Изменение размера очистит холст. Продолжить?')) return;
  editor.setSize(w, h);
  editor.ctx.clearRect(0, 0, w, h);
  markSizeActive(); updateCanvasInfo();
});
$('zoom-in').addEventListener('click', () => editor.zoomIn());
$('zoom-out').addEventListener('click', () => editor.zoomOut());
$('zoom-fit').addEventListener('click', () => editor.zoomFit());
$('zoom-reset').addEventListener('click', () => editor.zoomReset());
$('btn-center').addEventListener('click', () => editor.centerCanvas());
editor.onZoomChange = (z) => { zoomDisplay.textContent = Math.round(z) + 'px'; };
$('toggle-grid').addEventListener('change', e => editor.setGrid(e.target.checked));
$('btn-undo').addEventListener('click', () => editor.undo());
$('btn-redo').addEventListener('click', () => editor.redo());
$('btn-clear').addEventListener('click', () => { if (confirm('Очистить?')) editor.clear(); });
editor.onHistoryChange = () => {
  $('btn-undo').style.opacity = editor.undoStack.length ? '1' : '0.4';
  $('btn-redo').style.opacity = editor.redoStack.length ? '1' : '0.4';
};

let painterContext = { category: null, originalName: null, isNew: true };

async function openPainter(category, name, dataUrl, size) {
  painterContext = { category, originalName: name, isNew: !name };
  painterNameInput.value = name || 'texture.png';
  document.querySelectorAll('.tool-btn[data-tool]').forEach((b, i) => { b.classList.toggle('active', i === 0); });
  editor.tool = 'pencil';
  canvasViewport.classList.remove('hand-mode');
  setColor('#ffffff');
  $('toggle-grid').checked = true;
  editor.setGrid(true);
  brushRange.value = 1; brushValue.textContent = '1'; editor.brushSize = 1;
  painterModal.classList.add('active');
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  if (size) { editor.setSize(size[0], size[1]); editor.ctx.clearRect(0, 0, size[0], size[1]); }
  if (dataUrl) {
    await editor.load(dataUrl);
  } else {
    editor.undoStack = []; editor.redoStack = [];
    if (editor.onHistoryChange) editor.onHistoryChange();
    editor.zoomFit();
  }
  markSizeActive(); updateCanvasInfo();
  editor.onZoomChange(editor.zoom);
}

function updateCanvasInfo() { canvasInfo.textContent = `${editor.w} × ${editor.h}`; }
function closePainter() {
  painterModal.classList.remove('active');
  painterContext = { category: null, originalName: null, isNew: true };
}
$('painter-cancel').addEventListener('click', closePainter);
painterModal.addEventListener('click', e => { if (e.target === painterModal) closePainter(); });

document.addEventListener('keydown', e => {
  if (!painterModal.classList.contains('active')) return;
  if (e.key === 'Escape') { closePainter(); return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) editor.redo(); else editor.undo(); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); savePainter(); }
  if (e.target.tagName === 'INPUT') return;
  const map = { b: 'pencil', e: 'eraser', g: 'fill', i: 'picker', h: 'hand' };
  const t = map[e.key.toLowerCase()];
  if (t) {
    editor.tool = t;
    canvasViewport.classList.toggle('hand-mode', t === 'hand');
    document.querySelectorAll('.tool-btn[data-tool]').forEach(b => { b.classList.toggle('active', b.dataset.tool === t); });
  }
});

$('painter-import').addEventListener('click', () => $('painter-import-input').click());
$('painter-import-input').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = '';
  if (!f) return;
  const dataUrl = await fileToDataURL(f);
  await editor.load(dataUrl);
  markSizeActive(); updateCanvasInfo();
  if (painterContext.isNew && (!painterNameInput.value || painterNameInput.value === 'texture.png')) {
    painterNameInput.value = f.name;
  }
});

function savePainter() {
  let name = painterNameInput.value.trim();
  if (!name) { alert('Введи имя'); painterNameInput.focus(); return; }
  if (!/\.png$/i.test(name)) name += '.png';
  const dataUrl = editor.toDataURL();
  const cat = painterContext.category;
  if (!state.textures[cat]) state.textures[cat] = {};
  if (!painterContext.isNew && painterContext.originalName && painterContext.originalName !== name) {
    delete state.textures[cat][painterContext.originalName];
  }
  state.textures[cat][name] = dataUrl;
  closePainter();
  renderCategories(); renderTextures();
}
$('painter-save').addEventListener('click', savePainter);

/* ============================================================
   INIT
   ============================================================ */
setColor('#ffffff');
markSizeActive();
updateCanvasInfo();
brushValue.textContent = '1';
updateLibraryCountBadge();

(async () => { await tryAutoLoadRP(); })();
