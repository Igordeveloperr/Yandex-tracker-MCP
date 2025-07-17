import { CallToolResult, GetPromptResult } from "@modelcontextprotocol/sdk/types";

export class McpRequestManagerService{
  // формирование ответа для tools
  public static receiveCallToolResult<Type>(response: Type): CallToolResult {
    try {
      return {
        content: [
          {
            type: "text",
            text:
              typeof response === "string"
                ? response
                : JSON.stringify(response),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Ошибка: ${
              error instanceof Error ? error.message : "Неизвестная ошибка"
            }`,
          },
        ],
        isError: true,
      };
    }
  }

  // формирование ответа для promts
  public static receivePromptResult(response: string): GetPromptResult {
    try {
      return {
        messages: [
          {
            role: "user" as const, // Важно указать константный тип
            content: {
              type: "text" as const, // Тип контента - текст
              text: response,
            },
          },
        ],
      };
    } catch (error) {
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: "Ошибка выполнения промпта",
            },
          },
        ],
      };
    }
  }
}