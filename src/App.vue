<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="hello">
      <div>
        <h2>Books</h2>
        <div v-for="book in books" :key="`book-${book.id}`">
          <h3>{{ book.title }}</h3>
          <p>Author: {{ book.author }}</p>
        </div>
      </div>
      <div>
        <h2>Movies</h2>
        <div v-for="movie in movies" :key="`movie-${movie.id}`">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.synopsis }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
  name: 'App',
  data() {
    return {
      books: [],
      movies: []
    }
  },
  methods: {
    async executeQuery(query) {
      const { data } = await axios.post('/graphql', {
        query: ` query catchAll { ${query} } `,
      })

      return data;
    }
  },
  async mounted() {
    const books = await this.executeQuery(
      `
        books {
          id
          title
          author
        }
      `
    )

    this.books = books.data.books;

    const movies = await this.executeQuery(
      `
        movies {
          id
          title
          synopsis
        }
      `
    )

    this.movies = movies.data.movies;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
