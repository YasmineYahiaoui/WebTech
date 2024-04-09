/*fonction qui va se jouer quand y aura le load de la fenetre */ 
window.onload = function()
{

    var canvas;
    var ctx;
    var delay = 1000;
    var xCoord=0;
    var yCoord=0;

    init();

       //initialisation avec iinit//
    function init()
    {
        canvas = document.createElement('canvas');
        canvas.width = 980 ;
        canvas.height= 600 ;
        canvas.style.border = " 1px solid";
       /* on rajout appenchild pour l'attacher a notre page html */ 
        document.body.appendChild(canvas);
       /*dessiner sur notre page html en utilisant context*/
        ctx = canvas.getContext('2d');
        //appelle a notre function de movement//
        refreshCanvas();
    }
       

        //movement//
    function refrschCanvas ()
    {
             xCoord += 2;
             yCoord += 2 ;
             ctx.clearRect(0,0,canvas.width , canvas.height);
            
              ctx.fillStyle = "#0000FF";
             
              ctx.fillRect( xCoord , yCoord , 100, 50);

              setTimeout(refrschCanvas,delay);
    }

    




}