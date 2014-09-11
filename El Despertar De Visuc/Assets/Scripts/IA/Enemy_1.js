#pragma strict

var maxX = 6.1;
var minX = -6.1;
var moveSpeed = 0.5;
private var tChange: float = 0; // force new direction in the first Update
private var randomX: float;
public var animator : Animator;
private var tempRandX : float = 0;

function Start () {
	animator = GetComponent(Animator);
}

function Update () {
	if(animator.GetBool("Tocado")){
		animator.SetBool("moverZombie", false);
		
	}
	Mirar();
	if (Time.time >= tChange){
		randomX = Random.Range(-1.0,1.0);
		
		tChange = Time.time + Random.Range(0.5,1.5);
	}
	transform.Translate(Vector3(randomX,0,0) * moveSpeed * Time.deltaTime);
	
	if (transform.position.x >= maxX || transform.position.x <= minX) {
       randomX = -randomX;
    }
    
     transform.position.x = Mathf.Clamp(transform.position.x, minX, maxX);
     if(rigidbody2D.velocity != Vector2.zero){
     	animator.SetBool("moverZombie", true);
     }else{
     		
     }
     
    
}

function Mirar(){
	if(tempRandX != randomX){
		if(randomX > 0){//si el jugador esta mirando a la izquierda(aca lo comprueba por la escala y si esta mirando a la izquierda lo voltea a la derecha)
			transform.localScale.x *= -1;
		}else{
			transform.localScale.x *= 1;
		}
	
		if(randomX < 0){//si el jugador esta mirando a la izquierda(aca lo comprueba por la escala y si esta mirando a la izquierda lo voltea a la derecha)
			transform.localScale.x *= -1;
		}else{
			transform.localScale.x *= 1;
		}
		tempRandX = randomX;
	}
}