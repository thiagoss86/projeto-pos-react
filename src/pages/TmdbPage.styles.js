import { styled } from "@mui/material/styles";
import {Card, Grid} from "@mui/material";

export const PageCard = styled(Card)(({ theme }) => ({
    marginTopo: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 14,
}));

export const ResultsGrid = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

export const ResultCard = styled(Card)(({ theme }) => ({
    borderRadius: 12,
    overflow: 'hidden',
}));