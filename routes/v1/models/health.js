const getHealth = async () => {
  return {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
};

export { getHealth };
