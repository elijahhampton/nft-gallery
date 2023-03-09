import { Search as SearchIcon } from "@mui/icons-material";
import { Search, SearchIconWrapper, StyledInputBase } from "../../styled/searchbar.styled";
import { KeyboardEvent } from "react";

interface ISearchBarProps {
    onSearch: (key: string, value: string) => void;
}

export default function SearchBar({ onSearch }: ISearchBarProps) {
    return (
        //@ts-ignore
        <Search onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => onSearch(e.key, e.target?.value)}>
        <SearchIconWrapper>
        <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder='Search NFTs by users' />
      </Search>
    )
}