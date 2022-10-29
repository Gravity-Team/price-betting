export const dateFormat = (d: Date) =>
    new Date(d).toLocaleDateString('en-GB', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
