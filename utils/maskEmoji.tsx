function regexEmoji(e: React.ChangeEvent<HTMLInputElement>): string {
    const emojiPattern = /([\uD83C-\uDBFF\uDC00-\uDFFF]|[\u203C-\u3299]|[\u0023-\u0039]\uFE0F?\u20E3|\u00A9|\u00AE|[\u2000-\u3300]|[\uDC00-\uDFFF])/g;

    const cleanValue = e.target.value.replace(emojiPattern, '');
    return cleanValue;
}

export default regexEmoji