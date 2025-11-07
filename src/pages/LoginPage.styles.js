import { styled } from "@mui/material/styles";
import { Card, Box, Stack } from "@mui/material";

export const AuthCard = styled(Card)(({ theme }) => ({
    maxWidth: 480,
    margin: "1rem auto",
    padding: theme.spacing(2),
    borderRadius: 14,
}));

export const FormRow = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
}));

export const Actions = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(2),
    flexDirection: "row",
    gap: theme.spacing(1),
    alignItems: "center",
}));
