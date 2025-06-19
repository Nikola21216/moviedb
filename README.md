# MovieDB – MongoDB Проект

## Описание на базата данни

Проектът представлява MongoDB база данни за филми. Тя съдържа пет взаимосвързани колекции, които моделират реална филмова система с информация за филми, актьори, режисьори, потребители и оценки.

---

## Колекции

### 1. `movies`
- `title`: Име на филма (string)
- `year`: Година на издаване (number)
- `genre`: Масив от жанрове (array)
- `director_id`: ID на режисьора (ObjectId)
- `actor_ids`: Масив от ID-та на актьори (array of ObjectId)
- `details`: Обект с допълнителна информация (обект с `duration`, `language`, `rating`)

### 2. `actors`
- `name`: Име на актьора (string)
- `birthdate`: Дата на раждане (string или date)
- `nationality`: Националност (string)
- `awards`: Масив от награди (array)

### 3. `directors`
- `name`: Име на режисьора (string)
- `birthdate`: Дата на раждане (string или date)
- `films_directed`: Брой филми (number)
- `nationality`: Националност (string)

### 4. `users`
- `username`: Потребителско име (string)
- `email`: Имейл адрес (string)
- `favorites`: Любими филми (array от ObjectId)
- `preferences`: Обект с предпочитания (напр. жанрове)

### 5. `ratings`
- `user_id`: ID на потребителя (ObjectId)
- `movie_id`: ID на филма (ObjectId)
- `score`: Оценка от 1 до 10 (number)
- `comment`: Коментар (string)
- `date`: Дата на оценката (string или date)

---

## Инструкции за инсталиране и стартиране на базата данни

### Изисквания:
- MongoDB Community Server или MongoDB Atlas акаунт
- MongoDB Shell (mongosh) или MongoDB Compass
- Node.js и npm (опционално, ако се използват скриптове)

---

### Стъпки за локално инсталиране:

#### 1. Инсталирай MongoDB
- **Windows/macOS:** Изтегли и инсталирай MongoDB от [mongodb.com](https://www.mongodb.com/try/download/community)
- **Ubuntu/Linux:**
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
2. Стартирай MongoDB:
mongod
3. Отвори MongoDB Shell:
mongosh
4. Създай базата данни:
use moviedb
