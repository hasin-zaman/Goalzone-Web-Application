const formatMessage = (message) => {
    const words = message.split(' ');
    if (words.length > 4) {
      return words.slice(0, 4).join(' ') + '...';
    }
    return message;
};

export default formatMessage;