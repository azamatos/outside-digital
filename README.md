# Результат выполнения тестового задания для NodeJs разработчика

## Стек:
DB: PostgresSQL

Framework: express, nestJS 

## Описание

- [x] Реализовать CRUD для сущностей User и Tags. 

- [x] Сделать сервис с REST API и авторизациею по JWT bearer token.

- [x] Настроить CORS для доступа с любого origin. 

## Обязательные требования

- [x] Пароли не хранить в открытом виде 
- [x] Реализовать валидацию полей на api запросы с кодами ответов и сообщениями об ошибке в теле ответа. 
- [ ] Развернуть проект в любом удобном месте, что бы можно было прогнать тесты и проверить.
- [x] Код на github или gitlab
- [x] Придерживаться принципам SOLID
- [x] Токен авторизации живет 30 минут
- [x] Реализовать endpoint для обновления токена
- [x] Создать миграции
- [x] Написать сопроводительную документация в README.md для разворота
- [x] Реализовать offset или пагинацию для сущности **TAG**
- [x] Реализовать Сортировку по полю **sortOrder** и(или) полю **name** для сущности **TAG**

## Дополнительные требования

- [x] Использовать DTO
- [x] Писать интерфейсы и реализовывать их
- [ ] Желательно не использовать ORM
- [x] Написать DockerFile для приложения
- [x] Написать docker-composer для локального разворота приложения
- [ ] Реализовать кеширование
- [ ] Покрыть тестами сами api
- [x] Добавить генерацию swagger документации для api методов (или написать ручками и положит в проект в директорию /doc)

## Quick Start

1. Установка [Node.js](https://nodejs.org/en/download/).
2. Установка [Yarn](https://yarnpkg.com/lang/en/docs/install/).
3. Установка [Docker Compose](https://docs.docker.com/compose/install/).
4. Клонирование приложения с репозитория:

```bash
git clone https://github.com/azamatos/outside-digital.git
```

5. Установка зависимостей и пакетов

```bash
cd outside-digital-app
yarn
```
6. Миграции

```bash
yarn migration:generate migration_name
yarn migration:run
```

7. Собрать и запустить Docker image.

```bash
docker-compose up -d
```

8. Перейди по ссылке http://localhost:3000/api.

9. Документация с использованием swagger по адресу: http://localhost:3000/api/docs




