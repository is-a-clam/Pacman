import * as me from "melonjs/dist/melonjs.module.js"

import PHASE from "../ghostPhase.js"
import DIRECTION from "../direction.js"
import CONSTANTS from "../constants.js"

class Ghost extends me.Sprite {
    constructor(row, column, image) {
        super(coord.x, coord.y, {
            image: me.loader.getImage("blinky"),
            width: CONSTANTS.TILE_SIZE,
            height: CONSTANTS.TILE_SIZE,
        })

        this.row = row
        this.column = column

        this.currentDirection = null
        this.turnCooldown = null

        this.spawn = { row: row, column: column }
        this.target = null
        this.phase = PHASE.chase
        this.speed = CONSTANTS.TILE_SIZE * 8
    }

    checkTarget(phase) {
        switch (phase) {
            case PHASE.chase:
                this.target = { row: 0, column: 0 }
                break
            case PHASE.scared:
                this.target = null
                break
            case PHASE.eaten:
                this.target = this.spawn
                break
        }
    }

    getDirection(target) {
        if (target == null) {
            console.log("AHHHHHHHHHHHHHHHH")
        } else {
            lowestDistance = INFINITY
            DIRECTION.directions.map(direction => {
                if (!me.state.current().columnlideWall(this.row, this.column, direction)) {
                    if (this.currentDirection && direction !== DIRECTION.opposite(this.currentDirection)) {
                        distanceSq = Math.pow(this.target.row - this.row, 2) + Math.pow(this.target.col - this.col, 2)
                        if (distanceSq < lowestDistance) {
                            lowestDistance = distanceSq
                            this.currentDirection = direction
                        }
                    }
                }
            })
        }
    }

    update(dt) {
        super.update(dt)

        this.checkTarget(this.phase)

        if (this.turnCooldown !== null) {
            if (!this.turnCooldown.row == this.row || !this.turnCooldown.column == this.column) {
                this.turnCooldown = null
            }
        }

        if (this.turnCooldown === null) {
            let coord = me.state.current().tileToPixel(this.row, this.column)
            let threshold = CONSTANTS.TURN_THRESHOLD * CONSTANTS.TILE_SIZE
            if (Math.abs(this.pos.x - coord.x) < threshold && Math.abs(this.pos.y - coord.y) < threshold) {
                this.getDirection(this.target)
                this.pos.x = coord.x
                this.pos.y = coord.y
                this.turnCooldown = { row: this.row, column: this.column }
            }
        }

        if (me.state.current().columnlideWall(this.row, this.column, this.currentDirection)) {
            let coord = me.state.current().tileToPixel(this.row, this.column)
            switch (this.currentDirection) {
                case DIRECTION.up:
                    if (this.pos.y <= coord.y) {
                        this.pos.y = coord.y
                        return
                    }
                    break
                case DIRECTION.down:
                    if (this.pos.y >= coord.y) {
                        this.pos.y = coord.y
                        return
                    }
                    break
                case DIRECTION.left:
                    if (this.pos.x <= coord.x) {
                        this.pos.x = coord.x
                        return
                    }
                    break
                case DIRECTION.right:
                    if (this.pos.x >= coord.x) {
                        this.pos.x = coord.x
                        return
                    }
                    break
            }
        }

        switch (this.currentDirection) {
            case DIRECTION.up:
                this.pos.y -= (this.speed * dt) / 1000
                this.row = Math.floor(this.pos.y / CONSTANTS.TILE_SIZE)
                break
            case DIRECTION.down:
                this.pos.y += (this.speed * dt) / 1000
                this.row = Math.floor(this.pos.y / CONSTANTS.TILE_SIZE)
                break
            case DIRECTION.left:
                this.pos.x -= (this.speed * dt) / 1000
                this.column = Math.floor(this.pos.x / CONSTANTS.TILE_SIZE)
                break
            case DIRECTION.right:
                this.pos.x += (this.speed * dt) / 1000
                this.column = Math.floor(this.pos.x / CONSTANTS.TILE_SIZE)
                break
        }

        return true
    }
}

export default Ghost
