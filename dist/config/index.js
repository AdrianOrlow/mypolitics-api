"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RateLimit = require("express-rate-limit");
const { NODE_ENV, DATABASE_URI, PORT } = process.env;
const config = {
    DATABASE_URI,
    limiter: new RateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100 // limit each IP to 100 requests per windowMs
    }),
    options: {
        port: PORT,
        endpoint: "/api",
        // Disable playground in production
        playground: NODE_ENV === "development" ? "/playground" : false
    }
};
exports.default = Object.assign({}, config);
//# sourceMappingURL=index.js.map