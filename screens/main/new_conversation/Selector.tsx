import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function TeacherSelector(props: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.teacherSelector}>
      <TouchableHighlight
        activeOpacity={0.85}
        underlayColor="lightgray"
        onPress={() => props.onPress()}
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
}

const styles = StyleSheet.create({
  teacherSelector: {
    margin: "5%",
    marginTop: 0,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  teacherSelectorContent: {
    textAlign: "center",
    padding: "3%",
    paddingLeft: 0,
  },
  teacherSelectorTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  teacherSelectorDescription: {
    textAlign: "center",
  },
  teacherSelectorDescriptionContainer: {},
});
