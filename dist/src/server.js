"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./app/index"));
require("dotenv/config");
const PORT = process.env.PORT || 8000;
index_1.default.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map