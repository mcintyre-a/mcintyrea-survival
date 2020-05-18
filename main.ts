function WELCOME () {
    scene.setBackgroundColor(8)
    game.splash("WELCOME", "USE ARROW KEYS/JOYSTICK TO MOVE CHARACTER")
    game.splash("USE A TO REVIVE IF YOU HAVE 5 FOOD PIECES", "USE B TO BOOST")
    game.splash("CAN YOU STAY ALIVE FOR 60 SECONDS?")
    game.showLongText("YOUR SCORE CAN BE INCREASED BY COLLECTING FOOD - BUT BEWARE! IF YOU NEED A BOOST YOU USE UP 5 FOOD PIECES, AND IF YOU REVIVE YOURSELF, YOU USE 50% OF YOUR TOTAL!", DialogLayout.Center)
    game.splash("READY?")
    info.startCountdown(3)
    music.playMelody("F - F - F - C5 C5 ", 120)
}
function _INIT () {
    info.setScore(5)
    info.setLife(3)
    Projectile = 0
    Projectile = 0
    Projectile = 0
    BoostEval = 0
}
let BoostEval = 0
let Projectile = 0
_INIT()
WELCOME()
