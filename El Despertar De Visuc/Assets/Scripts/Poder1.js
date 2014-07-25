#pragma strict
private var direccion : Vector2;
function Start () {

}

function Update() {
	direccion = new Vector2(1,0);
	direccion *= 5;
	rigidbody2D.velocity = direccion;
}

function OnTriggerEnter2D(collision : Collider2D){
	if(collision.gameObject.tag == "Terreno"){
		Destroy(gameObject);
	}
}