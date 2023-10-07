export const onlyNumbers = (value: string) => {
    const regex = /[^0-9.]/g;
    const dotCount = value.split('.').length - 1;

    if (dotCount > 1) {
        const firstDotIndex = value.indexOf('.');
        const afterFirstDot = value.substring(firstDotIndex + 1).replace(/\./g, '');
        return value.substring(0, firstDotIndex + 1) + afterFirstDot.replace(regex, '');
    }

    return value.replace(regex, '');
};
