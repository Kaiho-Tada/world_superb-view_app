import { PlaceAll } from "lib/api/place"
import { useCallback, useState } from "react"
import { Place } from "types/api/place";
import { useMessage } from "../useMessage";

export const useAllPlaces = () => {
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  // const [places, setPlaces] = useState();
  const [places, setPlaces] = useState<Array<Place>>([])
  const {showMessage} = useMessage();

  const getPlaces = useCallback( async () => {
    setLoadingPlaces(true);
    // axios.get("http://localhost:3001/api/v1/places").then((res: any) => {
    // setPlaces(res.data)
    // })

    // PlaceAll().then((res: any) => {
    //   setPlaces(res.data)
    // })
    const res = await PlaceAll();
    console.log(res.data);

    if (res.status === 200) {
      setPlaces(res.data);
    }else {
      showMessage({title: "place取得に失敗しました", status: "error"});
    };
    setLoadingPlaces(false);
  }, [])
  return { getPlaces, places, setPlaces, loadingPlaces };
}
