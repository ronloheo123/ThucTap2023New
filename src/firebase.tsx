// firebase.tsx
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";

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

function AppFireBase() {
  const [movieInfo, setMovieInfo] = useState({
    id: "",
    name: "",
    title: "",
  });

  const [movies, setMovies] = useState<
    { id: string; name: string; title: string }[]
  >([]);
  const [editMovieId, setEditMovieId] = useState<string | null>(null);
  const [editMovieInfo, setEditMovieInfo] = useState({
    id: "",
    name: "",
    title: "",
  });

  const createMovie = async () => {
    try {
      await setDoc(doc(db, "movies", movieInfo.id), { ...movieInfo });
      console.log("Đã thêm phim thành công!");
      setMovieInfo({
        id: "",
        name: "",
        title: "",
      });
      fetchMovies();
    } catch (error) {
      console.error("Lỗi khi thêm phim: ", error);
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      const movieRef = doc(db, "movies", id);
      await deleteDoc(movieRef);
      console.log("Đã xóa phim thành công!");
      fetchMovies();
    } catch (error) {
      console.error("Lỗi khi xóa phim: ", error);
    }
  };

  const editMovie = async () => {
    try {
      if (editMovieId) {
        const movieRef = doc(db, "movies", editMovieId);
        await setDoc(movieRef, { ...editMovieInfo });
        console.log("Đã cập nhật phim thành công!");
        setEditMovieId(null);
        setEditMovieInfo({
          id: "",
          name: "",
          title: "",
        });
        fetchMovies();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật phim: ", error);
    }
  };

  const startEditMovie = (id: string, name: string, title: string) => {
    setEditMovieId(id);
    setEditMovieInfo({
      id,
      name,
      title,
    });
  };

  const cancelEditMovie = () => {
    setEditMovieId(null);
    setEditMovieInfo({
      id: "",
      name: "",
      title: "",
    });
  };

  const fetchMovies = async () => {
    try {
      const getData = await getDocs(collection(db, "movies"));
      const movieList = getData.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        title: doc.data().title,
      })) as { id: string; name: string; title: string }[];
      setMovies(movieList);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phim: ", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Thêm ID, Tên và Tiêu Đề Phim</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editMovieId) {
            editMovie();
          } else {
            createMovie();
          }
        }}
      >
        <label>
          ID Phim:
          <input
            type="text"
            value={editMovieId ? editMovieInfo.id : movieInfo.id}
            onChange={(e) =>
              editMovieId
                ? setEditMovieInfo({ ...editMovieInfo, id: e.target.value })
                : setMovieInfo({ ...movieInfo, id: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Tên Phim:
          <input
            type="text"
            value={editMovieId ? editMovieInfo.name : movieInfo.name}
            onChange={(e) =>
              editMovieId
                ? setEditMovieInfo({ ...editMovieInfo, name: e.target.value })
                : setMovieInfo({ ...movieInfo, name: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Tiêu Đề Phim:
          <input
            type="text"
            value={editMovieId ? editMovieInfo.title : movieInfo.title}
            onChange={(e) =>
              editMovieId
                ? setEditMovieInfo({ ...editMovieInfo, title: e.target.value })
                : setMovieInfo({ ...movieInfo, title: e.target.value })
            }
          />
        </label>
        <br />
        <button type="submit">
          {editMovieId ? "Cập Nhật Phim" : "Thêm Phim"}
        </button>
        {editMovieId && (
          <button type="button" onClick={cancelEditMovie}>
            Hủy
          </button>
        )}
      </form>

      <h2>Danh Sách Phim</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            ID: {movie.id} - Tên: {movie.name} - Tiêu Đề: {movie.title}
            <button
              type="button"
              onClick={() => startEditMovie(movie.id, movie.name, movie.title)}
            >
              Chỉnh Sửa
            </button>
            <button type="button" onClick={() => deleteMovie(movie.id)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppFireBase;
