#pragma strict
public var animator : Animator;
private var direccion : Vector2;
private var colisiona : boolean;
private var player : GameObject;
private var Boss : Boss01;
public var puntaje : int = 0;
public var puntaje10 : GameObject;


function Start () {
	var levelBoss_01 : GameObject = GameObject.FindWithTag("Boss");
	Boss = levelBoss_01.GetComponent(Boss01);
	player = GameObject.FindWithTag("Player");
	animator = GetComponent(Animator);
	colisiona = false;
	if(player.transform.localScale.x < 0){
		transform.localScale.x *= -1;
	}else{
		transform.localScale.x *= 1;
	}
}

function Update() {
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
			puntaje = 0;
		}

		else if( collision.tag == "zombie"){
			animator.SetBool("contacto", true);
			colisiona = true;
			collision.audio.Play();
			collision.gameObject.GetComponent(Animator).SetBool("Tocado", true);
			puntaje = 10;
			Instantiate(puntaje10, Vector2(player.transform.position.x+0.4,player.transform.position.y+0.5),Quaternion.identity);
		}
			
		else if(collision.gameObject.tag == "Boss"){
			animator.SetBool("contacto", true);
			colisiona = true;
			Boss.QuitarSalud();
			puntaje = 15;
		}
	}
}

function DestroyObject(){
	player.GetComponent(Jugador).AgregarPuntaje(puntaje);
	Destroy(gameObject);
}
