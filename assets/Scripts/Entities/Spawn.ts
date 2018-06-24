import Baloon from "./Baloon";
import GameManager from "../GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Spawn extends cc.Component {


    @property([cc.Prefab])
    public baloons: cc.Prefab[] = [];

    @property (cc.Float)
    public SpawnPeriod: number = 5;       

    start () {
        var self = this;        
        if (this.baloons.length > 0){
            this.schedule(function(){
                self.createBaloon();
            }, this.SpawnPeriod);
        }
    }

    createBaloon(){
        if (GameManager.Instance.IsGameOver) return;
        var baloon = this.baloons[Math.floor(Math.random() * this.baloons.length)];
        var node = cc.instantiate(baloon);
        node.parent = this.node;
        var max = 150;
        var min = -150;
        var rnd = Math.floor(Math.random() * (max - min)) + min;
      //  console.log('create baloon with rnd ' + rnd);        
        node.setPosition(this.node.x + rnd, 0);
    }
}