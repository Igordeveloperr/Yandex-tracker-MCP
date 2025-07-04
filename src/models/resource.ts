export const howToUseQuery = `
    1. Базовый синтаксис запроса
    Запрос состоит из условий в формате:
    "Ключ: [Оператор] Значение"
    Ключ - Название поля (например, Status, Assignee, Created).
    Оператор - Символ сравнения (см. раздел 3).
    Значение - Данные для поиска (если содержат пробелы — заключаются в кавычки: "В работе").
    
    C помощью \ можно экранировать специальные символы: \, " 

2. Логические операторы
    AND (И): Все условия должны выполняться.
    OR (ИЛИ): Хотя бы одно условие должно выполняться.
    
    Группировка: Скобки () для сложной логики.

    (Status: Open OR Status: "В работе") AND Queue: BACKEND  

3. Операторы сравнения
    >, <, >=, <=
    !   Не равно
    ~	Содержит подстроку (использовать только Summary)
    !~	Не содержит	(использовать только Summary)

4. Специальные функции
    empty()	    Пустое значение (параметр не задан)
    notEmpty()	Любое непустое значение (параметр задан)
    me()	    Имя пользователя, выполнившего запрос
    now()	    Текущее время с точностью до минуты	
    today()	    Интервал времени, соответствующий текущей дате
    week()	    Интервал дат, соответствующий текущей неделе
    month()	    Интервал дат, соответствующий текущему месяцу
    quarter()	Интервал дат, соответствующий текущему кварталу
    year()	    Интервал дат, соответствующий текущему году

5. Работа с датами
    Формат даты "YYYY-MM-DD" "2017-04-30"
    Формат даты и времени "YYYY-MM-DD XXh:XXm:XXs" "2017-04-30 17:25:00"
    Интервалы дат DD-MM-YYYY .. DD-MM-YYYY 2017-01-01 .. 2017-01-30
    Отрезок времени "XXM XXw XXd XXh XXm XXs" "2M 3d 5h 32m"
    Например:
    Фильтр для задач, созданных не раньше недели и одного дня назад:
    Created: > today() - "1w 1d"

6. Примеры сложных запросов
    Задачи в статусе «Open» или «В работе», назначенные мне:
    (Status: Open OR Status: "В работе") AND Assignee: me()  

    Ошибки (Bug) с высоким приоритетом, созданные после 1 января 2025:
    Type: Bug AND Priority: High AND Created: > 2025-01-01  

7. Сортировка
    Указания к сортировке указываются с помощью параметра \"Sort by\"
    \"Sort by\": поле1 [ASC/DESC][, поле2 [ASC/DESC][...]]
`;

export const userFieldsDoc = [
  {
    name: "self",
    description:
      "Адрес ресурса API, который содержит информацию об учетной записи пользователя.",
    type: "string",
  },
  {
    name: "uid",
    description:
      "Уникальный идентификатор учетной записи пользователя в Трекере.",
    type: "number",
  },
  {
    name: "id",
    description: "То же самое, что и uid.",
    type: "number",
  },
  {
    name: "login",
    description: "Логин пользователя.",
    type: "string",
  },
  {
    name: "trackerUid",
    description: "Уникальный идентификатор аккаунта пользователя в Трекере.",
    type: "number",
  },
  {
    name: "passportUid",
    description:
      "Уникальный идентификатор аккаунта пользователя в организации Яндекс 360 для бизнеса и Яндекс ID.",
    type: "number",
  },
  {
    name: "cloudUid",
    description:
      "Уникальный идентификатор пользователя в Yandex Cloud Organization.",
    type: "string",
  },
  {
    name: "firstName",
    description: "Имя пользователя.",
    type: "string",
  },
  {
    name: "lastName",
    description: "Фамилия пользователя.",
    type: "string",
  },
  {
    name: "display",
    description: "Отображаемое имя пользователя.",
    type: "string",
  },
  {
    name: "email",
    description: "Электронная почта пользователя.",
    type: "string",
  },
  {
    name: "hasLicense",
    description:
      "Признак наличия у пользователя полного доступа к Трекеру: true — полный доступ; false — только чтение.",
    type: "boolean",
  },
  {
    name: "dismissed",
    description:
      "Статус пользователя в организации: true — пользователь удален из организации; false — действующий сотрудник организации.",
    type: "boolean",
  },
  {
    name: "disableNotifications",
    description:
      "Признак принудительного отключения уведомлений для пользователя: true — уведомления отключены; false — уведомления включены.",
    type: "boolean",
  },
  {
    name: "firstLoginDate",
    description:
      "Дата и время первой авторизации пользователя в формате YYYY-MM-DDThh:mm:ss.sss±hhmm.",
    type: "string",
  },
  {
    name: "lastLoginDate",
    description:
      "Дата и время последней авторизации пользователя в формате YYYY-MM-DDThh:mm:ss.sss±hhmm.",
    type: "string",
  },
  {
    name: "welcomeMailSent",
    description:
      "Способ добавления пользователя: true — с помощью приглашения на почту; false — другим способом.",
    type: "boolean",
  },
];

