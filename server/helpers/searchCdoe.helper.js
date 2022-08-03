import { findOneCodeVipByCondDAO } from "../components/user/codeVip.dao";

function checkType(number, type) {
    const value = type.rule.filter(r => r.type == number);
    return value[0];
  }

export async function searchCodeVip(num) {
    let maxPrice;
    let forward = 1;
    let tempForward = 1;
    let temp = 1;

    let arResult = [];

    let promise = await Promise.all([
        findOneCodeVipByCondDAO({ type: 'SAME_NUMBER' }),
        findOneCodeVipByCondDAO({ type: 'FIRST_SAME_NUMBER' }),
        findOneCodeVipByCondDAO({ type: 'LAST_SAME_NUMBER' }),
        findOneCodeVipByCondDAO({ type: 'FORWARD_NUMBER' })
      ]);
    promise = promise.filter(item => item);
    if (promise.length < 1) return false;
    num = Array.from(String(num), Number);
    for (let i = 0; i < num.length; i++) {
        if (num[i] === num[i + 1] && i < num.length) {
            forward++;
            if (forward === num.length) {
                let kq = checkType(forward, promise[0]);
                arResult.push(kq);
                forward = 1;
            }
        }
        if (forward >= 4 && num[i + 1] !== num[i + 2] && (i + 2) < num.length) {
            let kq2 = checkType(forward, promise[1]);
            forward = 1;
            arResult.push(kq2);
        }
        if (forward >= 4 && num[i + 1] !== num[i + 2] && (i + 2) < num.length && num[0] !== num[length - 1] && num[1] !== num[length - 1]) {
            let kq2 = checkType(forward, promise[1]);
            forward = 1;
            arResult.push(kq2);
        }
        if (forward > 3 && num[0] !== num[num.length - 2] && num[0] !== num[num.length - 3] && num.length === (i + 1)) {
            let kq3 = checkType(forward, promise[2]);
            forward = 1;
            arResult.push(kq3);
        }
        if (num[0] === 1 && i === 0) {
            tempForward++
            temp = i
        }
        if (tempForward >= 2 && temp === 0) {
            if (num[i + 1] === (num[i] + 1) && (i + 1) < num.length) {
                tempForward++
            }
            if (tempForward > 1 && num[i + 1] !== (num[i] + 1) && (tempForward === (num.length + 1))) {

                let kq4 = checkType(tempForward, promise[3]);
                arResult.push(kq4)
                tempForward = 1;
                temp = 1;
            }
        }
    }
    return arResult;
}
