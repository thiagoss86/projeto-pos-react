import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box } from '@mui/material';

export const RootAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid #24243a`,
    boxShadow: 'none',
}));

export const RootToolbar = styled(Toolbar)({
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const Actions = styled(Box)({
    display: 'flex',
    gap: 8,
    alignItems: 'center',
});