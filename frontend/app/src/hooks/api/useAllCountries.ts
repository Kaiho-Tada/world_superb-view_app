import { CountryAll } from "lib/api/country";
import { useCallback, useState } from "react";
import { Country } from "types/api/country";
import { Countries } from "types/states/countries";
import { useMessage } from "../useMessage";

export const useAllCountries = () => {
  const [loadingCountries, setLoadingCountries] = useState(false);
  // const [countries, setCountries] = useState();
  const [countries, setCountries] = useState<Array<Countries>>([])

  const {showMessage} = useMessage();

  const getCountries = useCallback(async () => {
    setLoadingCountries(true);
    // axios.get("http://localhost:3001/api/v1/countries").then((res: any) => {
    //   const countryRes = res.data
    //   const countryState = countryRes.map((country: Country) => {
    //     return { label: country.name, state: country.state.name, place_names: country.places.map((place) => place.name), checked: false}
    //   })
    //   setCountries(countryState)
    // })
    const res = await CountryAll();
    console.log(res);

    if (res.status === 200) {
      const countryRes = res.data;
      const countryState = countryRes.map((country: Country) => {
        return { label: country.name, state: country.state.name, place_names: country.places.map((place) => place.name), checked: false};
      });
      setCountries(countryState);
    }else {
      showMessage({title: "country取得に失敗しました", status: "error"});
    };
    setLoadingCountries(false);
  }, []);

  return { getCountries, countries, setCountries, loadingCountries };
}
