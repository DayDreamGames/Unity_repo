#pragma strict
private var player : GameObject;
private var tieneLlave : boolean;
function Start () {
	player = GameObject.FindWithTag("Player");
	tieneLlave = player.GetComponent(Jugador).getTieneLallave();
}

function Update () {
	tieneLlave = player.GetComponent(Jugador).getTieneLallave();
}

function OnTriggerEnter2D(colision : Collider2D){

	if(colision.tag == "Player"){
		
		if(tieneLlave == true){
			//reproducir animacion para pasar al siguiente nivel
			Application.LoadLevel(2);
		}
	}

}