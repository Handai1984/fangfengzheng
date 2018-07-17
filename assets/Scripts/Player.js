cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,
    },



    start() {
        this.is_walking = false;
        this.isOver = false;
        
        
    },

    walk_to(dst) {
        //获得当前位置
        var src = this.node.getPosition();
       // console.log(src);
        //获得目标向量和当前向量的差
        var dir = cc.pSub(dst, src);
        if(dir.x == 0 && dir.y == 0)//注意：这里需要判断是否为零向量，否则就会出错
        return;
        //获得向量dir的长度
        var len = cc.pLength(dir);
        //获得总的时间
        this.walk_time = len / this.speed;
        //设置当前时间
        this.now_time = 0;
        //设置判定是否行走
        this.is_walking = true;
        //计算速度
        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
    },

    onCollisionEnter(other, self) {
        if (other.node.groupIndex == 2) { //碰到闪电死亡
            this.isOver = true;
            jsb.reflection.callStaticMethod("AppController", "game2NativeShow");
            other.node.destroy();
        }
        if (other.node.groupIndex == 3) { //碰到白云变大
            if (this.node.scale >= 4)
                return;
            this.node.scale += 1;
           // console.log(this.node.scale);
            other.node.destroy();
        }
    },

    Move(dt) {
        //如果没有行走就返回
        if (!this.is_walking) {
            return;
        }
        //计算当前事件
        this.now_time += dt;
        //如果当前时间大于总时间，减去多余的时间
        if (this.now_time > this.walk_time) {
            dt -= (this.now_time - this.walk_time);
        }
        //计算当前变量值
        var sx = this.vx * dt;
        var sy = this.vy * dt;
        //移动
        this.node.x += sx;
        this.node.y += sy;
       // console.log(this.node.position);
        if (this.now_time >= this.walk_time) {
            this.is_walking = false;
        }
    },

    update(dt) {
        this.Move(dt);

        if(this.node.scale <= 1){
            this.node.scale = 1;
            return;
        }

        this.node.scale -= dt* 0.1;


    }

});