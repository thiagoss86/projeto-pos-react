import { use, useEffect, useState } from "react";
import { TextField, IconButton, Tooltip } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { SearchWrapper, SearchBox } from "./SearchBar.styles";

export default function SearchBar({ value = '', onSearch }) {
    const [query, setQuery] = useState(value);

    useEffect(() => setQuery(value), [value]);

    const handleChange = (e) => {
        const q = e.target.value;
        setQuery(q);
        onSearch?.(q);
    }

    const handleClear = () => {
        setQuery('');
        onSearch?.('');
    }

    return (
        <SearchWrapper elevation={3}>
            <SearchBox>
                <SearchIcon color="primary" />
                <TextField
                    variant="standard"
                    placeholder="Buscar por título"
                    value={query}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                />
            </SearchBox>

            {query && (
                <Tooltip title="Limpiar">
                    <IconButton onClick={handleClear} color="error">
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
            )}
        </SearchWrapper>
    )

}