import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useConversation from "../../hooks/useConversation";
import { useLocation } from "react-router-native";
import EXAMPLE_TEACHER_LIST from "../../utils/TeacherUtils";
import EXAMPLE_SUBJECT_DICT from "../../utils/SubjectUtils";

type Props = {};

const ConversationTest = (props: Props) => {
  const location = useLocation();
  const teacher = EXAMPLE_TEACHER_LIST[2];
  const subject = EXAMPLE_SUBJECT_DICT.MrWernor[0];
  //location.state.subject;
  const {
    isProcessing,
    registerUserSpeech,
    playCurrentAudio,
    getTeacherResponse,
    recentHistory,
  } = useConversation({
    locale: "en-US",
    teacher,
    subject,
  });

  const handleCancelButton = () => {
  };
  const handleStartListeningButton = () => {
    registerUserSpeech();
  };

  const renderVoiceControlButton = () => {
    if (isProcessing) {
      return <Button title="Cancel" onPress={handleCancelButton}/>;
    } else {
      return (
        <View>
          <Text>{recentHistory}</Text>

          <Button
            title="Start listening..."
            onPress={handleStartListeningButton}
          />
          <Button title="play current audio" onPress={playCurrentAudio}/>

          <Button title="send response" onPress={getTeacherResponse}/>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bigBlue}>ConversationTest</Text>
      {renderVoiceControlButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

export default ConversationTest;
