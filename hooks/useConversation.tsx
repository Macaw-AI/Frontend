import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import useVoiceRecognition from "./useVoiceRecognition";
import { getResponseAndBase64AudioFromPrompt } from "../response_generating/responseGenerating";
import {
  addTextToResponseBody,
  CONVERSATION_RESPONSE,
  createConversationResponseTemplate,
} from "../response_generating/response_utilities";
import usePlay64EncodedAudio from "./usePlay64EncodedAudio";
import { SpeechResultsEvent } from "@react-native-voice/voice";
import { TEACHER } from "../utils/TeacherUtils";
import { SUBJECT } from "../utils/SubjectUtils";
import { useConversationHistory } from "./useConversationHistory";

const useConversation = (props: {
  locale: string;
  teacher: TEACHER;
  subject: SUBJECT;
}): {isProcessing: boolean, registerUserSpeech: () => void, playCurrentAudio: () => void, getTeacherResponse: () => void, recentHistory: string} => {
  console.log(JSON.stringify(props.teacher,null,2))
  const history = useConversationHistory(props.teacher.name, "Baxter");
  const recentHistory = history.getRecentConversationLines(3)
  const playAudio = usePlay64EncodedAudio();
  const [
    getTextFromSpeech
  ] = useVoiceRecognition(props.locale);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAudio,setCurrentAudio] = useState<string>("");
  const responseTemplate = createConversationResponseTemplate(
    props.teacher,
    props.subject,
    "Baxter",
    15
  );

  const registerUserSpeech = () => {
    setIsProcessing(true);
    getTextFromSpeech(
      (text: SpeechResultsEvent) => {
        const str: string = (text.value as string[])[0]
        history.addStudentResponse(str);
        setIsProcessing(false)
      },
      () => {
        setIsProcessing(false);
      }
    );
  };
  const playCurrentAudio = () => {
    if (currentAudio == "") {
      return;
    }
    playAudio(currentAudio);
  };

  const getTeacherResponse = () => {
    setIsProcessing(true)
    const x:CONVERSATION_RESPONSE = addTextToResponseBody(
      history.getRecentConversationLines(3),
      responseTemplate
    );
    getResponseAndBase64AudioFromPrompt(x)
      .then(([response, audio]) => {
        setCurrentAudio(audio)
        history.addTeacherResponse(response);
        setIsProcessing(false);
      })
      .catch((err) => setIsProcessing(false));
  };

  return {
    isProcessing,
    registerUserSpeech,
    playCurrentAudio,
    getTeacherResponse,
    recentHistory
  };
};

export default useConversation;
