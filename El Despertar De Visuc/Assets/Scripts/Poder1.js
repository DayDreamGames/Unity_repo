#pragma strict
public var animator : Animator;
private var direccion : Vector2;
private var colisiona : boolean;

function Start () {
	animator = GetComponent(Animator);
	colisiona = false;
}

function Update() {
	if(colisiona == false){
		direccion = new Vector2(1,0);
		direccion *= 5;
		rigidbody2D.velocity = direccion;
	}else{
		rigidbody2D.velocity = Vector2.zero;
	}

}

function OnTriggerEnter2D(collision : Collider2D){
	if(collision.gameObject.tag == "Terreno"){
		animator.SetBool("contacto", true);
		colisiona = true;
		yield WaitForSeconds(0.5);
		Destroy(gameObject);
	}
}

