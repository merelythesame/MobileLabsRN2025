export const formatTimestamp = (unixSeconds) => {
    const postDate = new Date(unixSeconds * 1000);
    const now = new Date();

    const isToday =
        postDate.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
        postDate.toDateString() === yesterday.toDateString();

    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    const formattedTime = postDate.toLocaleTimeString(undefined, options);

    if (isToday) return `today • ${formattedTime}`;
    if (isYesterday) return `yesterday • ${formattedTime}`;

    const formattedDate = postDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });

    return `${formattedDate} • ${formattedTime}`;
};
