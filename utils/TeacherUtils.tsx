import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { LANGUAGE } from "./Language";

const teacherListAPI =
  "https://europe-west1-talkgpt-8b68a.cloudfunctions.net/getTeacherList";

export type TEACHER = {
  name: string;
  character: string;
  related_subjects: string[];
  skill_level: string;
  few_shots: string[];
  TTS: {
    voice: {
      languageCode: string;
      name: string;
    };
    audioConfig: {
      audioEncoding: string;
      pitch: number;
      speakingRate: number;
    };
  };
};

export async function getTeacherListByLanguage(
  language: LANGUAGE
): Promise<TEACHER[]> {
  const data = { language: language.toString() };
  type RETURN_TYPE = {
    listOfTeacher: TEACHER[];
  };

  const res = await axios.post<RETURN_TYPE>(teacherListAPI, data);
  if (res.status != 200 || res.data.listOfTeacher == undefined) {
    return Promise.reject();
  }
  return Promise.resolve(res.data.listOfTeacher);
}
