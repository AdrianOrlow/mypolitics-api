"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const graphql_yoga_1 = require("graphql-yoga");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const mongoose = require("mongoose");
const helmet = require("helmet");
const config_1 = require("./config");
const QuestionResolver_1 = require("./resolvers/QuestionResolver");
const CategoryResolver_1 = require("./resolvers/CategoryResolver");
mongoose.Promise = global.Promise;
mongoose.connect(config_1.default.DATABASE_URI, {
    useNewUrlParser: true
});
mongoose.connection
    .once("open", () => console.log("MongoDB running"))
    .on("error", console.error.bind(console, "MongoDB connection error:"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [QuestionResolver_1.default, CategoryResolver_1.default],
            emitSchemaFile: true
        });
        const server = new graphql_yoga_1.GraphQLServer({
            schema
        });
        // HTTP security middleware
        server.express.use(helmet());
        // only if you're behind a reverse proxy
        // (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
        server.express.enable("trust proxy");
        // apply rate limiter to all requests
        server.express.use(config_1.default.limiter);
        server.start(config_1.default.options, ({ port, playground }) => console.log(`Server started, listening on port ${port} for incoming requests.
      \nPlayground: http://localhost:${port}${playground}`));
    });
}
init();
//# sourceMappingURL=index.js.map