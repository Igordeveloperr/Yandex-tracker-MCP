# Таблица тестирования методом черного ящика для IYandexTrackerDeleteAPI

| Описание | Пример запроса | Статус ответа |
|----------|----------------|---------------|
| Удаление чеклиста | DELETE /api/v2/issues/{issueKey}/checklistItems | 200 OK |
| Удаление элемента чеклиста | DELETE /api/v2/issues/{issueKey}/checklistItems/{checkListItemKey} | 200 OK |
| Удаление комментария | DELETE /api/v2/issues/{issueKey}/comments/{commentKey} | 204 No Content |
| Удаление очереди | DELETE /api/v2/queues/{queueKey} | 204 No Content |
| Удаление доски | DELETE /api/v2/boards/{boardId} | 204 No Content |