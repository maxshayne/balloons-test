const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    public static Instance: GameManager;

    @property
    public LifeCount: number = 3;
    
    public popAudio: cc.AudioSource = null;

    public BalloonsPopped: number = 0;

    public IsGameOver: boolean;    

    public IsGameStart: boolean = false;;

    onLoad() {
        this.popAudio = this.getComponent(cc.AudioSource);
        this.IsGameOver = false;        
        if (GameManager.Instance == null || GameManager.Instance != this) {
            GameManager.Instance = this;
        }
    }

    update(dt) {
        if (this.LifeCount <= 0 && !this.IsGameOver) {
            this.IsGameOver = true;
            this.endGame();
        }
    }

    endGame(){   

    }
}