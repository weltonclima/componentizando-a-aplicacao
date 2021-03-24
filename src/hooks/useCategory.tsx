import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface CategoryProvider {
  children: ReactNode;
}

interface CategoryContextData {
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
}

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData
);

export function CategoryProvider({ children }: CategoryProvider) {

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <CategoryContext.Provider value={{
      genres,
      selectedGenreId,
      selectedGenre,
      movies,
      handleClickButton
    }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  const context = useContext(CategoryContext);
  return context;
}