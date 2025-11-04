import { useEffect, useState } from "react";

const initialFormState = {
  title: "",
  director: "",
  genre: "",
  releaseYear: "",
  rating: "",
};

export default function MovieForm({ onCreate, onUpdate, editingMovie, onCancelEdit }) {
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingMovie) {
            const { title, director, genre, releaseYear, rating } = editingMovie;
            setFormData({ title, director, genre, releaseYear, rating });
        } else {
            setFormData(initialFormState);
        }
    }, [editingMovie]);

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, director, genre, releaseYear, rating } = formData;

        if(editingMovie) {
            onUpdate({ id: editingMovie.id, title, director, genre, releaseYear, rating });
            onCancelEdit();
        } else {
            onCreate({ title, director, genre, releaseYear, rating });
        }
        setFormData(initialFormState);
    };

    return (
        <form className= "card forn" onSubmit={handleSubmit}>
            <h2>{editingMovie ? "Editar Filme" : "Adicionar Filme"}</h2>

            <div className="grid">
                <label>
                    Título:
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Ex: O Senhor dos Áneis"/>
                </label>
                <label>
                    Diretor:
                    <input name="director" value={formData.director} onChange={handleChange} placeholder="Ex: Peter Jackson"/>
                </label>
                <label>
                    Gênero:
                    <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Ex: Fantasia"/>
                </label>
                <label>
                    Ano de Lançamento:
                    <input name="releaseYear" value={formData.releaseYear} onChange={handleChange} placeholder="Ex: 2001"/>
                </label>
                <label>
                    Avaliação:
                    <input name="rating" value={formData.rating} onChange={handleChange} placeholder="Ex: 9.3"/>
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
