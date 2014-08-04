#pragma strict
private var acercar : boolean = false;
private var posPlayer : Vector2;
var posEnem : Vector2;

function Start () {
	posEnem = transform.position;
}

function Update () {
	
	if(acercar == true){
		if((Vector2.Distance(GameObject.FindWithTag("Player").transform.position, transform.position)) > 1){
			transform.position += GameObject.FindWithTag("Player").transform.position*Time.deltaTime;
		}else{
			
		}

	}
	
}

function OnTriggerEnter2D(colision : Collider2D){

	if(colision.gameObject.tag == "Player"){
		posPlayer = colision.gameObject.transform.position;
		acercar = true;
	}
}

function OnTriggerExit2D(colision : Collider2D){
if(colision.gameObject.tag == "Player"){
	acercar = false;
	}
}