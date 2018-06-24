import GameManager from "./GameManager";
import User from "./Models/User";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Label)
    public LifeLabel: cc.Label = null;

    @property(cc.Label)
    public BalloonsPoppedLabel: cc.Label = null;

    @property(cc.Node)
    public GameOverPanel: cc.Node = null;

    @property(cc.Node)
    public BackButton: cc.Node = null;

    @property(cc.EditBox)
    public NameEditBox: cc.EditBox = null;

    @property(cc.Label)
    public ScoreLabel: cc.Label = null;

    private gmInstance: GameManager;

    private saveButtonClicked: boolean = false;;

    start() {
        this.gmInstance = GameManager.Instance;
    }

    update(dt) {
        this.LifeLabel.string = this.gmInstance.LifeCount.toString();
        this.BalloonsPoppedLabel.string = this.gmInstance.BalloonsPopped.toString();
        this.ScoreLabel.string = this.gmInstance.BalloonsPopped.toString();
        if (this.gmInstance.IsGameOver) {
            this.GameOverPanel.active = true;
            this.BackButton.active = false;
        }
    }

    onBackButton() {
        cc.director.loadScene("Menu");
    }

    onSaveButton(){
        if (this.saveButtonClicked) return;
        this.saveButtonClicked = true;
        var localUsers = JSON.parse(cc.sys.localStorage.getItem('users'));
        var playerName = this.NameEditBox.string;
        let item = localUsers.find(i => i.name === playerName);
        if (item != null)
        {
            item.score = this.gmInstance.BalloonsPopped;
        }
        else
        {
            console.log(playerName);
            console.log(this.gmInstance.BalloonsPopped);
            var user = new User(playerName, this.gmInstance.BalloonsPopped);
            localUsers.push(user);
        }
        cc.sys.localStorage.setItem('users', JSON.stringify(localUsers));
        cc.director.loadScene("Menu");
    }    
}
