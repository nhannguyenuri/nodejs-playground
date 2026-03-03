const DEFAULT_PERIOD = 60 * 5; // 5 minutes

const cacheControl = (req, res, next, period = DEFAULT_PERIOD) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', `public, max-age=${period}`);
  } else {
    res.set('Cache-Control', 'no-store');
  }

  next();
};

const cacheControlNoStore = (_, res, next) => {
  res.set('Cache-Control', 'no-store');

  next();
};

export { cacheControl, cacheControlNoStore };
