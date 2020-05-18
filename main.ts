namespace SpriteKind {
    export const OT_Food = SpriteKind.create()
}
function makeFood () {
    foodProjectile.setKind(SpriteKind.Food)
    foodProjectile = sprites.createProjectileFromSide(img`
. . 6 6 6 6 . . 
. 6 d 4 4 4 6 . 
6 d 4 4 4 4 d 6 
c 1 b 4 4 4 d c 
. c b 1 1 4 c . 
. . c c c c . . 
`, Math.randomRange(0, 100), Math.randomRange(0, 100))
}
function Boost () {
    BoostEval = 1
    invincibleEval = 1
    effects.starField.startScreenEffect()
    scene.cameraShake(4, 500)
}
function reviveLife () {
    if (info.score() < 5) {
        info.changeLifeBy(1)
        info.changeScoreBy(-5)
    }
}
function Overtime () {
    pause(59500)
    if (1 <= info.life()) {
        info.stopCountdown()
        game.splash("Overtime!!!")
        game.showLongText("YOU SUCCESSFULLY BEAT THE GAME - HOW MANY EXTRA POINTS CAN YOU GET? YOUR CONTROLS HAVE BEEN SPED UP - IF YOU CAN STILL CATCH THE NEW PROJECTILES THEY ARE WORTH AN EXTRA 5 POINTS EACH!", DialogLayout.Center)
        info.startCountdown(5)
        overtimeBonus_points()
    } else {
        game.over(false)
    }
}
function character_Player1 () {
    Player1 = sprites.create(img`
. . . . . . f f f f . . . . . . 
. . . . f f f 2 2 f f f . . . . 
. . . f f f 2 2 2 2 f f f . . . 
. . f f f e e e e e e f f f . . 
. . f f e 2 2 2 2 2 2 e e f . . 
. . f e 2 f f f f f f 2 e f . . 
. . f f f f e e e e f f f f . . 
. f f e f b f 4 4 f b f e f f . 
. f e e 4 1 f d d f 1 4 e e f . 
. . f e e d d d d d d e e f . . 
. . . f e e 4 4 4 4 e e f . . . 
. . e 4 f 2 2 2 2 2 2 f 4 e . . 
. . 4 d f 2 2 2 2 2 2 f d 4 . . 
. . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
. . . . . f f f f f f . . . . . 
. . . . . f f . . f f . . . . . 
`, SpriteKind.Player)
    Player1.setPosition(6, 103)
    controller.moveSprite(Player1, 100, 0)
    Player1.setFlag(SpriteFlag.StayInScreen, true)
}
function gameProgressions () {
    pause(30000)
    Player1.y += -35
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Boost()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    reviveLife()
})
function WELCOME () {
    scene.setBackgroundColor(8)
    game.splash("WELCOME", "USE ARROW KEYS/JOYSTICK TO MOVE CHARACTER")
    game.splash("USE A TO REVIVE A LIFE IF YOU HAVE 5 FOOD PIECES", "USE B TO BOOST")
    game.splash("CAN YOU STAY ALIVE FOR 60 SECONDS?")
    game.showLongText("YOUR SCORE CAN BE INCREASED BY COLLECTING FOOD - BUT BEWARE! IF YOU NEED A BOOST YOU USE UP 5 FOOD PIECES, AND IF YOU REVIVE YOURSELF, YOU USE 50% OF YOUR TOTAL!", DialogLayout.Center)
    game.splash("READY?")
    music.playMelody("F - F - F - C5 C5 ", 120)
}
function overtimeBonus_points () {
    inProgress = 0
    Player1.setVelocity(70, 70)
    Player1.setPosition(80, 58)
    OT_projectile.setKind(SpriteKind.OT_Food)
    for (let index = 0; index < 4; index++) {
        OT_projectile = sprites.createProjectileFromSide(img`
. . . . . . . . . . . . . . . . 
. . . . . . 6 6 6 6 . . . . . . 
. . . . 6 6 6 5 5 6 6 6 . . . . 
. . . 7 7 7 7 6 6 6 6 6 6 . . . 
. . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
. . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
. 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
. 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
. 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
. 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
. . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
. . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
. . . 6 8 8 8 8 8 8 8 8 6 . . . 
. . . . 6 6 8 8 8 8 6 6 . . . . 
. . . . . . 6 6 6 6 . . . . . . 
. . . . . . . . . . . . . . . . 
`, 68, 70)
        pause(500)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
	
})
info.onLifeZero(function () {
    Player1.destroy()
    game.over(false)
})
function _INIT () {
    info.setScore(5)
    info.setLife(3)
    BoostEval = 0
    inProgress = 0
    invincibleEval = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.OT_Food, function (sprite, otherSprite) {
    info.changeScoreBy(5)
    OT_projectile.destroy()
})
let OT_projectile: Sprite = null
let Player1: Sprite = null
let invincibleEval = 0
let foodProjectile: Sprite = null
let BoostEval = 0
let inProgress = 0
_INIT()
WELCOME()
character_Player1()
info.startCountdown(60)
inProgress = 1
gameProgressions()
Overtime()
while (BoostEval == 0 && info.life() > 0) {
    makeFood()
    pause(5000)
}
