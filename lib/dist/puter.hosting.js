"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.uploadImageToHosting = exports.getOrCreateHostingConfig = void 0;
var puter_js_1 = require("@heyputer/puter.js");
var utils_1 = require("./utils");
exports.getOrCreateHostingConfig = function () { return __awaiter(void 0, void 0, Promise, function () {
    var existing, subdomain, created, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puter_js_1["default"].kv.get(utils_1.HOSTING_CONFIG_KEY)];
            case 1:
                existing = (_a.sent());
                if (existing === null || existing === void 0 ? void 0 : existing.subdomain)
                    return [2 /*return*/, { subdomain: existing === null || existing === void 0 ? void 0 : existing.subdomain }];
                subdomain = utils_1.createHostingSlug();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, puter_js_1["default"].hosting.create(subdomain, ".")];
            case 3:
                created = _a.sent();
                return [2 /*return*/, { subdomain: created.subdomain }];
            case 4:
                e_1 = _a.sent();
                console.warn("Could not find subdomain: " + e_1);
                return [2 /*return*/, null];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.uploadImageToHosting = function (_a) {
    var hosting = _a.hosting, url = _a.url, projectId = _a.projectId, label = _a.label;
    return __awaiter(void 0, void 0, Promise, function () {
        var resolved, _b, contentType, ext, dir, filePath, uploadFile, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!hosting || !url)
                        return [2 /*return*/, null];
                    if (utils_1.isHostedUrl(url))
                        return [2 /*return*/, { url: url }];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    if (!(label == 'rendered')) return [3 /*break*/, 3];
                    return [4 /*yield*/, utils_1.imageUrlToPngBlob(url)
                            .then(function (blob) { return blob ? { blob: blob, contentType: 'image/png' } : null; })];
                case 2:
                    _b = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, utils_1.fetchBlobFromUrl(url)];
                case 4:
                    _b = _c.sent();
                    _c.label = 5;
                case 5:
                    resolved = _b;
                    if (!resolved)
                        return [2 /*return*/, null];
                    contentType = resolved.contentType || resolved.blob.type || '';
                    ext = utils_1.getImageExtension(contentType, url);
                    dir = "projects/" + projectId;
                    filePath = dir + "/" + label + "." + ext;
                    uploadFile = new File([resolved.blob], label + "." + ext, {
                        type: contentType
                    });
                    return [3 /*break*/, 7];
                case 6:
                    e_2 = _c.sent();
                    console.warn("Failed to store hosted image: " + e_2);
                    return [2 /*return*/, null];
                case 7: return [2 /*return*/];
            }
        });
    });
};
