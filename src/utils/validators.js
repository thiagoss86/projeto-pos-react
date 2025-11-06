export const isNonEmpty = value => String(value ?? '').trim().length > 0;
export const isYear = value => /^(19\d{2}|20\d{2})$/.test(String(value));
export const isRating = (value) => {

    if (value === null || value === undefined) return false;
    const raw = String(value).trim();
    if (raw === '') return false;

    const re = /^(?:10(?:[.,]0{1,2})?|(?:\d|[0-9])(?:[.,]\d{1,2})?)$/;
    if (!re.test(raw)) return false;

    const n = parseFloat(raw.replace(',', '.'));
    return !Number.isNaN(n) && n >= 0 && n <= 10;
}