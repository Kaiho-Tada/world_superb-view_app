import { GenreAll } from "lib/api/genre";
import { useCallback, useState } from "react";
import { Genre } from "types/api/genre";
import { Genres } from "types/states/genres";
import { useMessage } from "../useMessage";

export const useAllGenres = () => {
  const [loadingGenres, setLoadingGenres] = useState(false);
  // const [genres, setGenres] = useState();
  const [genres, setGenres] = useState<Array<Genres>>([])
  const {showMessage} = useMessage();

  const getGenres = useCallback(async () => {
    setLoadingGenres(true);
    // axios.get("http://localhost:3001/api/v1/genres").then((res: any) => {
    //   const genreRes = res.data
    //   const genreState = genreRes.map((genre: Genre) => {
    //     return { label: genre.name, category: genre.category, place_names: genre.places.map((place) => place.name), checked: false}
    //   })
    //   setGenres(genreState)
    // })
    const res = await GenreAll();
    console.log(res);

    if (res.status === 200) {
      const genreRes = res.data;
      const genreState = genreRes.map((genre: Genre) => {
        return { label: genre.name, category: genre.category, place_names: genre.places.map((place) => place.name), checked: false};
      });
      setGenres(genreState);
    }else {
      showMessage({title: "genre取得に失敗しました", status: "error"});
    };
    setLoadingGenres(false);
  }, []);

  return { getGenres, genres, setGenres, loadingGenres };
}
