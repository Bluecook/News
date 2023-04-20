import { App, Directive } from "vue";

export default function setupadmin(app: App) {
    function admin(el: HTMLElement, value: [number, string]) {
        if (value[0] !== 0 && value[1] == 'user') {
            el.remove()
        } else {
            // el.remove()
            return
        }
    }

    const adminDirective: Directive<HTMLElement> = {
        mounted(el, binding) {
            admin(el, binding.value)
        }
    }
    app.directive('admin', adminDirective)
}