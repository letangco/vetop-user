/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import nodeXlsx from 'node-xlsx';
import slug from 'slug';
import { ERROR_CODE } from '../../../../external/constants/constants';
import { getSort } from '../../../../external/middleware/query';
import { error500, errorMessage } from '../../../../external/util/error';
import {
    createManyBestCode, findBestCodeByCondNoQuery, countBestCodeByCond, findOneBestCodeByCond
} from '../../user/bestCode.dao';
import { findOneCodeByCond } from '../../user/code.dao';
import { countCodeVipByCond, findCodeVipByCondDAO, findOneCodeVipByCondDAO } from '../../user/codeVip.dao';
import { countCodeSearch, deleteListCodeSearch, findOneCodeSearchByCondDAO, getCodeSearch } from '../../user/codeSearch.dao';
import BestCode from '../../user/bestCode.model';
import VIPCode from '../../user/codeVip.model';

export async function getTypeCodeDefault() {
    try {
        const payload = await findOneCodeByCond({ status: true });
        return payload;
    } catch (error) {
        return error500(error);
    }
}

export async function searchCode(query) {
    try {
        const cond = {};
        const sort = getSort(query);
        query.sort = sort;
        if (query?.keyword) {
            cond.code = { $regex: slug(query?.keyword, ' '), $options: 'i' };
        }
        if (query?.fromPrice) {
            cond.value = { $gte: parseInt(query.fromPrice) };
        }
        if (query?.toPrice) {
            cond.value = { $lte: parseInt(query.fromPrice) };
        }
        if (query?.fromPrice && query?.toPrice) {
            cond.value = { $lte: parseInt(query.fromPrice), $gte: parseInt(query.fromPrice) };
        }
        if (query?.fromDay) {
            cond.createdAt = { $gte: new Date(query.fromDay).toISOString() };
        }
        if (query?.toDay) {
            cond.createdAt = { $lte: new Date(query.toDay).toISOString() };
        }
        if (query?.fromDay && query?.toDay) {
            cond.createdAt = {
                $gte: new Date(query.fromDay).toISOString(),
                $lte: new Date(query.toDay).toISOString()
            };
        }
        const promise = await Promise.all([countCodeSearch(cond), getCodeSearch(cond, query, sort)]);
        return [promise[0], promise[1]];
    } catch (error) {
        return error500(error);
    }
}

