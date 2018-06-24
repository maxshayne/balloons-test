import GameManager from "../GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cloud extends cc.Component {

    @property(cc.Float)
    public speed: number = 1;

    @property(cc.Float)
    public refreshTime: number = 10;

    private startPos: cc.Vec2

    private gm: GameManager;

    start() {
        this.startPos = this.node.position;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;   
    }

    update(dt) {
        if (GameManager.Instance != null){
            if (GameManager.Instance.IsGameOver) return;
        }             
        this.node.y -= this.speed;
    }

    resetCloud() {
        this.node.position = this.startPos;
    }

    private onCollisionEnter(other, self) {
        if (other.node.name == "Bottom") {            
            this.resetCloud();
        }
    }
}
