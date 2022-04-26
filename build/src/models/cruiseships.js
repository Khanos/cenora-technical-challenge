"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const CruiseShips = [];
exports.default = {
    addData: (data) => {
        data.id = (0, uuid_1.v4)();
        return CruiseShips.push(data);
    },
    addBulkData: (data) => {
        return CruiseShips.push(...data);
    },
    getData: () => {
        return CruiseShips;
    },
};
