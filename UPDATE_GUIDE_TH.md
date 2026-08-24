# คู่มืออัปเดตข้อมูล — 7K-RE:BIRTH Build Maker

เวอร์ชันนี้แยกข้อมูลหลักออกจาก `app.js` แล้ว เพื่อให้เพิ่ม/แก้ข้อมูลในอนาคตโดยไม่ต้องแก้ Logic หลักของระบบ

## 1) แก้ชื่อระบบ / แพทช์ / เครดิต
ไฟล์: `data/site_config.js`

ตัวอย่าง:
```js
window.SITE_CONFIG = {
  app_name: '7K-RE:BIRTH Build Maker',
  patch_text: 'แพทช์ 20/08/2026',
  credit_text: '(โดยอง)',
  version: '0.6.0'
};
```
ถ้าจะเปลี่ยนข้อความ **แพทช์ 20/08/2026 (โดยอง)** ให้แก้ `patch_text` และ `credit_text` ในไฟล์นี้เท่านั้น

## 2) เพิ่มตัวละครใหม่ / แก้ Base Stat
ไฟล์: `data/characters.js`

เพิ่ม object ใหม่ใน `window.CHARACTERS` เช่น:
```js
{
  id: 'new_hero',
  name: 'New Hero',
  role: 'ATTACK',
  attack_type: 'MAGIC',
  base_attack: 1600,
  base_defense: 600,
  base_hp: 3500,
  base_speed: 30,
  transcend_primary: 'ATK',
  star4_bonus: 'CR',
  grade: 'LEGEND'
}
```
`attack_type` ใช้ `ATTACK` หรือ `MAGIC` เพื่อเลือกชนิดอาวุธให้อัตโนมัติ

## 3) เพิ่มรูปตัวละคร
โฟลเดอร์: `assets/characters/`

วิธีง่ายที่สุด: ตั้งชื่อรูปให้ตรงกับ `id` ของตัวละคร เช่น
- `id: 'fai'` → `assets/characters/fai.png`
- `id: 'new_hero'` → `assets/characters/new_hero.png`

ระบบจะโหลดรูปให้อัตโนมัติ ถ้าไม่พบรูปจะแสดงตัวอักษรตัวแรกแทน

ถ้าต้องการใช้ชื่อไฟล์อื่น เพิ่ม field `portrait` ในตัวละครได้ เช่น:
```js
portrait: 'assets/characters/fai_special.png'
```

## 4) แก้ Main Option / Sub Option / ค่า Roll
ไฟล์: `data/equipment_options.js`

- `window.MAIN_OPTIONS.weapon` = Main Option ของอาวุธ
- `window.MAIN_OPTIONS.armor` = Main Option ของเกราะ
- `window.SUB_OPTIONS` = ค่า Sub Option ตั้งแต่ Initial (index 0) ถึง Roll 5 (index 5)
- `window.OPTION_LABELS` = ชื่อไทยที่แสดงใน UI
- `window.PERCENT_OPTIONS` = รายการ option ที่ต้องแสดงเครื่องหมาย `%`

ตัวอย่าง Sub Option:
```js
critical_rate:[4,8,12,16,20,24]
```
หมายถึง Initial 4%, Roll 1 = 8%, ... Roll 5 = 24%

## 5) เพิ่ม/แก้เซตอุปกรณ์
ไฟล์: `data/equipment_sets.js`

ตัวอย่าง:
```js
assassin:{
  th:'นักฆ่า',
  two:{critical_rate:15},
  four:{critical_rate:30}
}
```
โบนัส 4 ชิ้นแทนโบนัส 2 ชิ้นตาม Logic ปัจจุบัน

## 6) เพิ่ม/แก้ค่าสถานะ Target / ชื่อ Stat / Icon
ไฟล์: `data/stats.js`

ตัวอย่าง:
```js
critical_rate:{
  th:'อัตราคริติคอล',
  icon:'critical_rate.png',
  unit:'%'
}
```
Icon อยู่ใน `assets/stats/`

> ถ้าเป็น Stat ใหม่ที่มีสูตรคำนวณแบบใหม่ ไม่ใช่การบวกตรง อาจต้องเพิ่ม Logic ใน `app.js` ด้วย

## 7) แก้ Potential / Transcend / โบนัสข้ามขีดจำกัด ★4
ไฟล์: `data/progression_rules.js`

แบ่งเป็น:
- `potential`
- `transcend`
- `star4_bonus`

ถ้าตัวเลขกฎเดิมเปลี่ยน สามารถแก้ในไฟล์นี้โดยไม่ต้องแก้ UI

## 8) รูปอุปกรณ์
โฟลเดอร์: `assets/equipment/`

มาตรฐานปัจจุบันยังใช้ชื่อ:
`<set_id>_1.png`, `<set_id>_2.png`, `<set_id>_3.png`

ที่ยืนยันแล้ว:
- `_3` = อาวุธ MAGIC
- ฝั่ง Armor และ ATTACK ใช้ mapping ที่ระบบปัจจุบันกำหนดอยู่

## 9) ไฟล์ที่ไม่ควรแก้ หากแก้แค่ข้อมูล
- `app.js` = Calculation Engine / Optimizer / UI Logic
- `styles.css` = หน้าตาเว็บ
- `index.html` = โครงสร้างหน้าเว็บ

ถ้าเป็นการเพิ่มตัวละคร, เปลี่ยนตัวเลข Stat, เปลี่ยนเซต, เพิ่มรูป หรือแก้แพทช์ ควรแก้ไฟล์ใน `data/` หรือ `assets/` ก่อน

## สรุปเร็ว
| ต้องการทำ | แก้ที่ไหน |
|---|---|
| เปลี่ยนแพทช์/เครดิต | `data/site_config.js` |
| เพิ่มตัวละคร | `data/characters.js` |
| เพิ่มรูปตัวละคร | `assets/characters/<character_id>.png` |
| แก้ Main/Sub Option | `data/equipment_options.js` |
| แก้เซต | `data/equipment_sets.js` |
| แก้ชื่อ/หน่วย/ไอคอน Stat | `data/stats.js` + `assets/stats/` |
| แก้ Potential/Transcend | `data/progression_rules.js` |
| แก้รูปอุปกรณ์ | `assets/equipment/` |
