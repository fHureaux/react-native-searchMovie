import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Modal,
  Text
} from "react-native";
import { getFilmsFromText, getFilmFromId } from "../api/moviedbAPI";
import MovieItem from "./movieItem";
import MovieModal from "./movieModal";

interface State {
  movieToSearch: string;
  listMovies: Array<any>;
  isLoading: boolean;
  page: number;
  totalPage: number;
  movieIdSelected: number;
  movieToDisplay: any;
}

class Search extends React.Component<{}, State> {
  state: State = {
    movieToSearch: "",
    listMovies: [],
    isLoading: false,
    page: 0,
    totalPage: 0,
    movieIdSelected: 0,
    movieToDisplay: null
  };

  // Get the movie information from API
  setMovieIdSelected = (movieIdSelected: number) => {
    if (movieIdSelected === 0) {
      // If ID is 0, no movie has to be present in the modal
      this.setState({ movieIdSelected: movieIdSelected, movieToDisplay: null });
    } else {
      this.setState({ movieIdSelected: movieIdSelected });

      getFilmFromId(movieIdSelected).then(data => {
        this.setState({
          movieToDisplay: data
        });
      });
    }
  };

  // Get the movies list from api
  loadMovies = () => {
    this.setState({ isLoading: true });
    getFilmsFromText(this.state.movieToSearch, this.state.page + 1).then(
      data => {
        this.setState({
          listMovies: this.state.listMovies.concat(data["results"]), // Add movie to the current list (infinite scroll)
          isLoading: false,
          page: data["page"],
          totalPage: data["total_pages"]
        });
      }
    );
  };

  handleSubmit = () => {
    // If the search input isn't empty
    if (this.state.movieToSearch.length > 0) {
      this.setState({ page: 0, totalPage: 0, listMovies: [] }, () => {
        this.loadMovies();
      });
    }
  };

  render() {
    const {
      movieToSearch,
      listMovies,
      isLoading,
      page,
      totalPage,
      movieIdSelected,
      movieToDisplay
    } = this.state;

    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Movie Title"
          value={movieToSearch}
          onChangeText={text => this.setState({ movieToSearch: text })}
        />
        <View style={styles.submit}>
          <Button title="Search" onPress={() => this.handleSubmit()} />
        </View>

        {listMovies.length === 0 ? (
          <Text>No movie to display.</Text>
        ) : (
          <FlatList
            data={listMovies}
            keyExtractor={item => item["id"].toString()}
            renderItem={({ item }) => (
              <MovieItem movie={item} handleSelect={this.setMovieIdSelected} />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              // If others movie can be get from API
              if (page < totalPage) {
                this.loadMovies();
              }
            }}
          />
        )}
        {isLoading && (
          <View style={styles.loading_container}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={false}
          visible={movieToDisplay !== null}
        >
          <MovieModal
            handleClose={this.setMovieIdSelected}
            movie={movieToDisplay}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  },
  submit: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    height: 50
  }
});

export default Search;
