#pragma strict
private var objetivo : Transform; 
private var velocidad : float = 1; 
public var proximidad = 10; 
private var ver : boolean = false; 
private var state = 0; 
public var animator : Animator; 
private var miTransform : Transform;
private var tempScale : Transform;
private var movVelocidad : int = 1;
private var rotationSpeed = 3;
private var player : GameObject;
function Awake(){
	miTransform = transform;

}

function Start () { 

	player = GameObject.FindWithTag("Player");
	objetivo = player.transform; 
	tempScale = miTransform;
} 

function FixedUpdate () { 
	if(animator.GetBool("Tocado")==true){
		animator.SetBool("moverZombie", false);
		state = 0;
		
	}
	if (state == 0){ 
		animator.SetBool("moverZombie", false); 
	} 

	if (Vector2.Distance(objetivo.position, transform.position) < proximidad){ 
		ver = true; 
	} 
	else { 
		ver = false; 
	} 

	if (ver == true && Vector2.Distance(objetivo.position, transform.position) > 0.85 && animator.GetBool("Tocado")==false){ 
		state = 1; 
	} 
	if (ver == false){ 
		state = 0; 
	} 

	if (state == 1){ 
		animator.SetBool("moverZombie", true);
		Mirar();
		miTransform.rotation = Quaternion.Slerp(miTransform.rotation, Quaternion.LookRotation(objetivo.transform.position - miTransform.position), rotationSpeed*Time.deltaTime);
		miTransform.position += miTransform.forward * movVelocidad * Time.deltaTime;	
		miTransform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x, 0, 0); 
	} 
	if (Vector2.Distance(objetivo.position, transform.position) < 0.85 && ver == true && animator.GetBool("Tocado")==false){ 
		state = 2; 
	} 
	if (state == 2){ 
		animator.SetBool("moverZombie", false); 
		animator.SetBool("atacar", true);
		Mirar();
		miTransform.rotation = Quaternion.Slerp(miTransform.rotation, Quaternion.LookRotation(objetivo.position - miTransform.position), rotationSpeed*Time.deltaTime);
		miTransform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x, 0, 0); 
		player.GetComponent(Jugador).setVive(false);
	} 
} 

function Mirar(){;
	if(objetivo.transform.position.x > transform.position.x){
		//esta a ala izquierda
		if(transform.localScale.x != 1){
			transform.localScale.x *= -1;
		}
	}else if(objetivo.transform.position.x < transform.position.x){
		//esta a la  derecha
		if(transform.localScale.x != -1){
			transform.localScale.x *= -1;
		}
	}
}

function DestroyObject(){
	Destroy(gameObject);
}