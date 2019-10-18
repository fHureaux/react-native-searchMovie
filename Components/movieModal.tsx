import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImageFromApi } from "../api/moviedbAPI";
import numeral from "numeral";

interface Props {
  handleClose: (movieIdSelected: number) => void;
  movie: any;
}

class MovieModal extends React.Component<Props, {}> {
  render() {
    const { handleClose, movie } = this.props;

    return (
      <View style={styles.main_container}>
        <View style={{ marginTop: 22 }}>
          <View>
            <Image
              style={styles.image}
              source={{ uri: getImageFromApi(movie["backdrop_path"]) }}
            />
            <View style={styles.information_container}>
              <Text style={styles.title_text}>{movie["title"] || "N/A"}</Text>
              <Text style={styles.description_text}>
                {movie["overview"] || "N/A"}
              </Text>
              <Text style={styles.default_text}>
                {movie["release_date"] || "N/A"}
              </Text>
              <Text style={styles.default_text}>
                Note : {movie["vote_average"]} / 10
              </Text>
              <Text style={styles.default_text}>
                Votes count : {movie["vote_count"]}
              </Text>
              <Text style={styles.default_text}>
                Budget : {numeral(movie["budget"]).format("0,0[.]00 $")}
              </Text>
              <Text style={styles.default_text}>
                Genre(s) :{" "}
                {movie["genres"]
                  .map(function(genre) {
                    return genre["name"];
                  })
                  .join(" / ")}
              </Text>
              <Text style={styles.default_text}>
                Production companies :{" "}
                {movie["production_companies"]
                  .map(function(company) {
                    return company["name"];
                  })
                  .join(" / ")}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                handleClose(0);
              }}
              style={styles.close_modal}
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  close_modal: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 50,
    position: "absolute",
    top: 5,
    right: 15
  },
  main_container: {
    flex: 1
  },
  information_container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5,
    backgroundColor: "gray"
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,
    // flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center"
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  }
});

export default MovieModal;
