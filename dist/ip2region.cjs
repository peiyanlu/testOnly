"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ip2region_1 = __importDefault(require("ip2region"));
const ip = '127.0.0.1';
const query = new ip2region_1.default();
const ipAddress = query.search(ip);
console.log('>>> ipAddress:', ipAddress);
// >>> ipAddress: { country: '', province: '', city: '内网IP', isp: '内网IP' }
