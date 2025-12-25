# Таблица тестирования методом черного ящика для IYandexTrackerReadAPI

| Описание | Пример запроса | Статус ответа |
|----------|----------------|---------------|
| Получение списка досок | GET /api/v2/boards | 200 OK |
| Получение спринтов для доски | GET /api/v2/boards/{boardId}/sprints | 200 OK |
| Получение информации о спринте | GET /api/v2/sprints/{sprintId} | 200 OK |
| Получение полей задачи | GET /api/v2/fields | 200 OK |
| Получение комментариев к задаче | GET /api/v2/issues/{issueKey}/comments?page=1&perPage=10 | 200 OK |
| Получение чек-листа задачи | GET /api/v2/issues/{issueKey}/checklists?page=1&perPage=10 | 200 OK |
| Получение истории изменений задачи | GET /api/v2/issues/{issueKey}/changelog?page=1&perPage=10 | 200 OK |
| Получение доступных переходов задачи | GET /api/v2/issues/{issueKey}/transitions | 200 OK |
| Получение очередей | GET /api/v2/queues?expand=user,assignee | 200 OK |
| Получение информации об очереди | GET /api/v2/queues/{queue_key} | 200 OK |
| Получение информации о задаче | GET /api/v2/issues/{issueKey} | 200 OK |
| Поиск задач по запросу | GET /api/v2/issues?q=summary:%D0%BF%D1%80%D0%B8%D0%BE%D1%80%D0%B8%D1%82%D0%B5%D1%82&page=1&perPage=10 | 200 OK |
| Получение списка пользователей | GET /api/v2/users | 200 OK |
| Получение информации о пользователе | GET /api/v2/users/{key} | 200 OK |
| Получение приоритетов | GET /api/v2/priorities | 200 OK |
| Получение типов задач | GET /api/v2/issuetypes | 200 OK |
| Получение статусов | GET /api/v2/statuses | 200 OK |