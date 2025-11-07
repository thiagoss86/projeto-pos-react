import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const RootButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    textTransform: "none",
    padding: theme.spacing(1, 3),
    fontSize: "1rem",
    minWidth: 0,
}));