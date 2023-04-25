import { ScrollView, StyleSheet, Text, View, } from "react-native";
import { useNavigate } from "react-router-native";
import React, { useEffect, useState } from "react";
import { getTeacherListByLanguage, TEACHER } from "../../../utils/TeacherUtils";
import TeacherSelector from "./Selector";
import { LANGUAGE } from "../../../utils/Language";

type Props = {};
const NewConversation = (props: Props) => {
  const language = LANGUAGE.ENGLISH
  useEffect(() => {
    getTeacherListByLanguage(language).then((teacherList) => {
      setTeacherList(teacherList)
    })
  }, [])

  const navigate = useNavigate()
  const [teacherList, setTeacherList] = useState<TEACHER[]>([])

  function renderTeacherSelectors() {
    return teacherList.map((teacher: TEACHER) => {
      return <TeacherSelector
        title={teacher.name}
        description={teacher.character}
        onPress={() => {
          navigate("subject_selection", {
            state: {
              teacher: teacher,
              language: language
            }
          })
        }}
      />
    })
  }

  if (!teacherList) {
    return (<View>
      <Text>Loading teachers...</Text>
    </View>)
  }

  return (
    <ScrollView>
      {renderTeacherSelectors()}
    </ScrollView>
  );
};

export default NewConversation;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  startNewConversationButton: {
    width: "60%",
  },
  teacherSelector: {
    margin: "5%",
    marginTop: 0,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  teacherSelectorContent: {
    padding: "3%",
    paddingLeft: 0,
  },
  teacherSelectorTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  teacherSelectorDescription: {},
  teacherSelectorDescriptionContainer: {},
});

/* function TeacherSelector(props: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.teacherSelector}>
      <TouchableHighlight
        activeOpacity={0.85}
        underlayColor="lightgray"
        onPress={()=> props.onPress()}
      >
        <View style={styles.teacherSelectorContent}>
          <View>
            <Text style={styles.teacherSelectorTitle}>{props.title}</Text>
          </View>
          <View style={styles.teacherSelectorDescriptionContainer}>
            <Text style={styles.teacherSelectorContent}>
              {props.description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
} */
