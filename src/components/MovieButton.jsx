export default function MovieButton({ title, onClick, children, variant = "default" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`movie-button ${variant}`}
            title={title}
        >
            {children}
        </button>
    );
}