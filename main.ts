function Enemy_Chase_State (enemy_chase_sprite: Sprite) {
	
}
function Spawn_Enemy () {
    Enemy_Sprite = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    Enemy_Sprite.setPosition(randint(0, 100), randint(0, 100))
    sprites.setDataString(Enemy_Sprite, "state", Enemy_AI_States[0])
    Enemy_AI_State_Machine(Enemy_Sprite)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Player_Sprite,
    assets.animation`Player Walking Foward`,
    100,
    true
    )
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Spawn_Enemy()
})
function Enemy_AI_State_Machine (Enemy_Sprite_Clone: Sprite) {
    if (sprites.readDataString(Enemy_Sprite_Clone, "state") == Enemy_AI_States[0]) {
        Enemy_Sprite_Clone.sayText("patrol")
        Enemy_Patrol_State(Enemy_Sprite_Clone)
    } else if (sprites.readDataString(Enemy_Sprite_Clone, "state") == Enemy_AI_States[1]) {
        Enemy_Sprite_Clone.sayText("chase")
        Enemy_Chase_State(Enemy_Sprite_Clone)
    } else if (sprites.readDataString(Enemy_Sprite_Clone, "state") == Enemy_AI_States[2]) {
        Enemy_Sprite_Clone.sayText("attack")
        Enemy_Attack_State(Enemy_Sprite_Clone)
    } else {
    	
    }
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Player_Sprite)
    Player_Sprite.setImage(assets.image`Player Foward 2`)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Player_Sprite,
    assets.animation`Player Walking Left`,
    100,
    true
    )
})
function Enemy_Attack_State (enemy_clone_sprite: Sprite) {
	
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Player_Sprite)
    Player_Sprite.setImage(assets.image`Player Right`)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Player_Sprite)
    Player_Sprite.setImage(assets.image`Player Left`)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Player_Sprite,
    assets.animation`Player Walking Right`,
    100,
    true
    )
})
// Enemy States :
// 
// - Patrol : the enemy will patrol an area in a back and forth motion. when the player comes in visual range of enemy the enemy will switch to chasing or attacking depending on how close the player is to the enemy.
// 
// - Chase : the enemy will chase the player unless the player reaches the maximum chasing distance the enemy will switch to the patrol state
// 
// - Attack: the enemy will attack the player when in attacking range. if the player is in range to chase the enemy will chase the player. if the player is out
// 
// of chasing range the enemy will patrol
function Enemy_Patrol_State (enemy_clone_sprite: Sprite) {
    timer.after(500, function () {
        console.log("Switching patrol direction")
        if (Enemy_Patrol_Direction == list[0]) {
            Enemy_Patrol_Direction = list[1]
        } else {
            Enemy_Patrol_Direction = list[0]
        }
    })
    if (Enemy_Patrol_Direction == list[0]) {
        enemy_clone_sprite.setVelocity(0, -1)
    } else {
        enemy_clone_sprite.setVelocity(0, 1)
    }
    if (Player_Sprite.x - enemy_clone_sprite.x <= Enemy_Chase_Max_Distance && Player_Sprite.x - enemy_clone_sprite.x > Enemy_Attack_Max_Distance || Player_Sprite.y - enemy_clone_sprite.y <= Enemy_Chase_Max_Distance && Player_Sprite.y - enemy_clone_sprite.y > Enemy_Attack_Max_Distance) {
        // Set Enemy State to Chase
        sprites.setDataString(enemy_clone_sprite, "state", list[2])
    } else if (Player_Sprite.x - enemy_clone_sprite.x <= Enemy_Chase_Max_Distance || Player_Sprite.y - enemy_clone_sprite.y <= Enemy_Chase_Max_Distance) {
        // Set Enemy State to Chase
        sprites.setDataString(enemy_clone_sprite, "state", list[2])
    } else {
    	
    }
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Player_Sprite)
    Player_Sprite.setImage(assets.image`Player Up`)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Player_Sprite,
    assets.animation`Player Walking Foward0`,
    100,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
	
})
let Enemy_Sprite: Sprite = null
let list: string[] = []
let Enemy_Patrol_Direction = ""
let Enemy_Attack_Max_Distance = 0
let Enemy_Chase_Max_Distance = 0
let Enemy_AI_States: string[] = []
let Player_Sprite: Sprite = null
Player_Sprite = sprites.create(assets.image`Player Foward`, SpriteKind.Player)
controller.moveSprite(Player_Sprite)
Enemy_AI_States = ["patrol", "Chase", "attack"]
Enemy_Chase_Max_Distance = 20
Enemy_Attack_Max_Distance = 5
let Enemy_Patrol_Directions = ["up", "down"]
Enemy_Patrol_Direction = list[0]
game.onUpdateInterval(1000, function () {
	
})
