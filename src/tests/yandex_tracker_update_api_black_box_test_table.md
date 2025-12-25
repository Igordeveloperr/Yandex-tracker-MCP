# Таблица тестирования методом черного ящика для IYandexTrackerUpdateAPI

| Описание | Пример запроса | Статус ответа |
|----------|----------------|---------------|
| Обновление задачи | PATCH /api/v2/issues/{issueKey} | 200 OK |
| Обновление чеклиста | PATCH /api/v2/issues/{issueKey}/checklistItems/{checkListItemKey} | 200 OK |
| Обновление комментария | PATCH /api/v2/issues/{issueKey}/comments/{commentKey} | 200 OK |
| Обновление доски | PATCH /api/v2/boards/{boardId} | 200 OK |