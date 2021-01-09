import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1000 * 60 * 10,
  max: 20,
});
