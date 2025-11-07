import { useEffect } from "react";
import { TextField, Button, Stack, Typography } from '@mui/material';
import { FormCard, Row } from "./MovieForm.styles";
import { useForm } from "../hooks/useForm";
import { isNonEmpty, isYear, isRating } from './../utils/validators';

const initialFormState = {
    title: "",
    director: "",
    genre: "",
    releaseYear: "",
    rating: "",
};

export default function MovieForm({ onCreate, onUpdate, editingMovie, onCancelEdit }) {
    const { values, register, setAll, reset } = useForm(initialFormState);

    useEffect(() => {
        if (editingMovie) {
            const { title, director, genre, releaseYear, rating } = editingMovie;
            setAll({ title, director, genre, releaseYear, rating });
        } else {
            reset();
        }
    }, [editingMovie]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, director, genre, releaseYear, rating } = values;

        if (!isNonEmpty(title)) return alert("O título do filme é obrigatório.");
        if (!isNonEmpty(director)) return alert("O diretor do filme é obrigatório.");
        if (!isNonEmpty(genre)) return alert("O gênero do filme é obrigatório.");
        if (!isYear(releaseYear)) return alert("O ano de lançamento é inválido.");
        if (!isRating(rating)) return alert("A avaliação deve ser um número entre 0 e 10.");

        if (editingMovie) {
            await onUpdate(editingMovie.id, { title, director, genre, releaseYear, rating });
            onCancelEdit();
        } else {
            await onCreate({ title, director, genre, releaseYear, rating });
        }
        reset();
    };

    return (
        <FormCard component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
                {editingMovie ? "Editar Filme" : "Adicionar Filme"}
            </Typography>

            <Row>
                <TextField label="Título"{...register("title")} placeholder="Ex: O Senhor dos Áneis" />
                <TextField label="Diretor"{...register("director")} placeholder="Ex: Peter Jackson" />
                <TextField label="Gênero"{...register("genre")} placeholder="Ex: Fantasia" />
                <TextField label="Ano de Lançamento"{...register("releaseYear")} placeholder="Ex: 2001" />
                <TextField label="Avaliação"{...register("rating")} placeholder="Ex: 9.5" />
            </Row>

            <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>

                <Button type="submit" variant="contained">
                    {editingMovie ? "Atualizar Filme" : "Adicionar Filme"}
                </Button>
                {editingMovie && (
                    <Button type="button" onClick={onCancelEdit} variant="outlined">
                        Cancelar
                    </Button>
                )}
            </Stack>
        </FormCard>
    );
}
