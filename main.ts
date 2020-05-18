namespace SpriteKind {
    export const OT_Food = SpriteKind.create()
    export const NEW_PROJECTILE = SpriteKind.create()
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Boost()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(2)
})
function reviveLife () {
    if (info.score() < 5) {
        info.changeLifeBy(1)
        info.changeScoreBy(-5)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    reviveLife()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (invincibleEval == 1) {
        info.changeScoreBy(2)
    } else {
        info.changeLifeBy(-1)
    }
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
info.onCountdownEnd(function () {
    if (1 <= info.life()) {
        game.over(true)
    } else {
        game.over(false)
    }
})
function _INIT () {
    info.setScore(5)
    info.setLife(10)
    BoostEval = 0
    inProgress = 0
    invincibleEval = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.OT_Food, function (sprite, otherSprite) {
    let OT_projectile: Sprite = null
    info.changeScoreBy(5)
    OT_projectile.destroy()
})
function Boost () {
    BoostEval = 1
    invincibleEval = 1
    effects.starField.startScreenEffect()
    Player1.startEffect(effects.rings)
    music.powerUp.loop()
    scene.cameraShake(4, 500)
    pause(5000)
    music.stopAllSounds()
    effects.starField.endScreenEffect()
    effects.clearParticles(Player1)
    BoostEval = 0
    invincibleEval = 0
}
let foodProjectile: Sprite = null
let PhysicalProjectile: Sprite = null
let BoostEval = 0
let invincibleEval = 0
let Player1: Sprite = null
let inProgress = 0
_INIT()
WELCOME()
character_Player1()
info.startCountdown(60)
inProgress = 1
game.onUpdateInterval(1000, function () {
    PhysicalProjectile = sprites.createProjectileFromSide(img`
. . . . . . . . . . . . . . . b b b b b b b b b b b b b b b b b b b . . . . . . . . . . . . . . . 
. . . . . . . . . . . b b b b d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d b b b b . . . . . . . . . . . 
. . . . . . . . b b b d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d b b b . . . . . . . . 
. . . . . . b b d 1 1 1 1 1 1 1 1 d d d d d d d d d d d d d d 1 1 1 1 1 1 1 1 1 d b b . . . . . . 
. . . . b b d 1 1 1 1 1 1 1 d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 d b b . . . . 
. . . b d 1 1 1 1 1 1 d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d 1 1 1 1 1 1 d b . . . 
. . b d 1 1 1 1 1 d d d 1 1 1 d d d d d d d d d d d d d d d d d d d 1 1 1 d d d 1 1 1 1 1 d b . . 
. b d 1 1 1 1 1 d d 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d d 1 1 1 d d 1 1 1 1 1 d b . 
. b 1 1 1 1 1 d 1 1 1 d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d 1 1 1 d 1 1 1 1 1 b . 
b d 1 1 1 1 1 d 1 d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d 1 1 1 1 1 1 1 d b 
b 1 1 1 1 1 d 1 d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d 1 d 1 1 1 1 1 b 
b 1 1 1 1 1 d d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d d d 1 1 1 1 1 b 
b 1 1 1 1 1 d d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d b d 1 1 1 1 1 b 
b 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d b 1 1 1 1 1 1 b 
b d 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d b d 1 1 1 1 1 d b 
. b 1 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d b d 1 1 1 1 1 1 b . 
. b d 1 1 1 1 1 1 1 d b b d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d b b d 1 1 1 1 1 1 d b . 
. . b d 1 1 1 1 1 1 1 1 d b b d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d b b d 1 1 1 1 1 1 1 d b . . 
. . . b d 1 1 1 1 1 1 1 1 1 d b b b b b b d d d d d d d d d d d d d d 1 1 1 1 1 1 1 1 1 d b . . . 
. . . . b b d 1 1 1 1 1 1 1 1 1 1 1 d b b b b b b b b b d d d 1 1 1 1 1 1 1 1 1 1 1 d b b . . . . 
. . . . . . b b d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d b b . . . . . . 
. . . . . . . . b b b d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d b b b . . . . . . . . 
. . . . . . . . . . . b b b b b d d d 1 1 1 1 1 1 1 1 1 1 1 d d d b b b b b . . . . . . . . . . . 
. . . . . . . . . . . . . . . . b b b b b b b b b b b b b b b b b . . . . . . . . . . . . . . . . 
`, Math.randomRange(1, 100), Math.randomRange(1, 100))
    foodProjectile = sprites.createProjectileFromSide(img`
. . 6 6 6 6 . . 
. 6 d 4 4 4 6 . 
6 d 4 4 4 4 d 6 
c 1 b 4 4 4 d c 
. c b 1 1 4 c . 
. . c c c c . . 
`, Math.randomRange(1, 100), Math.randomRange(1, 100))
    PhysicalProjectile.setKind(SpriteKind.Enemy)
    foodProjectile.setKind(SpriteKind.Food)
})
