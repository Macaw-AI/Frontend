import { SUBJECT } from "../utils/SubjectUtils";
import { TEACHER } from "../utils/TeacherUtils";

export type CONVERSATION_RESPONSE = {
  student: {
    name: string;
    age: number;
    model: string;
  };
  subject: {
    name: string;
    related: string[];
    questions: string;
  };
  teacher: {
    name: string;
    character: string;
    few_shots: string[];
    TTS: {
      voice: { languageCode: string; name: string };
      audioConfig: { audioEncoding: string; pitch: number; speakingRate: number };
    };
  };
  text: string;
};



//conversationRecord ends with user response
export function addTextToResponseBody(
  conversationRecord: string,
  template: CONVERSATION_RESPONSE
): CONVERSATION_RESPONSE {
  template.text = conversationRecord;
  return template;
}

//todo
export function createConversationResponseTemplate(
  teacher: TEACHER,
  subject: SUBJECT,
  name: string,
  age: number
): CONVERSATION_RESPONSE {
  const template: CONVERSATION_RESPONSE = {
    student: {
        name: name,
        age: age,
        model: "text-davinci-003" //todo add as parameter
    },
    subject,
    teacher,
    text: ""
};
  return template;
}
