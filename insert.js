
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("moviedb");

    const directors = [
      { name: "Christopher Nolan", birthdate: "1970-07-30", films_directed: 10, nationality: "UK" },
      { name: "Steven Spielberg", birthdate: "1946-12-18", films_directed: 33, nationality: "USA" },
      { name: "Quentin Tarantino", birthdate: "1963-03-27", films_directed: 10, nationality: "USA" },
      { name: "James Cameron", birthdate: "1954-08-16", films_directed: 8, nationality: "Canada" },
      { name: "Denis Villeneuve", birthdate: "1967-10-03", films_directed: 9, nationality: "Canada" }
    ];
    const directorResult = await db.collection("directors").insertMany(directors);
    const directorIds = directorResult.insertedIds;

    const actors = [
      { name: "Leonardo DiCaprio", birthdate: "1974-11-11", nationality: "USA", awards: ["Oscar"] },
      { name: "Brad Pitt", birthdate: "1963-12-18", nationality: "USA", awards: ["Oscar", "Golden Globe"] },
      { name: "Tom Hanks", birthdate: "1956-07-09", nationality: "USA", awards: ["Oscar", "Emmy"] },
      { name: "Natalie Portman", birthdate: "1981-06-09", nationality: "Israel", awards: ["Oscar"] },
      { name: "Ryan Gosling", birthdate: "1980-11-12", nationality: "Canada", awards: [] },
      { name: "Scarlett Johansson", birthdate: "1984-11-22", nationality: "USA", awards: [] },
      { name: "Morgan Freeman", birthdate: "1937-06-01", nationality: "USA", awards: ["Oscar"] },
      { name: "Emma Stone", birthdate: "1988-11-06", nationality: "USA", awards: ["Oscar"] },
      { name: "Denzel Washington", birthdate: "1954-12-28", nationality: "USA", awards: ["Oscar"] },
      { name: "Kate Winslet", birthdate: "1975-10-05", nationality: "UK", awards: ["Oscar"] }
    ];
    const actorResult = await db.collection("actors").insertMany(actors);
    const actorIds = Object.values(actorResult.insertedIds);

    const movies = [
      {
        title: "Inception",
        year: 2010,
        genre: ["Sci-Fi", "Action"],
        director_id: directorIds[0],
        actor_ids: [actorIds[0], actorIds[1]],
        details: { duration: 148, language: "English", rating: 8.8 }
      },
      {
        title: "Titanic",
        year: 1997,
        genre: ["Romance", "Drama"],
        director_id: directorIds[3],
        actor_ids: [actorIds[0], actorIds[9]],
        details: { duration: 195, language: "English", rating: 7.8 }
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        genre: ["Crime", "Drama"],
        director_id: directorIds[2],
        actor_ids: [actorIds[1], actorIds[6]],
        details: { duration: 154, language: "English", rating: 8.9 }
      },
      {
        title: "Interstellar",
        year: 2014,
        genre: ["Sci-Fi", "Adventure"],
        director_id: directorIds[0],
        actor_ids: [actorIds[0], actorIds[5]],
        details: { duration: 169, language: "English", rating: 8.6 }
      },
      {
        title: "Catch Me If You Can",
        year: 2002,
        genre: ["Biography", "Crime"],
        director_id: directorIds[1],
        actor_ids: [actorIds[0], actorIds[2]],
        details: { duration: 141, language: "English", rating: 8.1 }
      },
      {
        title: "La La Land",
        year: 2016,
        genre: ["Musical", "Drama"],
        director_id: directorIds[4],
        actor_ids: [actorIds[4], actorIds[7]],
        details: { duration: 128, language: "English", rating: 8.0 }
      },
      {
        title: "The Matrix",
        year: 1999,
        genre: ["Sci-Fi", "Action"],
        director_id: directorIds[1],
        actor_ids: [actorIds[4], actorIds[5]],
        details: { duration: 136, language: "English", rating: 8.7 }
      },
      {
        title: "Forrest Gump",
        year: 1994,
        genre: ["Drama", "Romance"],
        director_id: directorIds[1],
        actor_ids: [actorIds[2]],
        details: { duration: 142, language: "English", rating: 8.8 }
      },
      {
        title: "The Revenant",
        year: 2015,
        genre: ["Adventure", "Drama"],
        director_id: directorIds[0],
        actor_ids: [actorIds[0], actorIds[1]],
        details: { duration: 156, language: "English", rating: 8.0 }
      },
      {
        title: "Arrival",
        year: 2016,
        genre: ["Sci-Fi", "Drama"],
        director_id: directorIds[4],
        actor_ids: [actorIds[5]],
        details: { duration: 116, language: "English", rating: 7.9 }
      }
    ];
    const movieResult = await db.collection("movies").insertMany(movies);

    const users = [
      {
        username: "john_doe",
        email: "john@example.com",
        favorites: [movieResult.insertedIds["0"], movieResult.insertedIds["3"]],
        preferences: { genres: ["Sci-Fi", "Drama"] }
      },
      {
        username: "sarah_lee",
        email: "sarah@example.com",
        favorites: [movieResult.insertedIds["1"], movieResult.insertedIds["5"]],
        preferences: { genres: ["Romance", "Musical"] }
      },
      {
        username: "michael23",
        email: "michael@example.com",
        favorites: [],
        preferences: { genres: ["Crime"] }
      },
      {
        username: "emma_k",
        email: "emma@example.com",
        favorites: [movieResult.insertedIds["7"]],
        preferences: { genres: ["Drama", "Biography"] }
      },
      {
        username: "peter_pan",
        email: "peter@example.com",
        favorites: [movieResult.insertedIds["4"]],
        preferences: { genres: ["Adventure"] }
      },
      {
        username: "nina_t",
        email: "nina@example.com",
        favorites: [],
        preferences: { genres: ["Sci-Fi"] }
      },
      {
        username: "jack1990",
        email: "jack@example.com",
        favorites: [],
        preferences: { genres: ["Action", "Thriller"] }
      },
      {
        username: "lucy_love",
        email: "lucy@example.com",
        favorites: [],
        preferences: { genres: ["Romance", "Drama"] }
      },
      {
        username: "admin",
        email: "admin@example.com",
        favorites: [],
        preferences: { genres: ["All"] }
      },
      {
        username: "guest",
        email: "guest@example.com",
        favorites: [],
        preferences: { genres: [] }
      }
    ];
    const userResult = await db.collection("users").insertMany(users);

    const ratings = [
      { user_id: userResult.insertedIds["0"], movie_id: movieResult.insertedIds["0"], score: 9, comment: "Amazing!", date: "2024-01-01" },
      { user_id: userResult.insertedIds["1"], movie_id: movieResult.insertedIds["1"], score: 8, comment: "Very touching.", date: "2024-01-02" },
      { user_id: userResult.insertedIds["2"], movie_id: movieResult.insertedIds["2"], score: 7, comment: "Good.", date: "2024-01-03" },
      { user_id: userResult.insertedIds["3"], movie_id: movieResult.insertedIds["3"], score: 10, comment: "Masterpiece.", date: "2024-01-04" },
      { user_id: userResult.insertedIds["4"], movie_id: movieResult.insertedIds["4"], score: 6, comment: "Okay movie.", date: "2024-01-05" },
      { user_id: userResult.insertedIds["5"], movie_id: movieResult.insertedIds["5"], score: 9, comment: "Loved it!", date: "2024-01-06" },
      { user_id: userResult.insertedIds["6"], movie_id: movieResult.insertedIds["6"], score: 8, comment: "Cool effects.", date: "2024-01-07" },
      { user_id: userResult.insertedIds["7"], movie_id: movieResult.insertedIds["7"], score: 7, comment: "Great acting.", date: "2024-01-08" },
      { user_id: userResult.insertedIds["8"], movie_id: movieResult.insertedIds["8"], score: 8, comment: "Intense.", date: "2024-01-09" },
      { user_id: userResult.insertedIds["9"], movie_id: movieResult.insertedIds["9"], score: 9, comment: "Thought-provoking.", date: "2024-01-10" }
    ];
    await db.collection("ratings").insertMany(ratings);

    console.log("Всички данни са вмъкнати успешно!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
