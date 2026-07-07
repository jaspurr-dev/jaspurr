export const cx = (...c: (string | false | undefined)[]) =>
    c.filter(Boolean).join(' ');
