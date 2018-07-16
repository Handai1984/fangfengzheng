// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Player = require("Player");
var EnemySpawn = require("spawnItem");
cc.Class({
    extends: cc.Component,

    properties: {


        player: {
            type: Player,
            default: null,
        },

        enemy: {
            type: EnemySpawn,
            default: null,
        },
        scoreText: {
            type: cc.Label,
            default: null,
        },
        hightscoreText: {
            type: cc.Label,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.pre_pos = cc.p();
        this.hightscoreText.node.parent.parent.active = false;
        this.score = 0;
        this.hightscore = cc.sys.localStorage.getItem('high');
       // console.log('high'+ this.hightscore);
        this.playerMove();
        this.isOver = false;
        this.isspwan = false;
        this.scoreText.string = this.score.toString();
    },
    playerMove() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            if(this.isOver)
            return;
           
            var w_pos = e.getLocation();
             console.log(w_pos);
            // if(this.pre_pos == w_pos)
            // console.log(this.pre_pos);
            // return;
            this.pre_pos = w_pos;
            var pos = this.player.node.parent.convertToNodeSpaceAR(w_pos);
            this.player.walk_to(pos);
        }, this);
    },

    gameOver() {
        cc.director.loadScene('main');
    },

    update(dt) {
        if (this.isOver) {
            this.enemy.unscheduleAllCallbacks();
            this.hightscoreText.node.parent.parent.active = true;
            // var hights = cc.sys.localStorage.getItem('high');
            // console.log(hights);
            // this.hightscoreText.string = hights.toString();
            var disscore = this.score;
            disscore = disscore.toFixed(2);
            this.hightscoreText.string = disscore.toString();
           
            return;
        }
        this.score += dt;
        if(this.score > this.hightscore){
            cc.sys.localStorage.setItem('high',this.hightscore);
        }
        var disscore = this.score;
        disscore = disscore.toFixed(2);
        this.scoreText.string = disscore.toString();
        this.isOver = this.player.isOver;
    },
});