import { View, SafeAreaView, Text, StyleSheet, Button } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import usePlay64EncodedAudio from "../../hooks/usePlay64EncodedAudio";
import { getResponseAndBase64AudioFromPrompt } from "../../response_generating/responseGenerating";
import useVoiceRecognition from "../../hooks/useVoiceRecognition";
import useConversation from "../../hooks/useConversation";
import { createConversationResponseTemplate } from "../../response_generating/response_utilities";
import { useLocation } from "react-router-native";
type Props = {};

const ConversationTest = (props: Props) => {
  const location = useLocation();
  const teacher = location.state.teacher;
  const subject = location.state.subject;
  console.log("conv test" + JSON.stringify(teacher,null,2))
  const {isProcessing, registerUserSpeech, playCurrentAudio,getTeacherResponse,recentHistory} = useConversation({
    locale: "en-US",
    teacher, subject
  });

  const handleCancelButton = () => {};
  const handleStartListeningButton = () => {
    console.log("piesulek");
    registerUserSpeech();
  };

  const renderVoiceControlButton = () => {
    if (isProcessing) {
      return <Button title="Cancel" onPress={handleCancelButton} />;
    } else {
      return (
        <View>
          <Text>
            {recentHistory}
          </Text>

        <Button
          title="Start listening..."
          onPress={handleStartListeningButton}
          />
          <Button
          title="play current audio"
          onPress={playCurrentAudio}
          />

          <Button 
          title="send response"
          onPress={getTeacherResponse}
          />
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
