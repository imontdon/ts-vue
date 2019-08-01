# ts-vue
## **icon:** 
  #### class='id-icon icon-'
    pencil
    image
    file-empty
    file-text2
    file-play
    file-video
    barcode
    qrcode
    compass
    clock
    alarm
    spinner6
    search
    bin
    clipboard
    grin
    cancel-circle
    circle-down
    paragraph-left
    paragraph-right
    github

## components
  ### input
  Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|
  |type|类型|string|text, password, textarea|'text'|
  |placeholder|输入框占位文本|string|——|——|
  |prefix|前缀图标|上述icon|——|——|
  |suffix|后缀图标|上述icon|——|——|
  |clearable|是否可清除|boolean|——|false|
  |value|输入框的值|string|——|——|
  |disabled|是否禁用状态|boolean|——|false|

  Input Events

  |事件名称|说明|回调参数|
  |:--:|:--:|:--:|
  |input|输入时触发|(val: string, input: Input)|
  |change|在 Input 值改变时触发|(event: Event, input: Input)|
  |blur|在 Input 失去焦点时触发|(event: Event, input: Input)|
  |focus|在 Input 获得焦点时触发|(event: Event, input: Input)|
  |clear|在点击由 clearable 属性生成的清空按钮时触发|(event: Event, input: Input)|

  Input Methods

  |事件名称|说明|回调参数|
  |:--:|:--:|:--:|
  |blur|使 input 失去焦点|——|
  |focus|使 input 获取焦点|——|

  ### select:
  Select Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|  
  |value|select框的值|string|——|——|
  |placeholder|select框提示语|string|——|——|
  |clearable|是否可清除|boolean|——|false|
  |filterable|是否可筛选|boolean|——|false|

  Select Events

  |事件名称|说明|回调参数|
  |:--:|:--:|:--:|
  |change|选中值发生变化时触发|(val: string)|
  |clear|可清空的单选模式下用户点击清空按钮时触发|——|

  Option Group Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|  
  |label|分组的组名|string|——|——|

  Option Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|  
  |value|选项的值|string|——|——|
  |label|选项的标签|string|——|——|
  |disabled|是否禁用该选项|boolean|——|false|

  ### button
  Attributes:

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|
  |icon|图标类名|string|上述icon|''|
  |type|类型|string|default,primary, success, info, warning, danger|'default'|
  |plain|是否朴素按钮|boolean|——|false|
  |round|是否圆角按钮|boolean|——|false|
  |circle|是否圆形按钮|boolean|——|false|
  |loading|是否加载中状态|boolean|——|false|
  |disabled|是否禁用状态|boolean|——|false|
  ps: circle 有bug未解决

  ### radio
  Radio Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|
  |value|选中的值|string|——|——|
  |disabled|是否被禁用|boolean|——|false|

  Radio Events

  |事件名称|说明|回调参数|
  |:--:|:--:|:--:|
  |change|绑定值变化时触发的事件|选中的 Radio的值|

  Radio-group Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|
  |value|选中的值|string|——|——|
  
  Radio-group Events

  |事件名称|说明|回调参数|
  |:--:|:--:|:--:|
  |change|绑定值变化时触发的事件|选中的 Radio的值|

  Radio-button Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|
  |value|选中的值|string|——|——|
  |disabled|是否被禁用|boolean|——|false|
  ### checkbox

  Checkbox Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|
  |label|选中的值|string|——|——|
  |disabled|是否被禁用|boolean|——|false|

  Checkbox Events

  |事件名称|说明|回调参数|
  |:--:|:--:|:--:|
  |change|绑定值变化时触发的事件|选中的 Checkbox的值|

  Checkbox-group Attributes

  |参数|说明|类型|可选值|默认值|
  |:--:|:--:|:--:|:--:|:--:|
  |value|多选数组|array|——|——|

  Checkbox-group Events

  |事件名称|说明|回调参数|
  |:--:|:--:|:--:|
  |change|绑定值变化时触发的事件|选中的 Checkbox的值|
  

  
    

  