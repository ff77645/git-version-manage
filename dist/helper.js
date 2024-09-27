"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareVersion = exports.formatVersionName = void 0;
const formatVersionName = (versionName) => {
    const arr = versionName.split('.');
    if (arr.length > 3)
        throw Error('版本格式错误');
    arr.forEach(strNum => {
        const num = Number(strNum);
        if (num < 0 || Number.isNaN(num))
            throw Error('版本格式错误');
    });
    if (arr.length === 3)
        return arr.join('.');
    arr.push('0');
    return (0, exports.formatVersionName)(arr.join('.'));
};
exports.formatVersionName = formatVersionName;
const compareVersion = (v1, v2) => {
    const v1_arr = v1.split('.');
    const v2_arr = v2.split('.');
    return (v2_arr[0] > v1_arr[0] ||
        v2_arr[1] > v1_arr[1] ||
        v2_arr[2] > v1_arr[2]);
};
exports.compareVersion = compareVersion;
