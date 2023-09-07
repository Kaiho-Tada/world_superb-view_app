import { Checkbox } from "@chakra-ui/react";
import { FC, memo, useContext } from "react";
import { PlaceContext } from "components/pages/AllPlaces";
import { useCountryCheckBox } from "hooks/api/useCountryCheckBox";

type Props = {
  countryState: string;
}

export const CountryCheckBox: FC<Props> = memo((props) => {
  const { countryState } = props;
  const { setPlaces, countries, setCountries, genres, types, keyword, riskLevels, seasons } = useContext(PlaceContext);
  const { handleChange } = useCountryCheckBox({ setPlaces, genres, types, riskLevels, seasons, countries, setCountries, keyword });

  return (
    <div>
      {countries.map(country => {
        if(country.state == countryState) {
          return (
            <Checkbox aria-hidden="false" key={country.label} size='md' colorScheme='green' isChecked={country.checked} value={country.label} onChange={handleChange}>
              {country.label}
            </Checkbox>
          )
        }
      })}
    </div>
  )
})
