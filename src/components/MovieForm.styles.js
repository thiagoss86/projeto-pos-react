import { styled } from "@mui/material/styles";
import { Card, Box } from "@mui/material";

export const FormCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
}));

export const Row = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr'
    },
}));
