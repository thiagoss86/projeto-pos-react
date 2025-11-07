import { styled } from "@mui/material/styles";
import {Paper, Box} from "@mui/material";

export const SearchWrapper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12
}));

export const SearchBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
}));