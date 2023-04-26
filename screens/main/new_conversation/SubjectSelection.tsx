import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router-native";
import TeacherSelector from "./Selector";
import { getSubjectListByLanguageAndTeacherName, SUBJECT, } from "../../../utils/SubjectUtils";

type Props = {};

const SubjectSelection = (props: Props) => {
  const selectedTeacher = useLocation().state.teacher;
  const [subjectList, setSubjectList] = useState<SUBJECT[]>([]);
  const navigate = useNavigate();

  const {teacher, language} = useLocation().state;

  useEffect(() => {
    getSubjectListByLanguageAndTeacherName(language, teacher.name).then(
      (subjectList) => {
        setSubjectList(subjectList)
      }
    ).catch((err) => console.log(err));
  }, []);

  function renderSubjectSelectors() {
    return subjectList.map((subject: SUBJECT) => {
      return (
        <TeacherSelector
          key={subject.name}
          title={subject.name}
          description={subject.related.join("\n")}
          onPress={() => {
            navigate("/conversation", {
              replace: true,
              relative: "path",
              state: {
                teacher: selectedTeacher,
                subject: subject,
              },
            });
          }}
        />
      );
    });
  }

  if (!subjectList) {
    return (
      <View>
        <Text> Loading subjects...</Text>
      </View>
    )
  }
  return <ScrollView>{renderSubjectSelectors()}</ScrollView>;
};

export default SubjectSelection;
