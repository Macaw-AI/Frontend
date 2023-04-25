import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableHighlight,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-native";
import babelConfig from "../../../babel.config";

const chat = require("./../../../assets/icons/chat.png");
const conversation = require("./../../../assets/icons/conversation.png");
const user = require("./../../../assets/icons/user.png");
type Props = {};
const BottomNavbar = (props: Props) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  return (
    <>
      <View style={{ backgroundColor: "#2EBFDF", borderBottomColor: "black", borderBottomWidth: 1 }}>
        <Text
          style={{
            fontSize: 30,
            margin: "2%",
            textAlign: "center",
            color: "white",
          }}
        >
          Menu
        </Text>
      </View>
      <View style={styles.content}>
        <Outlet />
      </View>
      <View style={styles.bottomNavbar}>
        <NavbarButton index={0} onPress={() =>navigate("/")} img={chat}/>
        <NavbarButton index={1} onPress={() =>navigate("/previous_conversations")} img={conversation}/>
        <NavbarButton index={2} onPress={() =>navigate("/user_page")} img={user}/>
      </View>
    </>
  );

  function NavbarButton(props: { index:number ,onPress: () => void; img: ImageSourcePropType}) {
    return (
      <TouchableHighlight
        underlayColor="#E8e8e8"
        style={props.index == selectedIndex? styles.navBarButtonSelected: styles.navBarButton}
        onPress={props.index == selectedIndex? () => {}: ()=>{props.onPress();setSelectedIndex(props.index)}}
      >
        <Image source={props.img} style={styles.icon} />
      </TouchableHighlight>
    );
  }
};

export default BottomNavbar;

const styles = StyleSheet.create({
  bottomNavbar: {
    position: "relative",
    backgroundColor: "white",
    display: "flex",
    height: "10%",
    borderTopColor: "black",
    borderTopWidth: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    /* paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10, */
  },
  icon: {
    height: "50%",
    width: "auto",
    aspectRatio: 1,
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  navBarButton: {
      paddingHorizontal: 10,
      borderRadius: 15,
  },
  navBarButtonSelected: {
    borderBottomColor: "black",
      borderBottomWidth: 2,
      paddingHorizontal: 10,
      borderRadius: 15,
  }

});
