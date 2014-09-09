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
	if(collision.gameObject.tag == "Terreno" || collision.gameObject.tag == "enemigo" || collision.gameObject.tag == "Boss"){
		animator.SetBool("contacto", true);
		colisiona = true;
		if(collision.gameObject.tag == "enemigo"){
			if(collision.gameObject.name == "zombie"){
				collision.audio.Play();
				collision.gameObject.GetComponent(Animator).SetBool("Tocado", true);
			}
			yield WaitForSeconds(0.35);
			Destroy(collision.gameObject);
			player.AgregarPuntaje(10);
		}
		yield WaitForSeconds(0.5);
		Destroy(gameObject);
		if(collision.gameObject.tag == "Boss"){
			Boss.QuitarSalud();
		}
	}
}

void Resize(){
	SpriteRenderer sr = GetComponent<SpriteRenderer>();
	if(sr == null) return;
	
	transform.localScale = new Vector3(1, 1, 1);
	
	float width = sr.sprite.bounds.size.x;
	float height = sr.sprite.bounds.size.y;
	
	float worldScreenHeight = Camera.main.orthographicSize * 2f;
	float worldScreenWidth = worldScreenHeight / Screen.height * Screen.width;
	
	Vector3 xWidth = transform.localScale;
	xWidth.x = worldScreenWidth / width;
	transform.localScale = xWidth;
	
	Vector3 yHeight = transform.localScale;
	yHeight.y = worldScreenHeight / height;
	transform.localScale = yHeight;
}y