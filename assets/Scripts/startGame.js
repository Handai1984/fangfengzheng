cc.Class({
    extends:cc.Component,

    properties: {
       soundOnBtn: {
           type: cc.Node,
           default: null,          
       },
       soundOffBtn: {
           type: cc.Node,
           default: null,
       },
       gamestartnode: {
           type: cc.Node,
           default: null,
       }

    },

    onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.audio = this.getComponent(cc.AudioSource);
        this.soundOffBtn.active = false;
    },

    musicPlay() {
      
        this.audio.resume();
        this.soundOnBtn.active = true;//播放按钮打开
        this.soundOffBtn.active = false;//关闭按钮隐藏
    },

    musicOff() {
       
        this.audio.pause();
        this.soundOffBtn.active = true;
        this.soundOnBtn.active = false;
    },

    LoadScene() {
        cc.director.loadScene('main');
        this.soundOnBtn.active = true;
        this.soundOffBtn.active = false;
    }
});