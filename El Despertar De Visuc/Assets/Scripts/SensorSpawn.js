#pragma strict
private var spawn : Spawn;

function Start () {
	var temp : GameObject = GameObject.FindWithTag("spawner");
	spawn = temp.gameObject.GetComponent(Spawn);

}

function Update () {

}

function OnTriggerEnter2D(colision : Collider2D){
	if(colision.tag == "Player"){
		spawn.setSpawn(true);
	}
}