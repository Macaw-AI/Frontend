export type CHAT_MESSAGE = {
  role: "user" | "assistant";
  content: string;
};

export type CHAT = CHAT_MESSAGE[];

const CONVERSATION_STARTER_CHAT: CHAT = [
  {
    role: "assistant",
    content: "Hi...",
  },
];

export default CONVERSATION_STARTER_CHAT;