export const queueFieldsDoc = [
  {
    name: "self",
    description: "Ссылка на очередь.",
    type: "string",
  },
  {
    name: "id",
    description: "Идентификатор очереди.",
    type: "string",
  },
  {
    name: "key",
    description: "Ключ очереди.",
    type: "string",
  },
  {
    name: "version",
    description:
      "Версия очереди. Каждое изменение очереди увеличивает номер версии.",
    type: "number",
  },
  {
    name: "name",
    description: "Название очереди.",
    type: "string",
  },
  {
    name: "description",
    description: "Текстовое описание очереди.",
    type: "string",
  },
  {
    name: "lead",
    description: "Блок с информацией о владельце очереди.",
    type: "object",
  },
  {
    name: "assignAuto",
    description:
      "Автоматически назначить исполнителя для новых задач очереди: true — назначить; false — не назначать.",
    type: "boolean",
  },
  {
    name: "defaultType",
    description: "Блок с информацией о типе задачи по умолчанию.",
    type: "object",
  },
  {
    name: "defaultPriority",
    description: "Блок с информацией о приоритете задачи по умолчанию.",
    type: "object",
  },
  {
    name: "teamUsers",
    description: "Массив с информацией об участниках команды очереди.",
    type: "object[]",
  },
  {
    name: "issueTypes",
    description: "Массив с информацией о типах задач очереди.",
    type: "object[]",
  },
  {
    name: "versions",
    description: "Массив с информацией о версиях очереди.",
    type: "object[]",
  },
  {
    name: "workflows",
    description: "Список жизненных циклов очереди и их типов задач.",
    type: "array",
  },
  {
    name: "denyVoting",
    description: "Признак возможности голосования за задачи.",
    type: "boolean",
  },
  {
    name: "issueTypesConfig",
    description: "Массив с настройками задач очереди.",
    type: "object[]",
  },
];

export const issueFieldsDoc = [
  {
    name: "self",
    description: "Адрес ресурса API, который содержит информацию о задаче.",
    type: "string",
  },
  {
    name: "id",
    description: "Идентификатор задачи.",
    type: "string",
  },
  {
    name: "key",
    description: "Ключ задачи.",
    type: "string",
  },
  {
    name: "version",
    description:
      "Версия задачи. Каждое изменение параметров задачи увеличивает номер версии. Редактирование задачи будет заблокировано, если версия достигнет предельного значения: для роботов 10100, для пользователей 11100.",
    type: "number",
  },
  {
    name: "lastCommentUpdatedAt",
    description:
      "Дата и время последнего добавленного комментария в формате YYYY-MM-DDThh:mm:ss.sss±hhmm.",
    type: "string",
  },
  {
    name: "summary",
    description: "Название задачи.",
    type: "string",
  },
  {
    name: "parent",
    description: "id родительской задачи.",
    type: "number",
  },
  {
    name: "aliases",
    description: "Массив с информацией об альтернативных ключах задачи.",
    type: "string[]",
  },
  {
    name: "updatedBy",
    description: "id последнего сотрудника, изменявшего задачу.",
    type: "number",
  },
  {
    name: "description",
    description: "Описание задачи.",
    type: "string",
  },
  {
    name: "sprint",
    description: "Массив id спринтов.",
    type: "number[]",
  },
  {
    name: "type",
    description: "id типа задачи.",
    type: "number",
  },
  {
    name: "priority",
    description: "id приоритета.",
    type: "number",
  },
  {
    name: "createdAt",
    description:
      "Дата и время создания задачи в формате YYYY-MM-DDThh:mm:ss.sss±hhmm.",
    type: "string",
  },
  {
    name: "followers",
    description: "id наблюдателей задачи.",
    type: "number[]",
  },
  {
    name: "createdBy",
    description: "id пользователя, создавшего задачи.",
    type: "number",
  },
  {
    name: "votes",
    description: "Количество голосов за задачу.",
    type: "number",
  },
  {
    name: "assignee",
    description: "id исполнителя задачи.",
    type: "number",
  },
  {
    name: "project",
    description: "id проекта задачи.",
    type: "number",
  },
  {
    name: "queue",
    description: "id очереди задачи.",
    type: "number",
  },
  {
    name: "updatedAt",
    description: "Дата и время последнего обновления задачи.",
    type: "string",
  },
  {
    name: "status",
    description: "id статуса задачи.",
    type: "number",
  },
  {
    name: "previousStatus",
    description: "id предыдущего статуса задачи.",
    type: "number",
  },
  {
    name: "favorite",
    description:
      "Признак избранной задачи: true — пользователь добавил задачу в избранное; false — задача не добавлена в избранное.",
    type: "boolean",
  },
];

