private var seMueve : boolean = false;
private var direccion : Vector2;
public var velocidad : float = 5.0;
public var gravedad : float = 9.8;
public var animator : Animator;
public var salto: float = 5.0;

function Awake(){
	animator = GetComponent(Animator);
}
function Start (){
}

function FixedUpdate () {
	if(Input.GetKey(KeyCode.RightArrow)){
		direccion = new Vector2(1,0);
		if(transform.localScale.x < 0){//si el jugador esta mirando a la izquierda(aca lo comprueba por la escala y si esta mirando a la izquierda lo voltea a la derecha)
			transform.localScale.x *= -1;
		}else{
			transform.localScale.x *= 1;
		}
	}
	else if (Input.GetKey(KeyCode.LeftArrow)){
		direccion = new Vector2(-1,0);
		if(transform.localScale.x > 0){
			transform.localScale.x *= -1;
		}else{
			transform.localScale.x *= 1;
		}
		
	}else{
		direccion = Vector2.zero;
	}
		if(direccion != Vector2.zero){
			direccion *= velocidad; 
			rigidbody2D.velocity = direccion;
			seMueve = true;
			
		}
		else{
			seMueve = false;
			rigidbody2D.velocity = Vector2.zero;
			}
		if(seMueve == true){
			animator.SetBool("caminar", true);
		}else{
			animator.SetBool("caminar", false);
		}
	
}
