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
transform.position = Vector2.zero;
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
		
	}else if (Input.GetKey(KeyCode.Space)){
		direccion = new Vector2(0,1);
		animator.SetBool("caminar", false);
		animator.SetBool("salta", true);
		
	}else{
		direccion = Vector2.zero;
		animator.SetBool("caminar", false);
		animator.SetBool("salta", false);
		rigidbody2D.velocity = direccion;
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
