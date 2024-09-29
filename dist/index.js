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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVersion = exports.showList = exports.deleteRelease = exports.createRelease = exports.init = void 0;
const helper_1 = require("./helper");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
class Logger {
    static log(...arg) {
        console.log(...arg);
    }
    static error(...arg) {
        console.error(...arg);
    }
}
class Gvm {
    constructor(options) {
        if (Gvm._instance instanceof Gvm)
            return Gvm._instance;
        this.options = options;
        const url = `${config_1.BASE_URL}/${options.owner}/${options.repo}`;
        const baseURL = options.proxy ? `${options.proxy}/${url}` : url;
        this.client = axios_1.default.create({
            baseURL
        });
        this.client.interceptors.response.use(response => response.data, err => Promise.reject(err));
        Gvm._instance = this;
    }
    clearCache() {
        const options = this.options;
        axios_1.default.delete(`${options.proxy}/cache-clear`, {
            params: {
                url: `${config_1.BASE_URL}/${options.owner}/${options.repo}/releases`
            }
        });
        axios_1.default.delete(`${options.proxy}/cache-clear`, {
            params: {
                url: `${config_1.BASE_URL}/${options.owner}/${options.repo}/releases/latest`
            }
        });
    }
    /**
     * 创建版本
     * @param params
     * @returns
     */
    createRelease(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { versionName, body, prerelease = false } = data;
            const params = {
                tag_name: (0, helper_1.formatVersionName)(versionName),
                name: body.title,
                body: JSON.stringify(body),
                prerelease: prerelease,
                access_token: this.options.access_token,
                target_commitish: this.options.ref
            };
            const res = yield this.client.post('/releases', params);
            if (this.options.proxy)
                this.clearCache();
            return res;
        });
    }
    /**
     * 删除指定版本
     * @param params
     * @returns
     */
    deleteRelease(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                access_token: this.options.access_token
            };
            const res = yield this.client.delete(`/releases/${data.id}`, { params });
            if (this.options.proxy)
                this.clearCache();
            return res;
        });
    }
    /**
     * 查看已发布版本
     * @param params
     * @returns
     */
    showList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                access_token: this.options.access_token,
                page: (data === null || data === void 0 ? void 0 : data.page) || 1,
                per_page: (data === null || data === void 0 ? void 0 : data.per_page) || 10,
                direction: (data === null || data === void 0 ? void 0 : data.direction) || 'desc',
            };
            const res = yield this.client.get(`/releases`, { params });
            return res;
        });
    }
    /**
     * 检查是否有更新
     * @param data
     * @returns
     */
    checkVersion(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentVersion } = data;
            try {
                const res = yield this.client.get(`/releases/latest`, { params: {
                        access_token: this.options.access_token
                    } });
                if (!res)
                    return {
                        success: false,
                        data: res,
                    };
                const hasUpdate = (0, helper_1.compareVersion)(res.tag_name, currentVersion);
                if (hasUpdate)
                    return {
                        success: true,
                        name: res.name,
                        id: res.id,
                        versionName: res.tag_name,
                        prerelease: res.prerelease,
                        body: JSON.parse(res.body)
                    };
                return {
                    success: true,
                };
            }
            catch (err) {
                return {
                    success: false,
                    err: err
                };
            }
        });
    }
}
const init = (params) => new Gvm(params);
exports.init = init;
const createRelease = (params) => {
    if (!Gvm._instance)
        return Logger.error("实例不存在");
    return Gvm._instance.createRelease(params);
};
exports.createRelease = createRelease;
const deleteRelease = (params) => {
    if (!Gvm._instance)
        return Logger.error("实例不存在");
    return Gvm._instance.deleteRelease(params);
};
exports.deleteRelease = deleteRelease;
const showList = (params) => {
    if (!Gvm._instance)
        return Logger.error("实例不存在");
    return Gvm._instance.showList(params);
};
exports.showList = showList;
const checkVersion = (params) => {
    if (!Gvm._instance)
        return Logger.error("实例不存在");
    return Gvm._instance.checkVersion(params);
};
exports.checkVersion = checkVersion;
