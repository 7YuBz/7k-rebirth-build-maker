# Character Image Mapping

รูปตัวละครอยู่ที่:

`assets/characters/`

หลักการตั้งชื่อไฟล์คือใช้ `id` จาก:

`data/characters.js`

ตัวอย่าง:

- Rudy -> `assets/characters/rudy.png`
- Eileene -> `assets/characters/eileene.png`
- Sun Wukong -> `assets/characters/sun_wukong.png`

ใน `app.js` เว็บจะหาไฟล์รูปอัตโนมัติจาก:

`assets/characters/${c.id}.png`

ดังนั้นเวลาเพิ่มตัวละครใหม่ ให้เพิ่มข้อมูลตัวละครใน `data/characters.js`
แล้วตั้งชื่อ PNG ให้ตรงกับ `id` ของตัวละครนั้น

## หมายเหตุจากชุดรูปนี้

ไฟล์ต้นฉบับ `22_สไปค์_2.png` บนการ์ดจริงเป็น **ลิโป้ (Lubu)**
จึงถูกแก้ชื่อเป็น `lubu.png`

ตัวละครต่อไปนี้ยังไม่มี ID อยู่ใน `characters.js` เวอร์ชันนี้:
`yungon`, `skuld`, `klemis`, `orca`, `aris`, `sorin`

รูปถูกเตรียมไว้แล้ว แต่จะยังไม่แสดงใน dropdown จนกว่าจะเพิ่มข้อมูลตัวละครและค่าสถานะลงใน `data/characters.js`
