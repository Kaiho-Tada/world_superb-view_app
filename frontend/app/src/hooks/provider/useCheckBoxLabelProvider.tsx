import { CheckBoxLabelContext } from "context";
import { FC, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode
};

export const useCheckBoxLabel = () => useContext(CheckBoxLabelContext);

const CheckBoxLabelProvider: FC<Props> = ({children}) => {
  const [genreCheckBoxLabels, setGenreCheckBoxLabels] = useState<Array<string>>([]);
  const [countryCheckBoxLabels, setCountryCheckBoxLabels] = useState<Array<string>>([]);
  const [typeCheckBoxLabels, setTypeCheckBoxLabels] = useState<Array<string>>([]);
  const [riskCheckBoxLabels, setRiskCheckBoxLabels] = useState<Array<string>>([]);

  const value = {
    genreCheckBoxLabels,
    setGenreCheckBoxLabels,
    countryCheckBoxLabels,
    setCountryCheckBoxLabels,
    typeCheckBoxLabels,
    setTypeCheckBoxLabels,
    riskCheckBoxLabels,
    setRiskCheckBoxLabels,
  };

  return (
    <CheckBoxLabelContext.Provider value={value}>
      {children}
    </CheckBoxLabelContext.Provider>
  );
};
export { CheckBoxLabelProvider };
