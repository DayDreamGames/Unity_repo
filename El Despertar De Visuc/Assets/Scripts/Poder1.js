#pragma strict
public var animator : Animator;
private var direccion : Vector2;
private var colisiona : boolean;
private var player : Jugador;
private var Boss : Boss01;

function Start () {
	var levelBoss_01 : GameObject = GameObject.FindWithTag("Boss");
	Boss = levelBoss_01.GetComponent(Boss01);
	var playerComp : GameObject = GameObject.FindWithTag("Player");
	player = playerComp.GetComponent(Jugador);
	animator = GetComponent(Animator);
	colisiona = false;
	if(playerComp.transform.localScale.x < 0){
		transform.localScale.x *= -1;
	}else{
		transform.localScale.x *= 1;
	}
}

function Update() {
	var playerComp : GameObject = GameObject.FindWithTag("Player");
	if(colisiona == false){
		direccion = new Vector2(transform.localScale.x,0);
		direccion *= 10;
		rigidbody2D.velocity = direccion;
	}else{
		rigidbody2D.velocity = Vector2.zero;
	}

}

function OnTriggerEnter2D(collision : Collider2D){
	
	if(collision != null){
		if(collision.tag == "Terreno"){
			animator.SetBool("contacto", true);
			colisiona = true;
		}

		else if( collision.tag == "zombie"){
			animator.SetBool("contacto", true);
			colisiona = true;
			collision.audio.Play();
			collision.gameObject.GetComponent(Animator).SetBool("Tocado", true);
			player.AgregarPuntaje(10);
			
		}
			
		else if(collision.gameObject.tag == "Boss"){
			animator.SetBool("contacto", true);
			colisiona = true;
			Boss.QuitarSalud();
		}
	}
	
}

function DestroyObject(){
	Destroy(gameObject);
}
