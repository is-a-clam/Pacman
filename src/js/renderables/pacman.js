import * as me from 'melonjs/dist/melonjs.module.js';

import CONSTANTS from '../constants.js';
import DIRECTION from '../direction.js';

class Pacman extends me.Sprite {

    constructor(row, col) {
        let coord = me.state.current().tileToPixel(row, col);
        super(coord.x, coord.y, {
            image: me.loader.getImage("pacman"),
            width: CONSTANTS.TILE_SIZE,
            height: CONSTANTS.TILE_SIZE
        });

        this.row = row;
        this.col = col;

        this.currentDir = null;
        this.queueDir = null;

        this.speed = CONSTANTS.TILE_SIZE*9;
    }

    update(dt) {
        super.update(dt);

        this.queueDir = null;
        if (me.input.isKeyPressed(DIRECTION.up) && this.currentDir != DIRECTION.up) {
            if (this.currentDir == DIRECTION.down) {
                this.currentDir = DIRECTION.up;
            }
            this.queueDir = DIRECTION.up;
        }
        if (me.input.isKeyPressed(DIRECTION.down) && this.currentDir != DIRECTION.down) {
            if (this.currentDir == DIRECTION.up) {
                this.currentDir = DIRECTION.down;
            }
            this.queueDir = DIRECTION.down;
        }
        if (me.input.isKeyPressed(DIRECTION.left) && this.currentDir != DIRECTION.left) {
            if (this.currentDir == DIRECTION.right) {
                this.currentDir = DIRECTION.left;
            }
            this.queueDir = DIRECTION.left;
        }
        if (me.input.isKeyPressed(DIRECTION.right) && this.currentDir != DIRECTION.right) {
            if (this.currentDir == DIRECTION.left) {
                this.currentDir = DIRECTION.right;
            }
            this.queueDir = DIRECTION.right;
        }

        if (this.queueDir) {
            let coord = me.state.current().tileToPixel(this.row, this.col);
            if (Math.abs(this.pos.x - coord.x) < CONSTANTS.TURN_THRESHOLD * CONSTANTS.TILE_SIZE &&
                Math.abs(this.pos.y - coord.y) < CONSTANTS.TURN_THRESHOLD * CONSTANTS.TILE_SIZE) {
                if (!me.state.current().collideWall(this.row, this.col, this.queueDir)) {
                    this.currentDir = this.queueDir;
                    this.pos.x = coord.x;
                    this.pos.y = coord.y;
                }
            }
        }

        if (me.state.current().collideWall(this.row, this.col, this.currentDir)) {
            let coord = me.state.current().tileToPixel(this.row, this.col);
            switch (this.currentDir) {
                case DIRECTION.up:
                    if (this.pos.y <= coord.y) {
                        this.pos.y = coord.y;
                        return;
                    }
                    break;
                case DIRECTION.down:
                    if (this.pos.y >= coord.y) {
                        this.pos.y = coord.y;
                        return;
                    }
                    break;
                case DIRECTION.left:
                    if (this.pos.x <= coord.x) {
                        this.pos.x = coord.x;
                        return;
                    }
                    break;
                case DIRECTION.right:
                    if (this.pos.x >= coord.x) {
                        this.pos.x = coord.x;
                        return;
                    }
                    break;
            }
        }

        switch (this.currentDir) {
            case DIRECTION.up:
                this.pos.y -= this.speed * dt / 1000;
                this.row = Math.floor(this.pos.y / CONSTANTS.TILE_SIZE);
                break;
            case DIRECTION.down:
                this.pos.y += this.speed * dt / 1000;
                this.row = Math.floor(this.pos.y / CONSTANTS.TILE_SIZE);
                break;
            case DIRECTION.left:
                this.pos.x -= this.speed * dt / 1000;
                this.col = Math.floor(this.pos.x / CONSTANTS.TILE_SIZE);
                break;
            case DIRECTION.right:
                this.pos.x += this.speed * dt / 1000;
                this.col = Math.floor(this.pos.x / CONSTANTS.TILE_SIZE);
                break;
        }

        me.state.current().eatFood(this.row, this.col);

        return true;
    }
};

export default Pacman;
