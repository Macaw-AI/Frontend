import Voice, {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
  SpeechVolumeChangeEvent,
} from "@react-native-voice/voice";
import React, { useState } from "react";

type Props = {};
type State = {
  recognized: boolean;
  pitch: number;
  error: string;
  ended: boolean;
  started: boolean;
  results: string[];
  partialResults: string[];
  volume: number;
  isListening: boolean;
};

function useVoiceRecognition(
  locale: string
): [
  any,
  () => Promise<void>,
  () => Promise<void>,
  () => Promise<void>,
  string[],
  string[],
  string,
  boolean
] {
  const [state, setState] = useState<State>({
    recognized: false,
    pitch: 0,
    error: "",
    ended: false,
    started: false,
    results: [],
    partialResults: [],
    volume: 0,
    isListening: false,
  });

  const getTextFromSpeech = async (
    callback: (e: SpeechResultsEvent) => void,
    onFailure: () => void
  ) => {
    Voice.onSpeechResults = callback;
    Voice.onSpeechError = () => {
      onFailure();
      setState((prevState) => {
        return {...prevState, started: false, isListening: false};
      });
    };
    await startRecognizing();
  };

  const onSpeechStart = (e: SpeechStartEvent) => {
    console.log("onSpeechStart: ", e);
    setState((prevState) => {
      return {
        ...prevState,
        started: true,
        isListening: true,
      };
    });
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log("onSpeechRecognized: ", e);
    setState((prevState) => {
      return {
        ...prevState,
        recognized: true,
      };
    });
  };

  const onSpeechEnd = (e: SpeechEndEvent) => {
    console.log("onSpeechEnd: ", e);
    setState((prevState) => {
      return {
        ...prevState,
        ended: true,
        isListening: false,
      };
    });
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log("onSpeechError: ", e);
    setState((prevState) => {
      return {
        ...prevState,
        error: JSON.stringify(e),
        ended: true,
        isListening: false,
      };
    });
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechResults: ", e);
    if (e.value == undefined) return;
    setState((prevState) => {
      return {
        ...prevState,
        results: e.value as string[],
        isListening: false,
      };
    });
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechPartialResults: ", e);
    if (e.value == undefined) return;
    setState((prevState) => {
      return {
        ...prevState,
        partialResults: e.value as string[],
      };
    });
  };

  const onSpeechVolumeChanged = (e: SpeechVolumeChangeEvent) => {
    console.log("onSpeechVolumeChanged: ", e);
    if (e.value == undefined) return;
    setState((prevState) => {
      return {
        ...prevState,
        volume: e.value as number,
      };
    });
  };

  const startRecognizing = async () => {
    setState({
      recognized: false,
      pitch: 0,
      error: "",
      started: false,
      results: [],
      partialResults: [],
      ended: false,
      volume: 0,
      isListening: true,
    });

    try {
      await Voice.start(locale, {});
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setState({
      recognized: false,
      pitch: 0,
      error: "",
      started: false,
      results: [],
      partialResults: [],
      ended: false,
      volume: 0,
      isListening: false,
    });
  };

  Voice.onSpeechStart = onSpeechStart;
  Voice.onSpeechRecognized = onSpeechRecognized;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechPartialResults = onSpeechPartialResults;
  Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

  return [
    getTextFromSpeech,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    state.partialResults,
    state.results,
    state.error,
    state.isListening,
  ];
}

export default useVoiceRecognition;
