# 7K-RE:BIRTH Build Maker v0.6.2

เวอร์ชันนี้ปรับเป็นโครงสร้าง Data-driven เพื่อให้อัปเดตตัวละคร, รูป, Options, Set และกฎ Progression ได้ง่ายขึ้น

## เปิดใช้งาน
เปิด `index.html` ได้เหมือนเวอร์ชันก่อน

## ไฟล์สำคัญ
- `UPDATE_GUIDE_TH.md` — คู่มือว่าต้องแก้อะไรที่ไฟล์ไหน
- `data/site_config.js` — ชื่อระบบ / แพทช์ / เครดิต
- `data/characters.js` — ฐานข้อมูลตัวละคร
- `data/equipment_options.js` — Main/Sub Option และค่า Roll
- `data/equipment_sets.js` — โบนัสเซต
- `data/stats.js` — Stat master
- `data/progression_rules.js` — Potential / Transcend
- `assets/characters/` — รูปตัวละคร

## Patch ที่แสดงในเวอร์ชันนี้
แพทช์ 20/08/2026 (โดยอง)

## GitHub Pages

เวอร์ชัน 0.6.1 เตรียมสำหรับ GitHub Pages แล้ว ดูขั้นตอนที่ `GITHUB_PAGES_GUIDE_TH.md`


## v0.6.2
- หน้าเลือกตัวละครจะแสดงเฉพาะตัวละครระดับ `LEGEND`
- ข้อมูลตัวละครระดับอื่นยังคงเก็บไว้ใน `data/characters.js` เพื่อใช้ในอนาคต
