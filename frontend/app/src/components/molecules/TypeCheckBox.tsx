import { Checkbox } from "@chakra-ui/react";
import { FC, memo, useContext, useState } from "react";

import { useMessage } from "hooks/useMessage";
import { SearchPlace } from "lib/api/place";
import { PlaceContext } from "components/pages/AllPlaces";
import { useTypeCheckBox } from "hooks/api/useTypeCheckBox";

export const TypeCheckBox: FC = memo(() => {
  const { setPlaces, types, setTypes, genres, countries, keyword, riskLevels, seasons } = useContext(PlaceContext)
  const [loading, setLoading] = useState(false)
  const {showMessage} = useMessage()
  const { handleChange } = useTypeCheckBox({ genres, countries, riskLevels, seasons, types, setTypes, setPlaces, keyword });

  return (
    <div>
      {types.map(type => {
        return (
          <Checkbox key={type.label} size='md' colorScheme='green' isChecked={type.checked} value={type.label} onChange={handleChange}>
            {type.label}
          </Checkbox>
        )
      })}
    </div>
  )
})
