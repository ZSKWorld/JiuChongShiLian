export const enum ErrorCode {
    None = 0,
    /** 未知的命令 */
    UnknownCmd = 1000,
    /** 未知的数据类型 */
    Unknown_Data_Type,
    /** 用户不存在 */
    USER_NOT_EXIST,
    /** 用户已存在 */
    USER_EXIST,
    /** 账号为空 */
    ACCOUNT_IS_EMPTY,
    /** 密码为空 */
    PASSWORD_IS_EMPTY,
    /** 昵称为空 */
    NICKNAME_IS_EMPTY,
    /** 异地登陆 */
    LOGIN_OTHER_PLACE,
}