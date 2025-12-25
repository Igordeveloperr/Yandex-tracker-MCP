# Таблица тестирования методом черного ящика для IYandexTrackerCreateAPI

| Описание | Пример запроса | Статус ответа |
|----------|----------------|---------------|
| Создание новой задачи | POST /api/v2/issues | 201 Created |
| Создание нового элемента чек-листа | POST /api/v2/issues/{issueKey}/checklistItems | 201 Created |
| Создание нового комментария | POST /api/v2/issues/{issueKey}/comments | 201 Created |
| Создание новой очереди | POST /api/v2/queues | 201 Created |
| Создание новой доски | POST /api/v2/boards | 201 Created |
| Создание нового спринта | POST /api/v2/sprints | 201 Created |