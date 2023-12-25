# [Проект: Mesto Backend](<https://github.com/Uncp1/mesto-backend>)

***
"Mesto Backend" - cерверная часть приложения Mesto.

Работа выполнена на курсе [Web+][yandex-practicum-web-plus] от [Yandex Практикум][yandex-practicum-url].

## Доступные роуты

```
// Пользователи
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя 
PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар

// Карточки
GET /cards — возвращает все карточки
POST /cards — создаёт карточку
DELETE /cards/:cardId — удаляет карточку по идентификатору 
PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки 
```
## Технологии


[TypeScript][tech-ts] 
[ESLint][tech-eslint] 
[Mongoose][tech-mongoose] 
[Express][tech-express] 
[Celebrate][tech-celebrate] 
[Winston][tech-winston] 

## Доступные скрипты

### `npm run start`

Запускает приложение express-сервер на локальном сервере http://localhost:3000.

### `npm run dev`

Запускает приложение в режиме разработки с hot-reload'ом на локальном сервере http://localhost:3000.

### `npm run build`

Генерирует оптимизированную сборку проекта в папке `dist/`.

### `npm run lint`

Запускает линтер.

## Запустить проект

- Клонировать проект - `git clone git@github.com:julfy-bs/mesto-backend.git`
- Установить зависимости `npm install`
- Запустить сервер для разработки `npm run dev`

&copy; Автор - [Фидлер Виктор][author-github]

  

[//]: # 'Общие переменные для проектов Yandex'

[yandex-practicum-web-plus]: https://practicum.yandex.ru/promo/long-courses/web

[yandex-practicum-url]: https://practicum.yandex.ru/

[//]: # 'Общие переменные автора'

[author-github]: https://github.com/Uncp1

[//]: # 'Переменные используемых технологий'

[tech-ts]: https://www.typescriptlang.org/

[tech-mongoose]: https://mongoosejs.com/

[tech-express]: https://expressjs.com/

[tech-winston]: https://github.com/bithavoc/express-winston

[tech-celebrate]: https://github.com/arb/celebrate

[tech-eslint]: https://eslint.org/

[tech-bcrypt]: https://www.npmjs.com/package/bcryptjs

[tech-jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken

[tech-validator]: https://www.npmjs.com/package/validator
