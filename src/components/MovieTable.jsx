import MovieButton from './MovieButton';

export default function MovieTable({ movies, onEdit, onDelete }) {
    if (movies.length === 0) {
        return <p className='muted'>Nenhum filme cadastrado.</p>;
    }

    return (
        <div className='card'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Diretor</th>
                        <th>Gênero</th>
                        <th>Ano de Lançamento</th>
                        <th>Classificação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(({ id, title, director, genre, releaseYear, rating }) => (
                        <tr key={id}>
                            <td>{title}</td>
                            <td>{director}</td>
                            <td>{genre}</td>
                            <td>{releaseYear}</td>
                            <td>{rating}</td>
                            <td className='row-actions'>
                                <MovieButton title="Editar" onClick={() => onEdit(id)}>
                                    ✏️
                                </MovieButton>
                                <MovieButton
                                    title="Excluir"
                                    variant="danger"
                                    onClick={() => {
                                        if (confirm(`Deseja excluir o filme "${title}"?`)) {
                                            onDelete(id);
                                        }
                                    }}>
                                    🗑️
                                </MovieButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
