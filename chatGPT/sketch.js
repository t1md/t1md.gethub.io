let numberOfEnemy1 = 100
let classenemy1 = new Enemy1(numberOfEnemy1);
let globalenemy1position = [];   
let isFireTowerPressed = false;
let FireTowerPos = [];    // Position of all FireTowers => [x,y]
let FireTowerRange = 300;
let FireTowerAngle = 0;


class Enemy1
{
    constructor(number_of_enemies)
    {
        this.number_of_enemies = number_of_enemies;
        this.enemy_position = [];
        this.enemy1speed = 4;

    }
    enemy1_spawn()
    {
      let randomx = random(-300, -100);
        for(let i=0; i<this.number_of_enemies; i++)
        {
          let positionx = randomx;
          let positiony = 100;

            this.enemy_position.push([positionx + (-i*50), positiony]);
            globalenemy1position.push([positionx + (-i*50), positiony]);
            image(enemy1, this.enemy_position[i][0], this.enemy_position[i][1]);
        }

    }

    enemy1_move()
    {
        for(let i = 0; i < this.enemy_position.length; i++)
        {
            image(enemy1, this.enemy_position[i][0], this.enemy_position[i][1]);

            if (this.enemy_position[i][0] >= 200 && this.enemy_position[i][1] <= 450 && this.enemy_position[i][0] < 599)
            {
                this.enemy_position[i][1] += this.enemy1speed;
                globalenemy1position[i][1] += this.enemy1speed;
            }   

            else if (this.enemy_position[i][1] >= 100 && this.enemy_position[i][0] >= 600)
            {
                this.enemy_position[i][1] -= this.enemy1speed;
                globalenemy1position[i][1] -= this.enemy1speed;
            }

            else if (this.enemy_position[i][0] >= 750)
            {
                this.enemy_position[i][0] = 750;
                lives --;
                this.enemy_position.shift();
                globalenemy1position.shift();
            }   

            else
            {
                this.enemy_position[i][0] += this.enemy1speed;
                globalenemy1position[i][0] += this.enemy1speed;
            }

        }
    }
}

function draw() 
{

    background(60, 238, 161);
    classenemy1.enemy1_move();
    rect(750, 70, 50, 100);
    ShowLives();
    if (isFireTowerPressed == true) 
    {
        image(firetowerbaseImg, mouseX - 28, mouseY - 28);
        noFill();
        stroke(0,0,0);
        strokeWeight(1);
        circle(mouseX, mouseY, 300);
    }
    for (let i = 0; i < FireTowerPos.length; i++) 
    {
        image(firetowerbaseImg, FireTowerPos[i][0], FireTowerPos[i][1]);

        if (globalenemy1position.length >= 1)
        {
          let gunx = FireTowerPos[i][0] +28;
          let guny = FireTowerPos[i][1]+25;
          let gunrange = FireTowerPos[i][3];

            for (j=0; j<globalenemy1position.length; j++)
            {

                // Need help with this statement here
                pointEnemy(globalenemy1position[j][0], globalenemy1position[j][1], gunx, guny, FireTowerPos[i][2], FireTowerPos[i][3]);
                
            }
        }
        else
        {
            image(firetowerturretImg, FireTowerPos[i][0], FireTowerPos[i][1]-20);
        }
    }
}

function pointEnemy(enemyx, enemyy, gunx, guny, gunangle, gunrange)
{
    const isWithinRange = dist(enemyx, enemyy, gunx, guny) < gunrange;
    if(isWithinRange)
    {
        gunangle = atan2(enemyy - guny, enemyx - gunx) + radians(90);
    }
        push();
        translate(gunx, guny);
        // rect(-25, -20, 50, 40) // Draw the gun base
        // ellipse(0, 0, gun.range*2) // display the gun range
        rotate(gunangle);
        image(firetowerturretImg, -28, -45); // Set the offset of the gun sprite and draw the gun
        pop();
}