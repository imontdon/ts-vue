<script lang="tsx">
import Vue,{ CreateElement } from 'vue'
import { Watch, Prop, Emit, Component } from 'vue-property-decorator'

 interface IDTooltip {
     content?: string,
     effect?: string,
     placement?: string
 }

 @Component
 class Tooltip extends Vue {
    @Prop ({ required: false, default: '' })
    private content: string
    @Prop ({ required: false, default: 'dark' })
    private effect: string
    @Prop ({ required: false,default: 'bottom'})
    private placement: string

    private state: IDTooltip 
        constructor() {
        super()
        this.state = {
            content: '',
            effect: 'dark',
            placement: 'bottom',
        }
    }

    render(h: CreateElement) {
        return (
            <div 
            on-mouseenter={() => this.toogleToolTip(1)}
            on-mouseleave={() => this.toogleToolTip(2)}
            class="id-tooltip">
                <div 
                ref="toolTip" 
                class={`id-tooltip-popup id-tooltip--${this.state.effect} id-tooltip--${this.state.placement}`}>
                    <span>{this.state.content}</span>
                </div>
                {this.$slots.default}
            </div>
        )
    }
    // 提示框显现与否
    toogleToolTip(val: number){
       let dom =  this.$refs.toolTip as any
       dom.style.display = val == 1 ? 'block' : 'none'
    }
    @Watch('content', { immediate: true })
    onContentChange(val: string, oldVal: string) {
        this.setState({ content: val })
    }
    @Watch('effect', { immediate: true })
    onEffectChange(val: string, oldVal: string) {
        this.setState({ effect: val })
    }
    @Watch('placement',{ immediate: true})
    onPlacementChange(val: string,old) {
        this.setState({ placement: val})
    }

    setState(obj: IDTooltip) {
        setTimeout(() => {
            Object.keys(obj).forEach(key => {
                this.state[key] = obj[key] 
            })  
        }, 10);
    }
 } 

export default Tooltip
</script>
<style lang="scss" scoped>
    .id-tooltip{
        position: relative;
        width: fit-content;

        &-popup{
            position: absolute;
            display: none;
            border: 1px solid #303133;
            font-size: 10px;
            box-sizing: border-box;
            border-radius: 4px;
            padding: 10px;
            z-index: 2000;
            line-height: 1.2;
        } 
        // 主题色控制  
        &--dark{
            color: #fff;
            background: #303133;
        }
        &--light{
            color: #303133;
            background: #fff;
            border: 1px solid #303133;
             &::after{
                @extend .arrowPart;
                border-color: transparent transparent white transparent;
                border-width: 0 8px 9px 8px;
                left: 50%;
                top: -9px;
                transform: translateX(-50%)
            }
        }
        // 位置控制1.0version ---上下左右
        .arrowPart{
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            border-style: solid;
            border-color: transparent transparent #303133 transparent;
            border-width: 0 6px 7px 6px;
        }
        // 小箭头
        @mixin arrow-placement($transform, $rotate, $top, $left){
            &::before{
                @extend .arrowPart;
                // 箭头相对于提示框的定位
                top: $top;
                left: $left;
                transform: $transform $rotate;
            }
        }
        &--top{
            top: 0px;
            right: 30px;
            @include arrow-placement(translateX(-50%), rotate(180deg), 100%, 50%)
        }
        &--bottom{
            @include arrow-placement(translateX(-50%), rotate(0), -7px, 50%)
        }
        &--left{
            @include arrow-placement(translate(-3px,-50%), rotate(90deg), 50%, 100%)
        }
        &--right{
            top: 0px;
            right: -120px;
            @include arrow-placement(translate(-10px,-50%), rotate(-90deg), 50%, 0)
        }
    }
</style>