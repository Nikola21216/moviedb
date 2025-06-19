
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("moviedb");

    const allMovies = await db.collection("movies").find().toArray();
    console.log("Всички филми:", allMovies);

    const usActors = await db.collection("actors").find({ nationality: "USA" }).toArray();
    console.log("Актьори от САЩ:", usActors);

    const prolificDirectors = await db.collection("directors")
      .find({ nationality: "Canada", films_directed: { $gt: 5 } })
      .toArray();
    console.log("Режисьори от Канада с повече от 5 филма:", prolificDirectors);

    await db.collection("movies").updateOne(
      { title: "Inception" },
      { $addToSet: { genre: "Thriller" } }
    );
    console.log("Жанр 'Thriller' добавен към Inception");

    await db.collection("users").updateOne(
      { username: "guest" },
      { $set: { email: "guest_new@example.com" } }
    );
    console.log("Имейлът на guest е актуализиран");

    await db.collection("movies").deleteOne({ "details.rating": { $lt: 7 } });
    console.log("Изтрит филм с рейтинг по-малък от 7");
    await db.collection("actors").deleteOne({ awards: { $size: 0 } });
    console.log("Изтрит актьор без награди");

    const moviesByGenre = await db.collection("movies").aggregate([
      { $unwind: "$genre" },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    console.log("Брой филми по жанр:", moviesByGenre);

    const avgScores = await db.collection("ratings").aggregate([
      { $group: { _id: "$movie_id", avgScore: { $avg: "$score" } } },
      { $sort: { avgScore: -1 } }
    ]).toArray();
    console.log("Средна оценка на филмите:", avgScores);


    const usersWithFavorites = await db.collection("users").aggregate([
      { $project: { username: 1, favoritesCount: { $size: "$favorites" } } },
      { $match: { favoritesCount: { $gt: 1 } } },
      { $sort: { username: 1 } }
    ]).toArray();
    console.log("Потребители с повече от 1 любим филм:", usersWithFavorites);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
