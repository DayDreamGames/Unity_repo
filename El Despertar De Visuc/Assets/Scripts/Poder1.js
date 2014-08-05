#pragma strict
public var animator : Animator;
private var direccion : Vector2;
private var colisiona : boolean;
private var player : Jugador;

function Start () {
	var playerComp : GameObject = GameObject.FindWithTag("Player");
	player = playerComp.GetComponent(Jugador);
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
	if(collision.gameObject.tag == "Terreno" || collision.gameObject.tag == "enemigo"){
		animator.SetBool("contacto", true);
		colisiona = true;
		if(collision.gameObject.tag == "enemigo"){
			if(collision.gameObject.name == "zombie"){
				collision.gameObject.GetComponent(Animator).SetBool("Tocado", true);
			}
			yield WaitForSeconds(0.35);
			Destroy(collision.gameObject);
			player.AgregarPuntaje(10);
		}
		yield WaitForSeconds(0.5);
		Destroy(gameObject);
	}
}

