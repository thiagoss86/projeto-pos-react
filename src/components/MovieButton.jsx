import { RootButton } from "./MovieButton.styles";

export default function MovieButton({ title, onClick, variant = 'outlined', children }) {
    const map = {
        default: { color: 'inherit', variant: 'outlined' },
        outlined: { color: 'inherit', variant: 'outlined' },
        primary: { color: 'primary', variant: 'contained' },
        danger: { color: 'error', variant: 'outlined' },
    };

    const v = map[variant] ?? map.outlined;

    return (
        <RootButton
            title={title}
            onClick={onClick}
            color={v.color}
            variant={v.variant}
            size="small">
            {children}
        </RootButton>
    )
}