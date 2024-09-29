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
Object.defineProperty(exports, "__esModule", { value: true });
// import {init,checkVersion} from '../dist/index'
// const {init,checkVersion} = require('../dist/index.js')
require("dotenv/config");
const index_1 = require("../index");
const helper_1 = require("../helper");
const env = process.env;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, index_1.init)({
            owner: env.owner,
            repo: env.repo,
            access_token: env.access_token,
            ref: 'main'
        });
        // await createRelease({versionName:'1.2.2',body:{title:'测试',url:'123',platform:'android'}})
        // await deleteRelease({
        //   id:438260,
        // })
        // const res =await checkVersion({
        //   currentVersion:'1.0.0',
        // })
        // const res = await showList();
        // console.log({ res });
        const d = (0, helper_1.compareVersion)('1.0.0', '1.0.1');
        console.log({ d });
    });
}
main();
