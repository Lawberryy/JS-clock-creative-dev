import GlobalContext from "../GlobalContext"
import DomElement from "../utils/DomElement"

export default class Scene {
    constructor(id = "canvas-scene") {
        this.id = id
        this.globalContext = new GlobalContext()
        this.globalContext.pushScene(this)

        // debug
        this.params = {
            'play': true
        }
        this.debug = this.globalContext.debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder(this.id)
            // this.debugFolder.add(this.params, 'play')
        }

        // canvas
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.instance
        this.context = this.canvas.getContext('2d')
        this.resize()
    }

    get width() { return this.domElement.width }
    get height() { return this.domElement.height }
    get postion() { return this.domElement.position }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    update() {
        return this.params['play']
    }

    resize() {
        this.domElement.setSize()
        this.canvas.width = this.domElement.width * this.globalContext.windowSize.pixelRatio // set dimensions
        this.canvas.height = this.domElement.height * this.globalContext.windowSize.pixelRatio
        this.context.scale(this.globalContext.windowSize.pixelRatio, this.globalContext.windowSize.pixelRatio)
    }

    destroy() { }
}