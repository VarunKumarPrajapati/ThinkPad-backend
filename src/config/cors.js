const allowedOrigins = [
  "http://localhost:3000",
  "https://varun-thinkpad.vercel.app",
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error("Block by CORS:" + origin));
  },
  credentials: true,
};

module.exports = corsOptions;
