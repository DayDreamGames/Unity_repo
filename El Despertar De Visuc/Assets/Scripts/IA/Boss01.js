#pragma strict
public var salud : int = 100;
private var objetivo : Transform;
private var movVelocidad : int = 3;
private var rotationSpeed = 3;
public var animator : Animator;
private var miTransform : Transform;
private var tempScale : Transform;
private var player : GameObject;
public var barraSalud25 : GameObject;
public var barraSalud50 : GameObject;
public var barraSalud75 : GameObject;
public var barraSalud100 : GameObject;

function Awake(){
	miTransform = transform;

}

function Start () {
	player = GameObject.FindWithTag("Player");
	objetivo = GameObject.FindWithTag("Player").transform;
	animator = GetComponent(Animator);
	tempScale = miTransform;
}

function FixedUpdate () {
	Mirar();
	miTransform.rotation = Quaternion.Slerp(miTransform.rotation, Quaternion.LookRotation(objetivo.position - miTransform.position), rotationSpeed*Time.deltaTime);
	miTransform.position += miTransform.forward * movVelocidad * Time.deltaTime;	
	miTransform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x, 0, 0);
	if(salud<=75 && salud >=50){
		Destroy(barraSalud100);
	}
	if(salud<=50 && salud >= 25){
		Destroy(barraSalud75);
	}
	if(salud<=25 && salud >= 0){
		Destroy(barraSalud50);
	}
	
	
}

function Mirar(){
	if(player.rigidbody2D.velocity.x != 0){
	if(tempScale.localScale.x != objetivo.localScale.x){
		if(objetivo.localScale.x > 0){//si el jugador esta mirando a la izquierda(aca lo comprueba por la escala y si esta mirando a la izquierda lo voltea a la derecha)
			transform.localScale.x *= -1;
		}else{
			transform.localScale.x *= 1;
		}
		tempScale.localScale.x = objetivo.localScale.x; 
	}	
	}
	
}

function QuitarSalud(){
	if(salud > 0){
		salud -= 10;
	}
	if(salud == 0){
		player.GetComponent(Jugador).setTieneLallave(true);
		Destroy(gameObject);
	}
}