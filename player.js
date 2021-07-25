class Player
{
    constructor(x, y, width, height, color, velocityX, velocityY)
    {
        
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.color = color
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.sprite = createSprite(x,y,width,height)

    }


    display()
    {
        //for these 3 functions, no need to do runner.sprite.whatever, because namespacing has already been done
        //for other properties/functions, you will need to do this.sprite
        this.sprite.shapeColor= this.color
        this.sprite.velocity.x = this.velocityX
        this.sprite.velocity.y = this.velocityY
        drawSprites()
    }
}

