import * as me from "melonjs/dist/melonjs.module.js"
import Array2D from "array2d"

import DIRECTION from "../direction.js"
import CONSTANTS from "../constants.js"

class PlayScreen extends me.Stage {
    columnlideWall(row, column, dir) {
        let nextRow = row
        let nextColumn = column

        switch (dir) {
            case DIRECTION.up:
                nextRow = row - 1
                break
            case DIRECTION.down:
                nextRow = row + 1
                break
            case DIRECTION.left:
                nextColumn = column - 1
                break
            case DIRECTION.right:
                nextColumn = column + 1
                break
        }
        if (
            this.currentMap[nextRow][nextColumn] === this.maps.wall ||
            this.currentMap[nextRow][nextColumn] === this.maps.e_spawn
        ) {
            return true
        }
        return false
    }

    eatFood(row, column) {
        let index = this.tileToIndex(row, column)
        let food = this.food.get(index)
        if (food === undefined) {
            return false
        }
        this.foodQueue.push(index)
        this.food.delete(index)
        me.game.world.removeChild(food)
        if (this.foodQueue.length > 50) {
            let rand = Math.floor(Math.random() * this.foodQueue.length)
            let newIndex = this.foodQueue.splice(rand, 1)[0]
            let newFood = me.pool.pull(
                "food",
                Math.floor(newIndex / this.currentMap.length),
                newIndex % this.currentMap.length
            )
            this.food.set(newIndex, newFood)
            me.game.world.addChild(newFood)
        }
        return true
    }

    tileToPixel(row, column) {
        return {
            x: CONSTANTS.TILE_SIZE * column + CONSTANTS.TILE_SIZE / 2,
            y: CONSTANTS.TILE_SIZE * row + CONSTANTS.TILE_SIZE / 2,
        }
    }

    tileToIndex(row, column) {
        return row * this.currentMap.length + column
    }

    onResetEvent() {
        me.level.load("level1")
        this.maps = me.loader.getJSON("maps")
        this.currentMap = this.maps.levels[0]

        this.food = new Map()
        this.foodQueue = []
        Array2D.eachCell(this.currentMap, (cell, row, column, grid) => {
            if (cell === this.maps.food) {
                let food = me.pool.pull("food", row, column)
                this.food.set(this.tileToIndex(row, column), food)
                me.game.world.addChild(food)
            }
        })

        let pSpawn = Array2D.find(this.currentMap, cell => {
            return cell === this.maps.p_spawn
        })[0]
        this.player = me.pool.pull("player", pSpawn[0], pSpawn[1])
        me.game.world.addChild(this.player)

        me.input.bindKey(me.input.KEY.W, DIRECTION.up)
        me.input.bindKey(me.input.KEY.S, DIRECTION.down)
        me.input.bindKey(me.input.KEY.A, DIRECTION.left)
        me.input.bindKey(me.input.KEY.D, DIRECTION.right)
    }

    onDestroyEvent() {
        me.input.unbindKey(me.input.KEY.W)
        me.input.unbindKey(me.input.KEY.S)
        me.input.unbindKey(me.input.KEY.A)
        me.input.unbindKey(me.input.KEY.D)
    }
}

export default PlayScreen
