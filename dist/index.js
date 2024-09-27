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
exports.showList = exports.deleteRelease = exports.createRelease = exports.init = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const helper_1 = require("./helper");
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
        this.ref = 'master';
        if (Gvm._instance instanceof Gvm)
            return Gvm._instance;
        this.request = axios_1.default.create({
            baseURL: config_1.BASE_URL,
        });
        this.options = options;
        Gvm._instance = this;
    }
    /**
     * 创建版本
     * @param params
     * @returns
     */
    createRelease(data) {
        const { versionName, message } = data;
        const body = {
            tagName: `${message.platform}-${(0, helper_1.formatVersionName)(versionName)}`,
            ref: this.ref,
            message: JSON.stringify(message)
        };
        const params = Object.assign(Object.assign({}, this.options), { body });
        return this.request.post(`/repository/${this.options.repositoryId}/tags/create`, params);
    }
    /**
     * 删除指定版本
     * @param params
     * @returns
     */
    deleteRelease(data) {
        const params = Object.assign(Object.assign({}, this.options), { tagName: data.versionName });
        return this.request.delete(`/repository/${this.options.repositoryId}/tags/delete`, { params });
    }
    /**
     * 查看已发布版本
     * @param params
     * @returns
     */
    showList(data) {
        const params = Object.assign(Object.assign({}, this.options), data);
        return this.request.get(`/repository/${this.options.repositoryId}/tag/list`, { params });
    }
    /**
     * 检查是否有更新
     * @param data
     * @returns
     */
    checkVersion(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentVersion } = data;
            const params = Object.assign(Object.assign(Object.assign({}, this.options), { search: data.platform }), data);
            try {
                const { data: { result } } = yield this.request.get(`/repository/${this.options.repositoryId}/tag/list`, { params });
                if (result.length) {
                    const release = result.find((item) => {
                        const version = item.name.split('-')[1];
                        return (0, helper_1.compareVersion)(currentVersion, version);
                    });
                    if (release) {
                        return {
                            success: true,
                            version: release.name.split('-')[1],
                            data: JSON.parse(release.message)
                        };
                    }
                    else {
                        return {
                            success: true
                        };
                    }
                }
                else {
                    return {
                        success: true
                    };
                }
            }
            catch (err) {
                return {
                    success: false,
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
