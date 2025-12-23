import "node:module";
import IP2Region from "ip2region";

//#region rolldown:runtime
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

//#endregion
//#region src/ip2region.cts
var require_ip2region = __commonJS({ "src/ip2region.cts"() {
	const ip = "127.0.0.1";
	const query = new IP2Region();
	const ipAddress = query.search(ip);
	console.log(">>> ipAddress:", ipAddress);
} });

//#endregion
export default require_ip2region();
