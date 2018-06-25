import GameManager from "../GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Baloon extends cc.Component {

    @property(cc.Float)
    public baloonSpeed: number = 1;

    @property([cc.SpriteFrame])
    public skins: cc.SpriteFrame[] = [];

    private startPos: cc.Vec2;

    private xRange: number = 40;

    private colorNum: number = 0;

    private turn: boolean = true;

    private isTouched: boolean = false;

    start() {

        var sprite = this.node.getChildByName("Balloon").getComponent(cc.Sprite);
        var num = Math.floor(Math.random() * this.skins.length);
        this.colorNum = num;
        sprite.spriteFrame = this.skins[num];
        var max = this.xRange;
        var min = this.xRange - this.xRange * 2;
        this.xRange = Math.floor(Math.random() * (max - min)) + min;
        //  this.baloonSpeed =     
        var self = this;

        this.node.on('touchend', function () {
            self.onBaloonClick();
        }, this.node);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.startPos = this.node.position;
    }

    private onCollisionEnter(other, self) {
        if (GameManager.Instance.IsGameOver) return;
        switch (other.node.name) {
            case "Top":
                GameManager.Instance.LifeCount--;
                this.scheduleOnce(function () {
                    self.destroy();
                }, 5);
                break;
        }
    }

    update(dt) {
        if (GameManager.Instance.IsGameOver) return;
        this.node.y += this.baloonSpeed;

        switch (this.turn) {
            case true:
                this.node.x += this.baloonSpeed;
                if (this.node.position.x >= this.startPos.x + this.xRange) {
                    this.turn = !this.turn;
                }
                break;

            case false:
                this.node.x -= this.baloonSpeed;
                if (this.node.position.x <= this.startPos.x - this.xRange) {
                    this.turn = !this.turn;
                }
                break;
        }
    }

    onBaloonClick() {
        if (GameManager.Instance.IsGameOver) return;
        if (this.isTouched) return;
        this.isTouched = true;
        var anim = this.node.getChildByName("Balloon").getComponent(cc.Animation);
        anim.on('finished', this.onAnimCompleted, this);
        this.node.getChildByName("BalloonString").destroy();
        GameManager.Instance.BalloonsPopped++;
        GameManager.Instance.popAudio.play();
        anim.play(anim.getClips()[this.colorNum].name);
    }

    onAnimCompleted() {
        this.node.destroy();
    }
}