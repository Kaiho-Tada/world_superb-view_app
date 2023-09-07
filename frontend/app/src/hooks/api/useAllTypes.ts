import { CountryAll } from "lib/api/country";
import { TypeAll } from "lib/api/type";
import { useCallback, useState } from "react";
import { Country } from "types/api/country";
import { Type } from "types/api/type";
import { Types } from "types/states/types";
import { useMessage } from "../useMessage";

export const useAllTypes = () => {
  const [loadingTypes, setLoadingTypes] = useState(false);
  // const [types, setTypes] = useState();
  const [types, setTypes] = useState<Array<Types>>([])
  const {showMessage} = useMessage();

  const getTypes = useCallback( async () => {
    setLoadingTypes(true)
    // axios.get("http://localhost:3001/api/v1/countries").then((res: any) => {
    //   const typeRes = res.data
    //   const typeState = typeRes.map((type: Type) => {
    //     return { label: type.name, place_names: type.places.map((place) => place.name), checked: false}
    //   })
    //   setTypes(typeState)
    // })

    const res = await TypeAll();
    if (res.status === 200) {
      const typeRes = res.data
      const typeState = typeRes.map((type: Type) => {
        return { label: type.name, place_names: type.places.map((place) => place.name), checked: false}
      })
      setTypes(typeState);
    }else {
      showMessage({title: "tag取得に失敗しました", status: "error"})
    }
    setLoadingTypes(false);
  }, []);

  return { getTypes, types, setTypes, loadingTypes };
}
