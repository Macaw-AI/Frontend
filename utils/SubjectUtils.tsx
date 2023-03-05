import { LANGUAGE } from "./Language";

const subjectListAPI =
  "https://europe-west1-talkgpt-8b68a.cloudfunctions.net/getSubjectList";

export type SUBJECT = {
  name: string;
  related: string[];
  questions: string;
};

export async function getSubjectListByLanguageAndTeacherName(
  language: LANGUAGE,
  teacherName: string
): Promise<SUBJECT[]> {
  const body = {
      language: language.toString(),
      teacher: teacherName
  };
  try {
    const res = await fetch(subjectListAPI, {
      method: "Post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status != 200) {
      return Promise.reject();
    }
    const text = await res.text()
    console.log("TEXT: " + text)
    const listOfSubjects: SUBJECT[] = JSON.parse(text)[
      "listOfSubjects"
    ];
    if (listOfSubjects == undefined) {
      return Promise.reject();
    }
    return Promise.resolve<SUBJECT[]>(listOfSubjects);
  } catch (error) {
    return Promise.reject();
  }
}
