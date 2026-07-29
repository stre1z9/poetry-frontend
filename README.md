# Poetry.

Персональный сайт для публикации и чтения стихотворений.

Проект представляет собой полноценное веб-приложение с публичной частью для читателей и административной панелью для управления стихотворениями, тегами и комментариями.

---

## ✨ Возможности

### 📖 Публичная часть

* просмотр всех опубликованных стихотворений;
* отдельная страница каждого стихотворения;
* отображение описания и даты публикации;
* система тегов;
* страницы стихотворений по тегам;
* комментарии без регистрации;
* модерация комментариев перед публикацией;
* адаптивный интерфейс.

### 🔐 Административная панель

* авторизация администратора;
* создание стихотворений;
* редактирование стихотворений;
* удаление стихотворений;
* публикация и работа с черновиками;
* создание и управление тегами;
* просмотр комментариев;
* одобрение комментариев;
* удаление комментариев.

### 🎨 Интерфейс

Дизайн построен вокруг минималистичной эстетики, вдохновлённой GitHub и Notion.

Основные принципы:

* чистая типографика;
* минимум декоративных элементов;
* акцент на тексте;
* отсутствие перегруженных градиентов;
* плавные анимации;
* адаптивная вёрстка;
* понятная навигация.

---

## 🛠 Стек

### Frontend

* React
* React Router
* Axios
* Vite
* Bootstrap
* CSS

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Validation
* Hibernate
* Lombok

### Database

* PostgreSQL

### Deployment

* Docker
* Render
* Vercel

---

## 🏗 Архитектура

Проект разделён на frontend и backend.

```text
poetry/
│
├── poetry-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── api/
│   │
│   └── ...
│
└── poetry-backend/
    ├── src/
    │   └── main/
    │       └── java/
    │           └── com/
    │               └── denis/
    │                   └── poetrybackend/
    │                       ├── config/
    │                       ├── controller/
    │                       ├── dto/
    │                       ├── entity/
    │                       ├── mapper/
    │                       ├── repository/
    │                       ├── security/
    │                       └── service/
    │
    └── ...
```

---

## 🧩 Backend

Backend реализован на Spring Boot и построен по классической многослойной архитектуре:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

Дополнительно используются DTO и Mapper:

```text
Request DTO → Mapper → Entity → Repository
                                      ↓
Response DTO ← Mapper ← Entity ←──────┘
```

### Основные сущности

```text
Poem
 ├── id
 ├── title
 ├── slug
 ├── description
 ├── content
 ├── createdAt
 ├── updatedAt
 ├── published
 └── tags

Tag
 ├── id
 ├── name
 └── slug

Comment
 ├── id
 ├── authorName
 ├── content
 ├── createdAt
 ├── approved
 └── poem
```

---

## 🌐 API

### Стихотворения

```http
GET    /api/poems
GET    /api/poems/{slug}

POST   /api/admin/poems
GET    /api/admin/poems/{id}
PUT    /api/admin/poems/{id}
DELETE /api/admin/poems/{id}
```

### Теги

```http
GET    /api/tags
GET    /api/tags/{slug}

POST   /api/admin/tags
DELETE /api/admin/tags/{id}
```

### Комментарии

Публичные:

```http
GET  /api/poems/{slug}/comments
POST /api/poems/{slug}/comments
```

Административные:

```http
GET    /api/admin/comments
PATCH  /api/admin/comments/{id}/approve
DELETE /api/admin/comments/{id}
```

### Авторизация

```http
POST /api/admin/login
```

Для защищённых административных запросов используется Bearer Token:

```http
Authorization: Bearer <token>
```

---

## 🗃 Работа с комментариями

Комментарии доступны без регистрации.

После отправки комментарий получает статус:

```text
approved = false
```

и не отображается публично.

Администратор может:

```text
Новый комментарий
       ↓
   Модерация
       ↓
   ┌───────┐
   │       │
Одобрить  Удалить
   │
   ↓
Публикация
```

Это позволяет избежать появления нежелательного контента непосредственно на странице стихотворения.

---

## 🔗 Slug

Для стихотворений и тегов используется человекочитаемый `slug`.

Например:

```text
Галина
↓
galina

Размышления
↓
razmyshleniya
```

Для кириллицы используется собственная транслитерация.

---

## ⚙️ Запуск backend

### Требования

* Java 17+
* Maven
* PostgreSQL

Создайте базу данных:

```sql
CREATE DATABASE poetry_db;
```

Настройте подключение к PostgreSQL в `application.yml`.

После этого запустите:

```bash
./mvnw spring-boot:run
```

Backend будет доступен по адресу:

```text
http://localhost:8080
```

---

## ⚙️ Запуск frontend

### Требования

* Node.js
* npm

Установите зависимости:

```bash
npm install
```

Создайте `.env`:

```env
VITE_API_URL=http://localhost:8080
```

Запустите development-сервер:

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

---

## 🔐 Переменные окружения

Не рекомендуется хранить секретные данные непосредственно в исходном коде.

Backend:

```env
ADMIN_LOGIN=your_login
ADMIN_PASSWORD=your_password
ADMIN_TOKEN=your_token
```

Frontend:

```env
VITE_API_URL=http://localhost:8080
```

Для production значения должны задаваться через настройки окружения соответствующего сервиса.

---

## 🚀 Deployment

Архитектура production-окружения:

```text
                ┌──────────────────┐
                │     Vercel       │
                │                  │
                │ React + Vite     │
                └────────┬─────────┘
                         │
                         │ HTTP API
                         ↓
                ┌──────────────────┐
                │     Render       │
                │                  │
                │ Spring Boot      │
                │ Docker           │
                └────────┬─────────┘
                         │
                         ↓
                ┌──────────────────┐
                │   PostgreSQL     │
                └──────────────────┘
```

Frontend и backend разворачиваются независимо друг от друга.

---

## 📌 Текущий статус

Проект находится в активной разработке.

Реализовано:

* [x] React frontend
* [x] Spring Boot backend
* [x] PostgreSQL
* [x] CRUD стихотворений
* [x] Административная панель
* [x] Авторизация администратора
* [x] Теги
* [x] Фильтрация стихотворений по тегам
* [x] Комментарии
* [x] Модерация комментариев
* [x] CORS
* [x] Docker
* [x] Deployment frontend
* [x] Deployment backend
* [ ] Дополнительные улучшения интерфейса
* [ ] Дополнительные анимации

---

## 🎯 Цели проекта

Проект создаётся не только как площадка для публикации стихотворений, но и как практический full-stack проект.

В процессе разработки используются:

* REST API;
* React SPA;
* JWT/Bearer-подобная авторизация администратора;
* ORM и JPA;
* PostgreSQL;
* Docker;
* deployment;
* клиент-серверное взаимодействие;
* валидация данных;
* модерация пользовательского контента.

---

## 📄 License

Проект создан в учебных и личных целях.

Авторские тексты, опубликованные на сайте, не являются частью программного кода проекта и не предоставляются под лицензией исходного кода.
