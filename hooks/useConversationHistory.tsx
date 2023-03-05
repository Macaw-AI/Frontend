import { useRef } from "react";
import { TEACHER } from "../utils/TeacherUtils";

/* 
S
T
S
T
S
T
S
T
S
*/
const amountOfPairsToIncludeInResponse = 3;

export function useConversationHistory(
  teacherName: string,
  studentName: string
) {
  const teacherResponseList = useRef<string[]>([]);
  const studentResponseList = useRef<string[]>([]);

  function isTeacherResponseNext(): boolean {
    return (
      studentResponseList.current.length > teacherResponseList.current.length
    );
  }
  function isStudentResponseNext(): boolean {
    return (
      studentResponseList.current.length == teacherResponseList.current.length
    );
  }

  function addTeacherResponse(teacherResponse: string) {
    if (!isTeacherResponseNext()) {
      throw Error(
        "function addTeacherResponse: addStudentResponse call was expected"
      );
    }
    teacherResponseList.current.push(teacherResponse);
  }

  function addStudentResponse(studentResponse: string) {
    if (!isStudentResponseNext()) {
      throw Error(
        "function addStudentResponse: addTeacherResponse call was expected"
      );
    }
    studentResponseList.current.push(studentResponse);
  }

  function getRecentConversationLines(numberOfPairs: number): string {
    const list: string[] = [];
    
    if (teacherResponseList.current.length >= numberOfPairs) {
      for (let i = 0; i < numberOfPairs; i++) {
        list.push(
          "\n" +
            studentName + ": " +
            studentResponseList.current[
              studentResponseList.current.length - 1 - i
            ]
        );
        list.push(
          "\n" +
            teacherName + ": " +
            teacherResponseList.current[
              teacherResponseList.current.length - 1 - i
            ]
        );
      }
      list.reverse();
      return list.join();
    } else {
      for (let i = 0; i < teacherResponseList.current.length; i++) {
        list.push(
          "\n" +
            studentName + ": " +
            studentResponseList.current[
              studentResponseList.current.length - 1 - i
            ]
        );
        list.push(
          "\n" +
            teacherName + ": " +
            teacherResponseList.current[
              teacherResponseList.current.length - 1 - i
            ]
        );
      }
      list.push(
        "\n" +
          studentName + ": " +
          studentResponseList.current[studentResponseList.current.length - 1]
      );
      return list.join()
    }
  }

  return {
    addStudentResponse,
    addTeacherResponse,
    getRecentConversationLines,
  };
}
