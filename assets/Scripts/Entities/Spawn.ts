import Baloon from "./Baloon";
import GameManager from "../GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Spawn extends cc.Component {


    @property([cc.Prefab])
    public balloonPrefab: cc.Prefab;

    @property(cc.Float) 
    public diffiqultyEdge: number = 5;

    @property(cc.Float)
    public balloonSpeed: number = 1;    

    @property (cc.Float)
    public SpawnPeriod: number = 5;    
    
    private balloonsCreated: number = 0;

    start () {
        var self = this;        
        if (this.balloonPrefab != null){
            this.schedule(function(){
                self.createBaloon();
            }, this.SpawnPeriod);
        }
    }

    createBaloon(){
        if (GameManager.Instance.IsGameOver) return;       
        if (!GameManager.Instance.IsGameStart){
            GameManager.Instance.IsGameStart = true;
        }
        var node = cc.instantiate(this.balloonPrefab);
        node.getComponent(Baloon).baloonSpeed = this.balloonSpeed;
        node.parent = this.node;
        var max = 150;
        var min = -150;
        var rnd = Math.floor(Math.random() * (max - min)) + min;
      //  console.log('create baloon with rnd ' + rnd);        
        node.setPosition(this.node.x + rnd, 0);
        this.balloonsCreated++;
        if (this.balloonsCreated % this.diffiqultyEdge == 0)
        {
            this.balloonSpeed++;
        }
    }
}