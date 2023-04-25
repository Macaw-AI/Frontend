import { useState } from "react";
import { CHAT, CHAT_MESSAGE } from "../utils/Chat";

export function useConversationHistory(
  teacherName: string,
  studentName: string
) {
  const [chat, setChat] = useState<CHAT>([]);

  function isTeacherResponseNext(): boolean {
    return chat.length % 2 == 0;
  }

  function isStudentResponseNext(): boolean {
    return chat.length % 2 == 1;
  }

  function addTeacherResponse(teacherResponse: string) {
    if (!isTeacherResponseNext()) {
      throw Error(
        "function addTeacherResponse: addStudentResponse call was expected" +
        teacherResponse
      );
    }

    const newMessage: CHAT_MESSAGE = {
      role: "assistant",
      content: teacherResponse,
    };
    setChat((chat) => [...chat, newMessage]);
  }

  function addStudentResponse(studentResponse: string) {
    if (!isStudentResponseNext()) {
      throw Error(
        "function addStudentResponse: addTeacherResponse call was expected" +
        studentResponse
      );
    }
    const newMessage: CHAT_MESSAGE = {
      role: "user",
      content: studentResponse,
    };
    setChat((chat) => [...chat, newMessage]);
  }

  function getRecentConversationMessages(numberOfPairs: number): string {
    const chat: CHAT = [];
    //if number of messages is odd, the last message is from teacher
    //if number of messages is even, the last message is from student
    //even indexes are teachers
    //odd indexes are students
    let messagesWithPrefixes: string[] = [];

    let i = chat.length - 1;
    while (messagesWithPrefixes.length < 2 * numberOfPairs && i >= 0) {
      if ((chat[i].role = "assistant")) {
        messagesWithPrefixes.push(`${teacherName}: ${chat[i].content} `);
      } else {
        messagesWithPrefixes.push(`${studentName}: ${chat[i].content} `);
      }
      i--;
    }

    return messagesWithPrefixes.join();
  }

  return {
    addStudentResponse,
    addTeacherResponse,
    getRecentConversationLines: getRecentConversationMessages,
  };
}
