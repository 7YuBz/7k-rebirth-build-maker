# คู่มือนำ 7K-RE:BIRTH Build Maker ขึ้น GitHub Pages

เวอร์ชันนี้เตรียมไว้สำหรับ GitHub Pages แล้ว โดยมีไฟล์ `.nojekyll` และใช้ path แบบ relative เช่น `assets/...` และ `data/...` จึงรองรับ URL แบบ `https://USERNAME.github.io/7k-rebirth-build-maker/`

## วิธีอัปโหลดครั้งแรก

1. สร้าง Repository ชื่อ `7k-rebirth-build-maker`
2. ตั้ง Visibility เป็น `Public`
3. ไม่ต้องสร้าง README / .gitignore / License ตอนสร้าง Repository
4. แตก ZIP เวอร์ชันนี้
5. อัปโหลด **ไฟล์และโฟลเดอร์ที่อยู่ข้างใน** ขึ้น Repository โดยให้ `index.html` อยู่ root ของ Repository
6. Commit changes
7. ไปที่ `Settings` → `Pages`
8. Source เลือก `Deploy from a branch`
9. Branch เลือก `main` และ Folder เลือก `/(root)`
10. กด Save และรอ Deploy

โครงสร้างที่ถูกต้อง:

```text
7k-rebirth-build-maker/
├── .nojekyll
├── index.html
├── app.js
├── styles.css
├── data/
├── assets/
└── ...
```

ไม่ควรมีโฟลเดอร์เวอร์ชันครอบ `index.html` อีกชั้น

## เวลาอัปเดตเว็บภายหลัง

ให้อัปโหลดไฟล์ที่แก้ไขทับไฟล์ชื่อเดิมใน Repository แล้ว Commit changes ใหม่ GitHub Pages จะ Deploy เวอร์ชันใหม่ให้อัตโนมัติ

## แก้ข้อความแพตช์/เครดิต

ไฟล์: `data/site_config.js`

```js
window.SITE_CONFIG = {
  app_name: '7K-RE:BIRTH Build Maker',
  patch_text: 'แพทช์ 20/08/2026',
  credit_text: '(โดยอง)',
  version: '0.6.1'
};
```

## หมายเหตุเรื่องภาพ Screenshot

ฟังก์ชันถ่ายภาพ Build ใช้ `html2canvas` จาก CDN ดังนั้นตอนกดถ่ายภาพ ผู้ใช้ควรเชื่อมต่ออินเทอร์เน็ต
