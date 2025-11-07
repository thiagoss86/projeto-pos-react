import { styled } from "@mui/material";
import { Box, Paper, Stack } from "@mui/material";

export const PageWarper = styled(Box)(({ theme }) => ({
    margimTop: theme.spacing(2),
    display: 'grid',
    gap: theme.spacing(2),
}));

export const ActionsBar = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1.5),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
}));

export const RigthActions = styled(Stack)({
    flexDirection: 'row',
    gap: 8,
});