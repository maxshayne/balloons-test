import User from "./Models/User";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuManager extends cc.Component {

    @property(cc.Node)
    list: cc.Node = null;

    @property(cc.Node)
    mainPanel: cc.Node = null;

    @property(cc.Node)
    scorePanel: cc.Node = null;

    pos: cc.Vec2;

    start() {
        var localUsers = JSON.parse(cc.sys.localStorage.getItem('users'));
        if (localUsers == null) {
            localUsers = [
                new User("John2", 5),
                new User("Jane3", 18),
                new User("Brad2", 30),
            ];
            cc.sys.localStorage.setItem('users', JSON.stringify(localUsers));
        }

        localUsers.sort((l,r): number => {
            if (l.score < r.score) return 1;
            if (l.score > r.score) return -1;
            return 0;
        });

        localUsers.forEach(element => {
            var node = new cc.Node();        
            node.height = 50;    
            node.width = this.list.width;
            var layout = node.addComponent(cc.Layout);                      
            layout.type = cc.Layout.Type.HORIZONTAL;
            layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
            layout.spacingX = 100;                        
            var name = new cc.Node();
            var label = name.addComponent(cc.Label);                      
            label.string = element.name;
            var score = new cc.Node();
            var label = score.addComponent(cc.Label);                      
            label.string = element.score;
            label.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
            node.addChild(name);
            node.addChild(score);               
            this.list.addChild(node);
        });

        this.pos = this.mainPanel.position;
    }

    onPlayButtonClick() {
        cc.director.loadScene("Game");
    }

    onLeaderboardsClick() {      
        this.mainPanel.setPosition(this.pos.x - this.pos.x*5, 0);
        this.scorePanel.setPosition(this.pos);
    }

    onBackLeaderClick(){
        this.scorePanel.setPosition(this.pos.x - this.pos.x*5, 0);
        this.mainPanel.setPosition(this.pos);
    }
}