export const queryParametersDoc = [
    {
      parameter: "Access",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, у которых в поле Доступ указаны заданные пользователи.",
      example: '"Access": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Affected Version",
      value: "Названия версий",
      description:
        "Поиск задач, у которых в поле Найдено в версиях указано заданное значение.",
      example: '"Affected Version": "14.09.1978"',
    },
    {
      parameter: "Assignee",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, исполнителями которых являются заданные пользователи.",
      example: '"Assignee": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Author",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, авторами которых являются заданные пользователи.",
      example: '"Author": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Block Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, у которых есть зависимые (блокируемые) задачи в заданных очередях.",
      example: '"Block Queue": TEST',
    },
    {
      parameter: "Clone",
      value: "Ключи задач",
      description: "Поиск задач, которые являются копиями заданных задач.",
      example: '"Clone": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Clones Of Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, которые являются копиями задач из заданных очередей.",
      example: '"Clones Of Queue": TEST, DEVELOP',
    },
    {
      parameter: "Comment",
      value: "Текстовая строка",
      description:
        'Поиск задач, у которых есть комментарии с заданным текстом.\nНайти задачи, комментарии к которым содержат слова и словоформы фразы:\n"Comment": "отличная работа"\nНайти задачи, комментарии к которым в точности содержат фразу:\n"Comment": #"отличная работа"',
      example: '"Comment": "отличная работа"',
    },
    {
      parameter: "Comment Author",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, в которых оставляли комментарии заданные пользователи.",
      example: '"Comment Author": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Component Owner",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, относящихся к компонентам, за которые отвечают заданные пользователи.",
      example: '"Component Owner": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Components",
      value: "Названия компонентов",
      description: "Поиск задач, относящихся к заданным компонентам.",
      example: '"Components": "бекенд", "фронтенд"',
    },
    {
      parameter: "Created",
      value: "Дата или интервал дат",
      description:
        "Поиск задач, созданных в заданный день или в заданном интервале дат.",
      example: '"Created": 2017-01-01..2017-01-30',
    },
    {
      parameter: "Deadline",
      value: "Дата или интервал дат",
      description:
        "Поиск задач, которые имеют дедлайн в заданный день или в заданном интервале дат.",
      example: '"Deadline": 2017-01-30',
    },
    {
      parameter: "Depend On Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, которые зависят от задач (блокируются задачами) из заданных очередей.",
      example: '"Depend On Queue": Тестирование',
    },
    {
      parameter: "Depends On",
      value: "Ключи задач",
      description:
        "Поиск задач, которые зависят от заданных задач (блокируются заданными задачами).",
      example: '"Depends On": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Description",
      value: "Текстовая строка",
      description:
        'Поиск задач, описание которых содержит заданный текст.\nНайти задачи, описание которых содержит слова и словоформы фразы:\n"Description": "изобрести велосипед"\nНайти задачи, описание которых в точности содержат фразу:\n"Description": #"изобрести велосипед"',
      example: '"Description": "изобрести велосипед"',
    },
    {
      parameter: "Duplicated In Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, которые имеют дублирующие задачи в заданных очередях.",
      example: '"Duplicated In Queue": TEST',
    },
    {
      parameter: "Duplicates",
      value: "Ключи задач",
      description: "Поиск задач, которые дублируют заданные задачи.",
      example: '"Duplicates": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Duplicates In Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, которые дублируют задачи из заданных очередей.",
      example: '"Duplicates In Queue": Тестирование',
    },
    {
      parameter: "End Date",
      value: "Дата или интервал дат",
      description:
        "Поиск задач, у которых значение поля Дата завершения совпадает с заданной датой или находится в заданном интервале дат.",
      example: '"End Date": 2017-01-30',
    },
    {
      parameter: "Epic",
      value: "Ключи эпиков",
      description: "Поиск задач, относящихся к заданным эпикам.",
      example: '"Epic": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Epics For Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск эпиков, к которым относятся задачи из заданных очередей.",
      example: '"Epics For Queue": TEST, DEVELOP',
    },
    {
      parameter: "Favorited by",
      value: "me()",
      description: "Поиск ваших избранных задач.",
      example: '"Favorited by": me()',
    },
    {
      parameter: "Filter",
      value: "Идентификаторы или имена фильтров",
      description:
        "Поиск задач, удовлетворяющих заданным фильтрам.\nПримечание. Если разные пользователи создали фильтры с одинаковыми именами, при выполнении одного и того же запроса с указанием имени фильтра они могут получить разные результаты, так как при поиске будет применен фильтр того пользователя, который выполняет запрос.",
      example: '"Filter": "Задачи моего отдела"',
    },
    {
      parameter: "Fix Version",
      value: "Названия версий",
      description:
        "Поиск задач, у которых в поле Исправить в версиях указано заданное значение.",
      example: '"Fix Version": "12.11.1986"',
    },
    {
      parameter: "Followers",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, наблюдателями которых являются заданные пользователи.",
      example: '"Followers": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Has Epic",
      value: "Ключи задач",
      description: "Поиск задач, которые относятся к заданным эпикам.",
      example: '"Has Epic": TASK-123',
    },
    {
      parameter: "Have Links To Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, которые имеют связи любого типа (родительские, дочерние, связанные, дубликат и так далее) с задачами из заданных очередей.",
      example: '"Have Links To Queue": TEST',
    },
    {
      parameter: "History",
      value: "Текстовая строка",
      description:
        "Поиск задач, в истории изменений которых есть слова и словоформы заданной фразы.\nПоиск выполняется только по значениям полей Название задачи и Описание задачи.",
      example: '"History": "проще простого"',
    },
    {
      parameter: "In Epics Of Queue",
      value: "Названия или ключи очередей",
      description: "Поиск задач, которые относятся к эпикам заданной очереди.",
      example: '"In Epics Of Queue": Тестирование',
    },
    {
      parameter: "Is Dependent By",
      value: "Ключи задач",
      description:
        "Поиск задач, которые блокируют (от которых зависят) заданные задачи.",
      example: '"Is Dependent By": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Is Duplicated By",
      value: "Ключи задач",
      description: "Поиск задач, которые дублируются заданными задачами.",
      example: '"Is Duplicated By": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Is Epic Of",
      value: "Ключи задач",
      description: "Поиск эпиков, к которым относятся заданные задачи.",
      example: '"Is Epic Of": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Is Parent Task For",
      value: "Ключи задач",
      description:
        "Поиск задач, которые являются родительскими для указанных задач.",
      example: '"Is Parent Task For": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Is Subtask For",
      value: "Ключи задач",
      description:
        "Поиск задач, которые являются дочерними для указанных задач.",
      example: '"Is Subtask For": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Key",
      value: "Ключи задач",
      description: "Поиск задач с заданными ключами.",
      example: '"Key": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Last comment",
      value: "Дата и время добавления последнего комментария",
      description:
        "Поиск задач, в которых определенное время не появлялись новые комментарии.",
      example: '"Last Comment": < now()-1h',
    },
    {
      parameter: "Linked to",
      value: "Ключи задач",
      description:
        "Поиск задач, которые имеют связи любого типа (родительские, дочерние, связанные, дубликат и так далее) с заданными задачами.",
      example: '"Linked to": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Modifier",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, последние изменения которых сделаны заданными пользователями.",
      example: '"Modifier": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Old Queue",
      value: "Названия или ключи очередей",
      description: "Поиск задач, перенесенных из заданных очередей.",
      example: '"Old Queue": TEST',
    },
    {
      parameter: "Original",
      value: "Ключи задач",
      description: "Поиск копий заданных задач.",
      example: '"Original": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Original Estimate",
      value: 'Отрезок времени в формате "XXw XXd XXh XXm XXs"',
      description: "Поиск задач с заданной первоначальной оценкой.",
      example: '"Original Estimate": "5d 2h 30m"',
    },
    {
      parameter: "Originals Of Queue",
      value: "Названия или ключи очередей",
      description: "Поиск задач, которые имеют копии в заданных очередях.",
      example: '"Originals Of Queue": Тестирование',
    },
    {
      parameter: "Parent Tasks For Queue",
      value: "Названия или ключи очередей",
      description: "Поиск задач, у которых есть подзадачи в заданных очередях.",
      example: '"Parent Tasks For Queue": TEST, DEVELOP',
    },
    {
      parameter: "Pending Reply From",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, в которых требуется ответ от заданного пользователя (пользователя призвали в комментарии).",
      example: '"Pending Reply From": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Priority",
      value: "Значения приоритета",
      description: "Поиск задач, которые имеют заданные значения приоритета.",
      example: '"Priority": "Minor", "Средний"',
    },
    {
      parameter: "Project",
      value: "Названия проектов",
      description: "Поиск задач, которые относятся к заданным проектам.",
      example: '"Project": "Perpetuum mobile"',
    },
    {
      parameter: "Queue",
      value: "Названия или ключи очередей",
      description: "Поиск задач, которые относятся к заданным очередям.",
      example: '"Queue": TEST',
    },
    {
      parameter: "Queue Owner",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач из очередей, владельцами которых являются заданные пользователи.",
      example: '"Queue Owner": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Related",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, авторами, исполнителями или наблюдателями которых являются заданные пользователи.",
      example: '"Related": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Related To Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, которые связаны с задачами определенных очередей (связь типа «Связанные»).",
      example: '"Related To Queue": Тестирование',
    },
    {
      parameter: "Relates",
      value: "Ключи задач",
      description:
        "Поиск задач, связанных с определенными задачами (связь типа «Связанные»).",
      example: '"Relates": "TASK-123", "TASK-321"',
    },
    {
      parameter: "Resolved",
      value: "Дата или интервал дат",
      description:
        "Поиск задач, которые были закрыты (была установлена резолюция) в заданный день или в заданном интервале дат.",
      example: '"Resolved": 2017-01-01..2017-01-30',
    },
    {
      parameter: "Resolver",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, которые закрыли (установили резолюцию) заданные пользователи.",
      example: '"Resolver": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Sprint",
      value: "Идентификаторы или названия спринтов",
      description: "Поиск задач, относящихся к заданным спринтам.",
      example: '"Sprint": "TrackerSprint32"',
    },
    {
      parameter: "Sprint In Progress By Board",
      value: "Идентификатор доски задач",
      description:
        "Поиск задач, относящихся к активному спринту на заданной доске задач.",
      example: '"Sprint In Progress By Board": 87',
    },
    {
      parameter: "Sprints By Board",
      value: "Идентификатор доски задач",
      description: "Поиск задач, относящихся к заданной доске задач.",
      example: '"Sprints By Board": 87',
    },
    {
      parameter: "Start Date",
      value: "Дата или интервал дат",
      description:
        "Поиск задач, у которых значение поля Дата начала совпадает с заданной датой или находится в заданном интервале дат.",
      example: '"Start Date": <2017-01-30',
    },
    {
      parameter: "Status",
      value: "Названия статусов",
      description: "Поиск задач, имеющих заданные статусы.",
      example: '"Status": Open, Resolved, Closed',
    },
    {
      parameter: "Story Points",
      value: "Число очков Story Points",
      description:
        "Поиск задач, имеющих заданную трудоемкость в очках Story Points.",
      example: '"Story Points": >=5',
    },
    {
      parameter: "Subtasks For Queue",
      value: "Названия или ключи очередей",
      description:
        "Поиск задач, у которых есть родительские задачи в заданных очередях.",
      example: '"Subtasks For Queue": TEST',
    },
    {
      parameter: "Summary",
      value: "Текстовая строка",
      description:
        'Поиск задач, название которых содержит заданный текст.\nНайти задачи, название которых содержит слова и словоформы фразы:\n"Summary": "изобрести велосипед"\nНайти задачи, название которых полностью совпадает с фразой:\n"Summary": #"изобрести велосипед"',
      example: '"Summary": "изобрести велосипед"',
    },
    {
      parameter: "Tags",
      value: "Теги задач",
      description: "Поиск задач, отмеченных заданными тегами.",
      example: '"Tags": "Поддержка", "wiki"',
    },
    {
      parameter: "Time Spent",
      value: 'Отрезок времени в формате "XXw XXd XXh XXm XXs"',
      description: "Поиск задач, на решение которых потрачено заданное время.",
      example: '"Time Spent": >"5d 2h 30m"',
    },
    {
      parameter: "Type",
      value: "Тип задачи",
      description: "Поиск задач с заданным типом.",
      example: '"Type": Epic',
    },
    {
      parameter: "Updated",
      value: "Дата или интервал дат",
      description:
        "Поиск задач, которые были изменены в заданный день или в заданном интервале дат.",
      example: '"Updated": >2017-01-30',
    },
    {
      parameter: "Voted by",
      value: "Логины или имена пользователей",
      description:
        "Поиск задач, за которые проголосовали заданные пользователи.",
      example: '"Voted By": user3370@, "Иван Иванов"',
    },
    {
      parameter: "Votes",
      value: "Число голосов",
      description: "Поиск задач, за которые отдали заданное число голосов.",
      example: '"Votes": > 6',
    },
];