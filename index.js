
class Monster {
    constructor(name) {
        this.health = randomNum(50,100);
        this.name = name;
        this.alive = true;
    }

}

class Werewolf extends Monster {
    constructor(name) {
        super(name);
    }

    bite(target) {
        target.health -= randomNum(10,40);
        console.log(`${target.name} was bitten by ${this.name} and has ${target.health} health left`)
        if (target.health <= 0) {
            target.alive = false;
            target.selfDestruct(this)
        }
    }

    tear(target) {

        let odds = randomNum(1,10);

        if (odds < 2) {
            console.log(`${this.name} really tore into ${target.name} who is now bleeding out`)
            setInterval(() => {
                target.health--;
                if (target.health <= 0) {
                    target.alive = false;
                    target.selfDestruct(this);
                }
            },3000)
        } else {
            console.log(`${this.name} can't tear for 💩`)
        }
    }

    howl(target) {
        let odds = randomNum(0,100);
        if (odds > 50) {
            target.paralyzed = true;
        } else {
            console.log(`${this.name} sucked at howling`)
        }
    }

    takeAntidote() {
        if (this.poisoned) {
            console.log(`${this.name} is taking antidote to cure their poison`)
            this.poisoned = false;
        } else {
            this.health -= randomNum(5,15)
        }
    }

}

class Zombie extends Monster {
    constructor(name) {
        super(name);
    
    }

    vomit(targets) {
        let odds = randomNum(0,1) 
        if (odds && this.paralyzed) {
            return
        }

        for (let target of targets) {
            if (target.name === this.name) {
                continue;
            }

            let odds = randomNum(1,3);
            if (odds === 1) {
                console.log(`${this.name} vomitted on ${target.name} who is now poisoned`)
                target.poisoned = true;

                setTimeout(() => {
                    if (target.poisoned) {
                        target.alive = false;
                    }
                },120000)
            }
        }
    }

    unite(zombies) {
        let odds = randomNum(0,1) 
        if (odds && this.paralyzed) {
            return
        }
        let deadNum = zombies.filter(z => !z.alive).length;

        if (randomNum(0,100) > 50) {
            console.log('Zombies failed to unite!')
        }

        if (deadNum === 1) {
            let remainingZ = zombies.filter(z => z.alive);
            for (let z of remainingZ ) {
                z.health += randomNum(10,50);
                console.log(`${z.name} united and has ${z.health}!`)
            }
        }
    }

    selfDestruct(aggressor) {
        aggressor.health = aggressor.health / 2;
    }

}

let a = new Zombie('Abdel');
let d = new Werewolf('DeJuan');
let s = new Zombie('Samuel');
let t = new Werewolf('Tarick');
let b = new Werewolf('Ben');
let j = new Zombie('Jacob')

let zombies = [a,s,j];
let werewolves = [d,t,b];

class Game {
    constructor() {
        this.monsters = [a,d,s,t,b,j];
    }

    round() {
        setInterval(() => {
            this.removeDead();
        },15000)
    }

    removeDead() {
        this.monsters = this.monsters.filter(m => m.alive)
        let w = this.monsters.filter(m => m.constructor.name === 'Werewolf').length;
        let z = this.monsters.filter(m => m.constructor.name === 'Zombie').length;
        console.log(`There are ${w} Werewolves and ${z} Zombies`)
        console.log(this.monsters)
    }
}

let game = new Game();
game.round();


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

