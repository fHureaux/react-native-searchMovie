import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { getImageFromApi } from "../api/moviedbAPI";

interface Props {
  movie: any;
  handleSelect: (movieIdToDisplay: number) => void;
}

class MovieItem extends React.Component<Props, {}> {
  render() {
    const { movie, handleSelect } = this.props;
    return (
      <TouchableOpacity onPress={() => handleSelect(movie["id"])}>
        <View style={styles.main_container}>
          <Image
            style={styles.image}
            source={{
              uri: getImageFromApi(movie["poster_path"])
            }}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{movie["title"] || "N/A"}</Text>
              <Text style={styles.vote_text}>
                {movie["vote_average"] || "N/A"}
              </Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>
                {movie["release_date"] || "N/A"}
              </Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={3}>
                {movie["overview"] || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row"
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray"
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: "row"
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666"
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666"
  },
  date_container: {
    flex: 1
  },
  date_text: {
    fontSize: 14
  }
});

export default MovieItem;
