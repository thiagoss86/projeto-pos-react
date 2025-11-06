import { useEffect, useState } from "react";

export default function SearchBar({ value, onSearch, placeholder = "Buscar por título" }) {
    const handleChange = (e) => onSearch(e.target.value);
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onSearch('');
    };

    return (
        <div className="card">
            <div className="grid">
                <label className="col-span">
                    <input
                        name="q"
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                    />
                </label>
            </div>
            <div className="actions">
                <button type="button" className="ghost" onClick={() => onSearch('')}>Limpar</button>
            </div>
        </div>
    )
}