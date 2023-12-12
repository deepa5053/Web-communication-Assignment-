// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const moviesCollection = collection(db, 'movies');

// Function to add a movie
const addMovie = async (title, genre, releaseDate) => {
  const moviesQuery = query(moviesCollection, where('title', '==', title));
  const existingMovies = await getDocs(moviesQuery);

  if (existingMovies.empty) {
    await addDoc(moviesCollection, { title, genre, releaseDate, watched: false });
    console.log('Movie added successfully!');
  } else {
    console.log('Movie already exists!');
  }
};

// Function to delete a movie
const deleteMovie = async (movieId) => {
  await deleteDoc(doc(moviesCollection, movieId));
  console.log('Movie deleted successfully!');
};

// Function to toggle watched status
const toggleWatched = async (movieId, watched) => {
  await addDoc(moviesCollection, { watched }, { merge: true });
  console.log(`Watched status updated for Movie ID ${movieId}`);
};

// Function to render movie list
const renderMovies = (movies) => {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = '';

  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.innerHTML = `${movie.title} - ${movie.genre} (${movie.releaseDate}) <button onclick="deleteMovie('${movie.id}')">Delete</button> <button onclick="toggleWatched('${movie.id}', ${!movie.watched})">Toggle Watched</button>`;
    movieList.appendChild(li);
  });
};

// Event listener for form submission
document.getElementById('addMovieForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const genre = document.getElementById('genre').value;
  const releaseDate = document.getElementById('releaseDate').value;

  addMovie(title, genre, releaseDate);
});

// Event listener to render movies when the page loads
document.addEventListener('DOMContentLoaded', () => {
  onSnapshot(moviesCollection, (snapshot) => {
    const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderMovies(movies);
  });
});
