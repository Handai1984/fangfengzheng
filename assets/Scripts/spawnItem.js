cc.Class({
    extends: cc.Component,

    properties: {
        //创建预制体数组
        enemyPrefabs: {
            type: cc.Prefab,
            default: [],
        },
        pos1: {
            type: cc.Node,
            default: null,
        },
        pos2: {
            type: cc.Node,
            default: null,
        },

    },

    start() {
        this.preLen = this.enemyPrefabs.length;//获得数组长度
        this.p1 = this.pos1.getPosition();//获取p1的位置
        // console.log('p1'+this.p1);
        this.p2 = this.pos2.getPosition();//过去p2的位置
        // console.log('p2'+this.p2);
        // this.sapwanEnemys();//随机生成障碍物
        this.schedule(function(){
            this.sapwanEnemys()
        },2);
        
    },
    
    sapwanEnemys() {
        //生成随机预制体1.获得数组长度len，
        var preRnd = cc.random0To1() * this.preLen;
            preRnd = Math.floor(preRnd);
        //生成随机地点
        var posRndx = this.p1.x + (this.p2.x - this.p1.x ) * cc.random0To1(); 
        var posRndy = this.p1.y;
        // console.log('posrnd'+ cc.p(posRndx,posRndy));
        //生成预制体
        var enemy = cc.instantiate(this.enemyPrefabs[preRnd]);
        //绑定父物体
        enemy.parent = this.node;
   
        enemy.position = cc.p(posRndx,posRndy);
    },

});