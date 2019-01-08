
import {
  REG_RULES,
  isPhone,
  isEmail,
  isIdCard,
  isNumber,
  isInt,
  isFive,
} from './reg';

// 判断手机号
export function validatePhone(rule, value, callback) {
  const _phoneNum = Number(value);
  if (_phoneNum && !isPhone(_phoneNum)) {
    callback(new Error(REG_RULES.phone.msg));
  } else if (isNaN(_phoneNum)) {
    callback(new Error(REG_RULES.phone.msg));
  } else {
    callback();
  }
}

// 判断邮箱
export function validateEmail(rule, value, callback) {
  if (value && !isEmail(value)) {
    callback(new Error(REG_RULES.email.msg));
  } else {
    callback();
  }
}

// 判断身份证
export function validateIdCard(rule, value, callback) {
  if (value && !isIdCard(value)) {
    callback(new Error(REG_RULES.idCard.msg));
  } else {
    callback();
  }
}

// 判断 Number, 最多4位小数
export function validateNumber(rule, value, callback) {
  if (value && !isNumber(value)) {
    callback(new Error(REG_RULES.number.msg));
  } else {
    callback();
  }
}

// 判断 int
export function validateInt(rule, value, callback) {
  if (value && !isInt(value)) {
    callback(new Error(REG_RULES.int.msg));
  } else {
    callback();
  }
}

// 判断 5的倍数
export function validateFive(rule, value, callback) {
  if (value && !isFive(value)) {
    callback(new Error(REG_RULES.int.msg));
  } else {
    callback();
  }
}
