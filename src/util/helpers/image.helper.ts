const userAvatarColors = [
    '#1abc9c',
    '#2ecc71',
    '#27ae60',
    '#3498db',
    '#2980b9',
    '#34495e',
    '#f39c12',
    '#e67e22',
    '#e74c3c',
    '#c0392b',
    '#712bc0',
    '#3a1664'
];

const getUrl = (color: string, text?: string) =>
    `https://dummyimage.com/500/${color}/ffffff?text=${text}`;

export const getAvatarImageNameInitials = (name: string | undefined, color?: string) => {
    if (!name) return getUrl('#ffffff');

    color = color
        ? color.replace('#', '')
        : userAvatarColors[Math.min(name.length, userAvatarColors.length - 1)].substring(1);

    const nameSplited = name.split(' ');
    let text = name[0].toUpperCase();

    if (nameSplited.length > 1) {
        let lastInitial = nameSplited[nameSplited.length - 1][0];
        if (text !== lastInitial.toUpperCase()) {
            text += lastInitial.toUpperCase();
        }
    }

    return getUrl(color, text);
};