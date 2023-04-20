import { App, Directive } from "vue";
import setupadmin from './admin'

export function setupDirectives(app: App) {
    setupadmin(app)
}