"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});
exports.default = mongoose.model("Category", CategorySchema);
//# sourceMappingURL=Category.model.js.map