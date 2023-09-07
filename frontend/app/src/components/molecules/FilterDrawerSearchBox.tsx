import { ChangeEvent, FC, memo, useContext, useState } from "react";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { PlaceContext } from "components/pages/AllPlaces";
import { useonChangeKeyword } from "hooks/api/useonChangeKeyword";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useOnclickClearKeyword } from "hooks/api/useOnClickClearKeyword";


export const FilterDrawerSearchBox: FC = memo(() => {
  const { keyword, setKeyword, genres, countries, types, setPlaces, riskLevels, seasons } = useContext(PlaceContext);
  // const { onClickSearchBox } = useFilterSearchBox({setPlaces, genres, countries, types, riskLevels, seasons, keyword});
  const { onChangeKeyword } = useonChangeKeyword({ setKeyword, setPlaces, genres, countries, types, riskLevels, seasons, keyword });
  // const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)
  const { onClickClearKeyword } = useOnclickClearKeyword({ setKeyword, setPlaces, genres, countries, types, riskLevels, seasons, keyword });

  return (
    <Flex className="search" align="center" justify="center" bgColor="white"
      borderRadius="10px" px="10px" py="4px" border="1px solid lightgray" >
      <Input placeholder='絶景名または国名で検索' size='sm'  border="none" bgColor="white" color="black" _focus={{boxShadow: "none"}}
        value={keyword} onChange={onChangeKeyword} />
      {/* <Box bg="gray.300" borderRadius="full" h="6" w="6" > */}
        <SmallCloseIcon role="icon" boxSize={3} onClick={onClickClearKeyword} color="gray.500" _hover={{ cursor: "pointer" }} />
        {/* <CloseButton boxSize={4} onClick={onClickClearKeyword} color="white" /> */}
      {/* </Box> */}

      {/* <IconButton aria-label='Search database' icon={<SearchIcon />} size='sm' bgColor="white" color="black"
      onClick={onClickSearchBox} _hover={{ bg: '#white' }} /> */}
    </Flex>
  )
})
