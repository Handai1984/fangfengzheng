cc.Class({
    extends: cc.Component,
    //todo:障碍物随机速度从上往下移动

    properties: {
        speed1: 0,
        speed2: 0,

    },

    start() {
        this.speedRnd = this.speed1 + (this.speed2 - this.speed1) * cc.random0To1(); //获得随机速度
       // console.log(this.speedRnd);
    },

    update(dt) {
        var sy = this.speedRnd * dt; //计算每帧速度
        this.node.y -= sy; //物体移动
    }

});