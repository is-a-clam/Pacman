import * as me from "melonjs/dist/melonjs.module.js"
import "index.css"

import PlayScreen from "js/stage/play.js"
import Pacman from "js/renderables/pacman.js"
import Food from "js/renderables/food.js"
import Ghost from "js/renderables/ghost.js"

import DataManifest from "js/manifest.js"

me.device.onReady(() => {
    // initialize the display canvas once the device/browser is ready
    if (
        !me.video.init(704, 704, {
            parent: "screen",
            scale: "auto",
            scaleMethod: "fill-min",
        })
    ) {
        alert("Your browser does not support HTML5 canvas.")
        return
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === "development") {
        import("js/plugin/debug/debugPanel.js").then(plugin => {
            me.utils.function.defer(me.plugin.register, this, plugin.DebugPanelPlugin, "debugPanel")
        })
    }

    me.audio.init("mp3,ogg")
    me.loader.crossOrigin = "anonymous"

    me.loader.preload(DataManifest, function () {
        me.state.set(me.state.PLAY, new PlayScreen())
        me.pool.register("player", Pacman)
        me.pool.register("food", Food)
        me.pool.register("ghost", Ghost)
        me.state.change(me.state.PLAY)
    })
})
