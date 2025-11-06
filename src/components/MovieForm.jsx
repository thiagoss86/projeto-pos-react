import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, director, genre, releaseYear, rating } = values;

        if (editingMovie) {
            onUpdate(editingMovie.id, { title, director, genre, releaseYear, rating });
            onCancelEdit();
        } else {
            onCreate({ title, director, genre, releaseYear, rating });
        }
        reset();
    };

    return (
        <form className="card forn" onSubmit={handleSubmit}>
            <h2>{editingMovie ? "Editar Filme" : "Adicionar Filme"}</h2>

            <div className="grid">
                <label>
                    Título:
                    <input {...register("title")} placeholder="Ex: O Senhor dos Áneis" />
                </label>
                <label>
                    Diretor:
                    <input {...register("director")} placeholder="Ex: Peter Jackson" />
                </label>
                <label>
                    Gênero:
                    <input {...register("genre")} placeholder="Ex: Fantasia" />
                </label>
                <label>
                    Ano de Lançamento:
                    <input {...register("releaseYear")} placeholder="Ex: 2001" />
                </label>
                <label>
                    Avaliação:
                    <input {...register("rating")} placeholder="Ex: 9.5" />
                </label>
            </div>

            <div className="actions">
                <button type="submit" className="primary">
                    {editingMovie ? "Atualizar Filme" : "Adicionar Filme"}
                </button>
                {editingMovie && (
                    <button type="button" onClick={onCancelEdit} className="ghost">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
