namespace SpriteKind {
    export const OT_Food = SpriteKind.create()
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
function Overtime () {
    pause(59000)
    if (1 <= info.life()) {
        info.stopCountdown()
        game.splash("Overtime!!!")
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
function WELCOME () {
    scene.setBackgroundColor(8)
    game.splash("WELCOME", "USE ARROW KEYS/JOYSTICK TO MOVE CHARACTER")
    game.splash("USE A TO REVIVE IF YOU HAVE 5 FOOD PIECES", "USE B TO BOOST")
    game.splash("CAN YOU STAY ALIVE FOR 60 SECONDS?")
    game.showLongText("YOUR SCORE CAN BE INCREASED BY COLLECTING FOOD - BUT BEWARE! IF YOU NEED A BOOST YOU USE UP 5 FOOD PIECES, AND IF YOU REVIVE YOURSELF, YOU USE 50% OF YOUR TOTAL!", DialogLayout.Center)
    game.splash("READY?")
    music.playMelody("F - F - F - C5 C5 ", 120)
}
info.onLifeZero(function () {
    Player1.destroy()
    game.over(false)
})
function _INIT () {
    info.setScore(5)
    info.setLife(3)
    BoostEval = 0
    inProgress = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.OT_Food, function (sprite, otherSprite) {
    info.changeScoreBy(5)
    OT_projectile.destroy()
})
let BoostEval = 0
let OT_projectile: Sprite = null
let Player1: Sprite = null
let inProgress = 0
_INIT()
WELCOME()
character_Player1()
info.startCountdown(60)
inProgress = 1
gameProgressions()
