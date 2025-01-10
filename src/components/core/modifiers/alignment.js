export function getFlexAlignment(alignment) {
    switch (alignment) {
        case 'leading':
            return 'flex-start';
        case 'trailing':
            return 'flex-end';
        case 'center':
            return 'center';
        case 'top':
            return 'flex-start';
        case 'bottom':
            return 'flex-end';
        default:
            return 'center';
    }
}