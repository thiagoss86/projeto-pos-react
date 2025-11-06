export default function SearchBar({ onSearch }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const query = String(data.get('q') || '').trim();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 12 }}>
            <div className="grid">
                <label className="col-span">
                    Buscar por título
                    <input name="q" placeholder="Digite e precione Enter" />
                </label>
            </div>
        </form>
    );
}