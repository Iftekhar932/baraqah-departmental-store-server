/* const whitelist = [
  "http://127.0.0.1:5500",
  "http://localhost:3001",
  "https://baraqah-departmental-store-server.onrender.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
 */

// if this one works above one is not needed
const whitelist = [
  "http://localhost:3001",
  "http://127.0.0.1:5500",
  "https://baraqah-departmental-store-server.onrender.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, true); // Allow any origin
      // callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
