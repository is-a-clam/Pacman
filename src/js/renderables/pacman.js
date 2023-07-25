import * as me from "melonjs/dist/melonjs.module.js"

import CONSTANTS from "../constants.js"
import DIRECTION from "../direction.js"

class Pacman extends me.Sprite {
    constructor(row, column) {
        let coord = me.state.current().tileToPixel(row, column)
        super(coord.x, coord.y, {
            image: me.loader.getImage("pacman"),
            width: CONSTANTS.TILE_SIZE,
            height: CONSTANTS.TILE_SIZE,
        })

        this.row = row
        this.column = column

        this.currentDirection = null
        this.queueDirection = null
        this.turnCooldown = null

        this.speed = CONSTANTS.TILE_SIZE * 9
    }

    update(dt) {
        super.update(dt)

        if (this.turnCooldown !== null) {
            if (!(this.turnCooldown.row == this.row && this.turnCooldown.column == this.column)) {
                this.turnCooldown = null
            }
        }

        this.queueDirection = null
        if (me.input.isKeyPressed(DIRECTION.up) && this.currentDirection != DIRECTION.up) {
            if (this.currentDirection == DIRECTION.down) {
                this.currentDirection = DIRECTION.up
            } else {
                this.queueDirection = DIRECTION.up
            }
        }
        if (me.input.isKeyPressed(DIRECTION.down) && this.currentDirection != DIRECTION.down) {
            if (this.currentDirection == DIRECTION.up) {
                this.currentDirection = DIRECTION.down
            } else {
                this.queueDirection = DIRECTION.down
            }
        }
        if (me.input.isKeyPressed(DIRECTION.left) && this.currentDirection != DIRECTION.left) {
            if (this.currentDirection == DIRECTION.right) {
                this.currentDirection = DIRECTION.left
            } else {
                this.queueDirection = DIRECTION.left
            }
        }
        if (me.input.isKeyPressed(DIRECTION.right) && this.currentDirection != DIRECTION.right) {
            if (this.currentDirection == DIRECTION.left) {
                this.currentDirection = DIRECTION.right
            } else {
                this.queueDirection = DIRECTION.right
            }
        }

        if (this.queueDirection !== null && this.turnCooldown === null) {
            let coord = me.state.current().tileToPixel(this.row, this.column)
            let threshold = CONSTANTS.TURN_THRESHOLD * CONSTANTS.TILE_SIZE
            if (Math.abs(this.pos.x - coord.x) < threshold && Math.abs(this.pos.y - coord.y) < threshold) {
                if (!me.state.current().columnlideWall(this.row, this.column, this.queueDirection)) {
                    this.currentDirection = this.queueDirection
                    this.pos.x = coord.x
                    this.pos.y = coord.y
                    this.turnCooldown = { row: this.row, column: this.column }
                }
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

        me.state.current().eatFood(this.row, this.column)

        return true
    }
}

export default Pacman
