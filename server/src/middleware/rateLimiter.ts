import rateLimit from "express-rate-limit";

export const unsplashLimiter = rateLimit({
  windowMs: 1000 * 60 * 10,
  max: 49,
});

export const generalLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 100,
});
