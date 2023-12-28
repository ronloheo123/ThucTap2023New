import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Stack } from "@mui/material";
import Heart from "./heart";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";

// Khởi tạo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhnf2TsFM00l48uV8RwMEs6MdIO8jDPN0",
  authDomain: "truongpro-b08ef.firebaseapp.com",
  databaseURL: "https://truongpro-b08ef-default-rtdb.firebaseio.com",
  projectId: "truongpro-b08ef",
  storageBucket: "truongpro-b08ef.appspot.com",
  messagingSenderId: "1081962671543",
  appId: "1:1081962671543:web:243e4495680cb47a3e8c32",
  measurementId: "G-8L8DEQ2ED9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App: React.FC = () => {
  const [movieData, setMovieData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    // Fetch favorites from Firestore
    const fetchFavorites = async () => {
      try {
        const favoritesCollection = collection(db, "favoriteMovies");
        const favoritesSnapshot = await getDocs(favoritesCollection);
        const favoritesList = favoritesSnapshot.docs.map((doc) =>
          parseInt(doc.id)
        );
        setFavorites(favoritesList);
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
      } catch (error) {
        console.error("Error fetching favorites from Firestore:", error);
      }
    };

    fetchFavorites();

    const fetchMovieData = async (currentPage: number) => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated",
          {
            params: {
              api_key: "e591ec5aa28bdc2d8090769a197cdbbe",
              page: currentPage,
            },
          }
        );
        const newMovies = response.data.results.slice(0, 10);
        setMovieData((prevData) =>
          currentPage === 1 ? newMovies : [...prevData, ...newMovies]
        );
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData(page);
  }, [page, db]);

  // ... (các phần khác)

 const toggleFavorite = async (index: number) => {
   try {
     const movie = movieData[index];
     const movieRef = doc(db, "favoriteMovies", movie.id.toString());

     const updatedFavorites = [...favorites];
     const isFavorite = updatedFavorites.includes(movie.id);

     if (isFavorite) {
       const indexToRemove = updatedFavorites.indexOf(movie.id);
       updatedFavorites.splice(indexToRemove, 1);

       // Xóa ID của phim trên Firebase khi ấn lại trái tim
       await updateDoc(movieRef, {
         isFavorite: false,
         favorites: arrayRemove(movie.id),
       });
     } else {
       updatedFavorites.push(movie.id);

       // Thêm ID của phim vào Firebase khi ấn trái tim
       await setDoc(movieRef, {
         isFavorite: true,
         favorites: arrayUnion(movie.id),
       });
     }

     // Cập nhật trạng thái favorites và localStorage
     setFavorites(updatedFavorites);
     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

     // Cập nhật trạng thái isFavorite trong danh sách movieData
     setMovieData((prevData) =>
       prevData.map((prevMovie) =>
         prevMovie.id === movie.id
           ? { ...prevMovie, isFavorite: !isFavorite }
           : prevMovie
       )
     );
   } catch (error) {
     console.error("Error updating favorite status on Firestore:", error);
   }
 };

  // ... (các phần khác)

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "900px",
          width: "1440px",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            color: "white",
            textAlign: "center",
            paddingTop: "200px",
          }}
        >
          TOP RATE MOVIES
        </div>
      </div>

      <div>
        <Container>
          <Stack direction="row" flexWrap="wrap" textAlign="center">
            {movieData.map((movie: any, index: number) => {
              const starsCount: number = Math.min(
                Math.round(movie.vote_average / 2)
              );

              return (
                <div
                  key={movie.id}
                  style={{
                    width: "200px",
                    margin: "10px",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={300}
                  />
                  <Box>
                    <b>{movie.title}</b>
                  </Box>
                  <Box>
                    {[...Array(starsCount)].map((_, starIndex) => (
                      <span key={starIndex}>⭐</span>
                    ))}
                    <span>{movie.vote_average}</span>
                  </Box>
                  <Heart
                    isFavorite={
                      movieData[index].isFavorite ||
                      favorites.includes(movieData[index].id)
                    }
                    onClick={() => toggleFavorite(index)}
                  />
                </div>
              );
            })}
          </Stack>
        </Container>
        <Box textAlign={"center"}>
          <button onClick={loadMoreData}>Load more</button>
        </Box>
      </div>
    </div>
    aa
  );
};

export default App;
