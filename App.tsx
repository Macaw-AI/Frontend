import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ConversationTest from "./screens/conversation_test/ConversationTest";
import { NativeRouter, Routes, Route, Outlet } from "react-router-native";
import NewConversation from "./screens/main/new_conversation/NewConversation";
import PreviousConversations from "./screens/main/previous_conversations/PreviousConversation";
import BottomNavbar from "./screens/main/bottom_navbar/BottomNavbar";
import UserPage from "./screens/main/user_page/UserPage";
import SubjectSelection from "./screens/main/new_conversation/SubjectSelection";

export default function App() {
  return (
    <>
      <NativeRouter>
        <Routes>
          <Route path="/" element={<BottomNavbar />}>
            <Route index element={<NewConversation />} />
            <Route
              path="/previous_conversations"
              element={<PreviousConversations />}
            />
            <Route path="/subject_selection" element={<SubjectSelection />} />
            <Route path="/user_page" element={<UserPage />} />

            <Route path="/conversation" element={<ConversationTest />} />
          </Route>

        </Routes>
      </NativeRouter>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
