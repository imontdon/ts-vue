import { IDUIComponent, IDUIConponentSize } from './component'


/* 按钮类型 */
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

export declare class Button extends IDUIComponent {
  
  size: IDUIConponentSize

  type: ButtonType

  /* 淡 */
  plain: boolean

  /* 圆角 */
  round: boolean

  /* 加载图 */
  loading: boolean

  /* 是否可用 */
  disabled: boolean

  /* icon */
  icon: string
  
}