export async function deleteSearchCodeAll() {
    try {
        await deleteListCodeSearch();
        return true;
    } catch (error) {
        console.log('deleteCodeSearch', error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteSearchCode(id) {
    try {
        const code = await findOneCodeSearchByCondDAO({ _id: id });
        if (!code) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await code.remove();
        return true;
    } catch (error) {
        console.log('deleteCodeSearch', error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getSearchCodeInfo(id) {
    try {
        const code = await findOneCodeSearchByCondDAO({ _id: id });
        if (!code) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        return code;
    } catch (error) {
        console.log('deleteCodeSearch', error);
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

// Loại phần tử trùng trong arr
function uniqueCode(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!newArr.includes(arr[i])) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

// Loại phần tử trùng trong arr
// function uniqueCodeInsert(arr) {
//     const formArr = arr.sort((a, b) => a.code - b.code);
//     const newArr = [formArr[0]];
//     for (let i = 1; i < formArr.length; i++) {
//         if (formArr[i].code !== formArr[i - 1].code) {
//             newArr.push(formArr[i]);
//         }
//     }
//     return newArr;
// }

function uniqueCodeInsert(arr) {
    const obj = {};
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i].code]) {
            obj[arr[i].code] = 1;
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

export async function importCode(data) {
    try {
        for (let i = 0; i < data.length; i++) {
            if (!data[i]?.code) return errorMessage(400, ERROR_CODE.CODE_IS_NOT_EMPTY);
        }
        let codeList = data.map((item) => {
            return item.code;
        });
        codeList = uniqueCode(codeList);
        let bestCode = await findBestCodeByCondNoQuery({ code: { $in: codeList } });
        bestCode = bestCode.map(item => item.code);
        const list = [];
        data.forEach((item, index) => {
            if (!bestCode.includes(item.code)) {
                list.push(item);
            }
        });
        const dataInsert = uniqueCodeInsert(list);
        await createManyBestCode(dataInsert);
        return true;
    } catch (error) {
        return errorMessage(500, error);
    }
}


export async function getCodesService(options) {
    try {
        let keyword;
        const conditionSearchs = [];
        const conditionAll = {};
        if (options?.keyword) {
            keyword = slug(options?.keyword, ' ');
        } else keyword = '';
        if (keyword) {
            keyword = slug(options?.keyword, ' ');
            if (Number.isInteger(Number(options?.keyword))) {
                conditionSearchs.push(
                    { code: options?.keyword },
                    { rule: { $regex: keyword, $options: 'i' } },
                );
            } else {
                conditionSearchs.push(
                    { rule: { $regex: keyword, $options: 'i' } },
                );
            }
        } else {
            conditionSearchs.push({ rule: { $regex: '' } });
        }
        conditionAll.['$or'] = conditionSearchs;
        const promises = await Promise.all([
            countBestCodeByCond(conditionAll),
            BestCode.find(conditionAll)
                .sort({ createdAt: -1 })
                .skip(options.skip)
                .limit(options.limit)
                .select({ __v: 0 })
        ]);
        return [promises[0], promises[1]];
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getCodeService(id) {
    try {
        const code = await findOneBestCodeByCond({ _id: id });
        if (!code) {
            return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        }
        return code;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteBestCode(id) {
    try {
        const code = await findOneBestCodeByCond({ _id: id });
        if (!code) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await code.remove();
        return true;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateStatusBestCode(id, status) {
    try {
        const code = await findOneBestCodeByCond({ _id: id });
        if (!code) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        switch (status) {
            case 'true':
            case 'false':
                await code.updateOne({
                    $set: { status: status }
                });
                break;
            default:
                return errorMessage(400, ERROR_CODE.STATUS_INVALID);
        }
        return true;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateInfoBestCode(id, body) {
    try {
        const code = await findOneBestCodeByCond({ _id: id });
        if (!code) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        if (body?.code) {
            const hasCode = await findOneBestCodeByCond({ code: body.code });
            if (hasCode && hasCode.code !== code.code) return errorMessage(400, ERROR_CODE.UPDATE_NOT_ACCEPTABLE);
        }
        Object.keys(body)
            .forEach((key) => {
                code[key] = body[key];
            });
        await code.save();
        return true;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getVIPCodesService() {
    try {
        const promise = await Promise.all([
            countCodeVipByCond(),
            findCodeVipByCondDAO({})
        ]);
        return [promise[0], promise[1]];
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function getVIPCodeServiceInfo(id) {
    try {
        const codeVip = await findOneCodeVipByCondDAO({ _id: id });
        if (!codeVip) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        return codeVip;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function updateValueVIPCodeService(id, body) {
    try {
        const findCode = await findOneCodeVipByCondDAO({
            _id: id,
            rule: {
                $elemMatch: {
                    _id: body?.ruleId
                }
            }
        });
        if (!findCode) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
        await VIPCode.updateOne({ _id: id, 'rule._id': body.ruleId },
            { $set: { 'rule.$.value': body.value } });
        return true;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function showAutoGenerateCode() {
    try {
        const code = await findOneCodeByCond({ status: true });
        if (!code) return errorMessage(404, ERROR_CODE.CODE_NOT_FOUND);
        const temp = code.toJSON();
        delete temp.__v;
        return temp;
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

function insertItemAtPositionK(arr, n, k, x) {
    for (let i = n; i >= k; i--) {
        arr[i] = arr[i - 1];
    }
    arr[k] = x;
    n++;
    return arr;
}

export async function exportTempleFileCode() {
    try {
        const dataExcel = [];
        const headerFinal = ['code', 'rule'];
        const dataFile = [
            {
                code: 1111,
                rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên'
            },
            {
                code: 2222,
                rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên'
            },
            {
                code: 3333,
                rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên'
            },
            {
                code: 4444,
                rule: 'Trong 10 ngày sau ki đăng ký tài khoản phải có 50 ID Fan và có tổng Vetic ID Fan từ 10 triệu trở lên'
            }
        ];
        dataExcel.push(headerFinal);
        for (const item of dataFile) {
            const data = [];
            const keyUser = Object.keys(item);
            for (let i = 0; i < headerFinal.length; i++) {
                for (let j = 0; j < keyUser.length; j++) {
                    if (headerFinal[i] === keyUser[j]) {
                        insertItemAtPositionK(data, data.length, i, item[keyUser[j]]);
                        break;
                    }
                }
            }
            dataExcel.push(data);
        }
        const buffer = nodeXlsx.build([{ name: 'Sheet1', data: dataExcel }]);
        return ['temple.xlsx', buffer];
    } catch (error) {
        return errorMessage(500, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}
