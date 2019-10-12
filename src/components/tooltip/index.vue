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
            // isHover: false
        }
    }

    render(h: CreateElement) {
        return (
            // main
            <div 
            on-mouseenter={() => this.toogleToolTip(1)}
            on-mouseleave={() => this.toogleToolTip(2)}
            class="id-tooltip">
                <div 
                ref="toolTip" 
                class={`id-tooltip-popup id-tooltip--${this.state.effect} id-tootip--${this.state.placement}` }>
                    <span>{this.state.content}</span>
                    <div class= "border-up-empty">
                    <span></span>
                    </div>
                </div>
                {this.$slots.default}
            </div>
        )
    }
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
        &-popup{
            display: none;
            position: absolute;
            border: 1px solid #303133;
            border-radius: 5px;
            padding: 10px;
            font-size: 12px;
            top: 50px;

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
        }
        // .tip-arrow{
        //         content: '';
        //         width: 0;
        //         height: 0;
        //         top: -10px;
        //         left: 50%;
        //         transform: translateX(-50%);
        //         border-left: 30px solid transparent;
        //         border-right: 30px solid transparent;
        //         border-bottom: 30px solid #333;
        //         position: relative;
        //         margin: 50px auto;
        // }
        // .border-up-empty {
        //     width: 0;
        //     height: 0;
        //     border-left: 30px solid transparent;
        //     border-right: 30px solid transparent;
        //     border-bottom: 30px solid #333;
        //     position: relative;
        //     margin: 50px auto;
        // }

        // .border-up-empty span {
        //     display: block;
        //     width: 0;
        //     height: 0;
        //     border-left: 28px solid transparent;
        //     border-right: 28px solid transparent;
        //     border-bottom: 28px solid white;
        //     position: absolute;
        //     left: -28px;
        //     top: 2px;
        // }

    }
</style>