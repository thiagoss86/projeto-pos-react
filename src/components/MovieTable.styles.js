import { styled } from "@mui/material/styles";
import { Card, TableContainer } from "@mui/material";

export const TableCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(2),
    borderRadius: 16,
    overflow: "hidden"
}));

export const Container = styled(TableContainer)(({ theme }) => ({
    maxHeight: 520,
}));