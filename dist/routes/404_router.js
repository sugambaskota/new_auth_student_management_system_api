"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
router.use('/*', (req, res) => {
    res.status(404).json({
        "SORRY": " ☹ "
    });
});
//# sourceMappingURL=404_router.js.map