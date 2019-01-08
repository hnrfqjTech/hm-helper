export const REG_RULES = {
  phone: {
    reg: /^1\d{10}$/,
    msg: '手机号码格式错误',
  },
  email: {
    reg: /\S+@\S+\.\S+/,
    msg: '邮箱格式错误',
  },
  idCard: {
    reg: /^\d{15}$|^\d{17}\S{1}$/,
    msg: '身份证号码格式错误',
  },
  number: {
    reg: /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,3}([0-9])?$)/,
    msg: '格式错误',
  },
  int: {
    reg: /^[0]?$|^[1-9]+\d*$/,
    msg: '正整数格式错误',
  },
  isFive:{
    reg: /([1-9][0-9]*)?[05]/,
    msg: '必须是5的倍数',
  }
};

/**
 * 判断手机号
 * @param {Number} num
 */
export function isPhone(num) {
  return REG_RULES.phone.reg.test(num);
}

/**
 * 判断邮箱
 * @param {String} email
 */
export function isEmail(email) {
  return REG_RULES.email.reg.test(email);
}

/**
 * 判断身份证
 * @param {Number, String} idCard
 */
export function isIdCard(idCard) {
  return REG_RULES.idCard.reg.test(idCard);
}

/**
 * 判断Number(金额等)，非负数，最多4位小数
 * @param {Number, String} number
 * @example
 */
export function isNumber(number) {
  return REG_RULES.number.reg.test(number);
}

/**
 * 判断Int
 * @param {Number} int
 */
export function isInt(int) {
  return REG_RULES.int.reg.test(int);
}

/**
 * 判断5的倍数
 * @param {Number} int
 */
export function isFive(int) {
  return REG_RULES.isFive.reg.test(int);
}