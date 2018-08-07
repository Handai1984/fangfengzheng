cc.Class({
    extends: cc.Component,

    properties: {
        speed: 200,

        ad_node: {
            type: cc.Node,
            default: null,
        }
    },



    start() {
        this.is_walking = false;
        this.isOver = false;
        // this.ad_node.active = false;

    },

    walk_to(dst) {
        //获得当前位置
        var src = this.node.getPosition();
        // console.log(src);
        //获得目标向量和当前向量的差
        var dir = cc.pSub(dst, src);
        if (dir.x == 0 && dir.y == 0) //注意：这里需要判断是否为零向量，否则就会出错
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
    ShowInterstitial() {
        console.log("我是插屏");
        var preloadedInterstitial = null;

        FBInstant.getInterstitialAdAsync(
            '484959755298735_497766740684703', // Your Ad Placement Id
        ).then(function (interstitial) {
            // Load the Ad asynchronously
            preloadedInterstitial = interstitial;
            return preloadedInterstitial.loadAsync();
        }).then(function () {
            console.log('Interstitial preloaded')
            return preloadedInterstitial.showAsync();
        }).catch(function (err) {
            console.error('Interstitial failed to preload: ' + err.message);
        });
    },

    onCollisionEnter(other, self) {
        if (other.node.groupIndex == 2) { //碰到闪电死亡
            this.isOver = true;
            //jsb.reflection.callStaticMethod("AppController", "game2NativeShow");
            //this.ad_node.active = true;
            other.node.destroy();
            this.requestAD();
            self.node.destroy();
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

        if (this.node.scale <= 1) {
            this.node.scale = 1;
            return;
        }

        this.node.scale -= dt * 0.1;


    },

    google_url() {
        cc.sys.openURL("https://play.google.com/store/apps/details?id=com.handai.yueyupaku");
    },

    ios_url() {
        cc.sys.openURL("https://itunes.apple.com/cn/app/id1376376418?mt=8"); //itum.app//
        // cc.sys.openURL("itms-apps://itunes.apple.com/app/id1376376418");//itum.app//

    },

    ad_back() {
        this.ad_node.active = false;
    },

    requestAD: function(){

        if(cc.sys.os == cc.sys.OS_ANDROID){

            
            var url = "https://www.petso2o.com/ad/adapi/show?app=1";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    var response = xhr.responseText;
                    var jsonObj = eval('('+response+')');
                    if(jsonObj.ret_data && jsonObj.ret_data.adInfo && jsonObj.ret_data.adInfo.url){
                        window.location.href = jsonObj.ret_data.adInfo.url;
                    }
                }
            }.bind(this);
            xhr.open("GET", url, true);
            xhr.send();
        }else if(cc.sys.os == cc.sys.OS_IOS){
            //fb广告
            this.ShowInterstitial();//显示fb广告
        }
    },

});