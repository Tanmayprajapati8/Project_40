class Game {
    constructor() {

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200, 500);
        player1.visible=true;
        player1.addImage("player1", player_img);

        player2 = createSprite(800, 500);
        player2.visible=true;
        player2.addImage("player2", player_img);
        players = [player1, player2];

    }

    play() {

        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();

        for (var plr in allPlayers) {

            index = index + 1;
            x = 500 - allPlayers[plr].distance;
            y = 500;

            players[index - 1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if (index === player.index) {
                stroke(10);
                textSize(20);
                fill("Red");
                text(allPlayers[plr].name, x - 25, y + 25);
            }

        }


        // Give movements for the players using arrow keys
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }

        // Create and spawn fruits randomly
        if (frameCount % 20 === 0) {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.visible=true;
            fruits.velocityY = 6;
            var rand = Math.round(random(1, 5));
            switch (rand) {
                case 1: fruits.addImage(fruit1_img)
                    break;
                case 2: fruits.addImage(fruit2_img)
                    break;
                case 3: fruits.addImage(fruit3_img)
                    break;
                case 4: fruits.addImage(fruit4_img)
                    break;
                case 5: fruits.addImage(fruit5_img)
                    break;

            }
            fruitGroup.add(fruits);
            if (fruitGroup.isTouching(player1)||fruitGroup.isTouching(player2)) {
                fruitGroup.destroyEach();
                
            }
            fruits.lifetime = 300;
        }
        

    }

    end() {
        console.log("Game Ended");
    }
}