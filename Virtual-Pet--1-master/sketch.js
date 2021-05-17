//Create variables here
var dog,Happydog,database,foodS,foodStock,dog1,dog2;

function preload()
{
	 dog1=loadImage("images/Dog.png");
   dog2=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(900,900);
  database=firebase.database();
  dog = createSprite(450, 600, 20, 80);
  dog.addImage(dog1);
  dog.scale = 0.6;
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() {  
background(46, 139, 87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dog2);
  }
  drawSprites();
  textSize(30);
  strokeWeight(7);
  stroke("black");
  fill("snow");
  text("Food Remaining : " + foodS, 350, 250);
  stroke("grey");
  text("Press the 'up' arrow key to feed the Dog", 200, 50);
  

}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }else {
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
  }