# Анкети НПУ: Telegram Mini App

Файли:
- index.html: сторінка
- style.css: дизайн (світла і темна тема)
- app.js: анкети (масив FORMS), копіювання, інтеграція з Telegram

## Як запустити
1. Залий всю папку на HTTPS-хостинг:
   - GitHub Pages: створи репозиторій, завантаж файли, Settings > Pages > Deploy from branch
   - або Netlify / Vercel: перетягни папку в Netlify Drop
2. Скопіюй отримане посилання (https://...).
3. У @BotFather: /newapp (вибери бота, вкажи назву, опис і посилання)
   або /setmenubutton, щоб кнопка відкривала застосунок з меню чату.

## Як змінити анкети
Відкрий app.js і редагуй масив FORMS. Один відділ це один блок {id, name, title, role, q:[...]}.
