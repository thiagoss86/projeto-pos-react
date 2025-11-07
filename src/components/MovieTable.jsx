import { useCallback, useMemo, useState } from 'react';
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    TablePagination, Box, Typography, IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableCard, Container as StyledContainer } from './MovieTable.styles';


export default function MovieTable({ movies, onEdit, onDelete }) {
    const safeMovies = useMemo(() => (Array.isArray(movies) ? movies : []), [movies]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (_event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDelete = useCallback(
        (id, title) => {
            if(confirm(`Deseja excluir o filme "${title}"?`)) onDelete?.(id);
        },
        [onDelete]
    );
    const start = page * rowsPerPage;
    const visible = safeMovies.slice(start, start + rowsPerPage);

    if(safeMovies.length === 0) {
        return (
            <Typography variant="body2" color='text.secondary' sx={{mt:2}}>
                Nenhum filme cadastrado.
            </Typography>
        );
    }

    return (
        <TableCard>
            <StyledContainer>
                <Table stickyHeader size='small' arial-label="Filmes cadastrados">
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Diretor</TableCell>
                            <TableCell>Gênero</TableCell>
                            <TableCell align='center'>Ano de Lançamento</TableCell>
                            <TableCell align='center'>Nota</TableCell>
                            <TableCell align='right'>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {visible.map(({ id, title, director, genre, year, rating }) => (
                            <TableRow key={id} hover>
                                <TableCell>{title}</TableCell>
                                <TableCell>{director}</TableCell>
                                <TableCell>{genre}</TableCell>
                                <TableCell align='center'>{year}</TableCell>
                                <TableCell align='center'>{rating}</TableCell>
                                <TableCell align='right'>
                                    <Box sx={{ display: 'inline-flex', gap: 0.5}}>
                                        <Tooltip title="Editar">
                                            <IconButton
                                                size='small'
                                                color='primary'
                                                onClick={() => onEdit?.(id)}>
                                                <EditIcon fontSize='small' />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Excluir">
                                            <IconButton
                                                size='small'
                                                color='error'
                                                onClick={() => handleDelete(id, title)}>
                                                <DeleteIcon fontSize='small' />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledContainer>

            <TablePagination
                component="div"
                rowsPerPageOptions={[5,10,25,50]}
                count={safeMovies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filmes por página"/>
        </TableCard>
    );
}
