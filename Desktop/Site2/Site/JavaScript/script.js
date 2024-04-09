/*fonction qui va se jouer quand y aura le load de la fenetre */ 
window.onload = function()
{
var canvas = document.createElement('canvas');
canvas.width = 980 ;
canvas.height= 600 ;
canvas.style.border = "1 px solid";
/* on rajout appenchild pour l'attacher a notre page html */ 
document.body.appendChild(canvas);
}