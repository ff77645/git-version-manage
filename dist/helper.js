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
const compareVersion = (version1, version2) => {
    const v1 = version1.split('.');
    const v2 = version2.split('.');
    for (var i = 0; i < Math.max(v1.length, v2.length); i++) {
        var num1 = i < v1.length ? parseInt(v1[i], 10) : 0;
        var num2 = i < v2.length ? parseInt(v2[i], 10) : 0;
        if (num1 > num2) {
            return true;
        }
        else if (num1 < num2) {
            return false;
        }
    }
    return false;
};
exports.compareVersion = compareVersion;
