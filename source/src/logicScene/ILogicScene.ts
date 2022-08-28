/**
 * @Author       : zsk
 * @Date         : 2022-08-05 21:17:13
 * @LastEditors  : zsk
 * @LastEditTime : 2022-08-29 01:34:09
 * @Description  : 
 */
export interface IScene {
	readonly name: string;

	/**加载场景，进入场景前的资源加载 */
	load(): Promise<void>;

	/** 进入场景 */
	enter(data: any): void;

	/** 退出场景 */
	exit(): void;
}