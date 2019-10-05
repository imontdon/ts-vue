<script lang="tsx">
import Vue,{ CreateElement } from 'vue'
import { Watch, Prop, Emit, Component } from 'vue-property-decorator'

 interface IDTooltip {
     content?: string,
     effect?: string,
 }

 @Component
 class Tooltip extends Vue {
    private state: IDTooltip 
        constructor() {
        super()
        this.state = {
            content: 'this is tooltip',
            effect: 'dark'
        }
    }
    setState(obj: IDTooltip) {
        setTimeout(() => {
            Object.keys(obj).forEach(key => {
                this.state[key] = obj[key]
            })  
        }, 10);
    }
    render(h: CreateElement) {
        return (
            <div class="id-tooltip" >
            <div class={`id-tooltip--${this.state.effect}`}>
               <span>{this.state.content}</span>
            </div>
             
            </div>
        )
    }
 } 

export default Tooltip
</script>