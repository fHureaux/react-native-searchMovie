import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Search from "./Components/search";
import Movies from "./Components/movies";

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
        <Search />
      </View>
    );
  }
}
