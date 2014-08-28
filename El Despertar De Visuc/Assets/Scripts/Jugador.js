private var seMueve : boolean = false;
private var direccion : Vector2;
public var velocidad : float = 5.0;
public var animator : Animator;
public var salto: float = 5.0;
public var canjump : boolean = true;
public var poder1 : GameObject;
public var scoreText : GUIText;
private var score : int;
public var GUI_Izq : GUITexture;
public var GUI_Der : GUITexture;
public var GUI_Salto : GUITexture;
public var GUI_Ata : GUITexture;

function Awake (){
	animator = GetComponent(Animator);
}
function Start (){
	score = 0;
	transform.position = Vector2.zero;
	ActualizarScore();
}

function Update (){
	rigidbody2D.velocity = new Vector2(0,-(rigidbody2D.gravityScale));
	ActualizarScore();
}
function FixedUpdate () {
	if(Input.touches.Length <= 0){
		
	}else{
		for(var i : int = 0; i < Input.touchCount; i++){
		
			if(GUI_Der.guiTexture.HitTest(Input.GetTouch(i).position)){
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					direccion = new Vector2(1,0);
					if(transform.localScale.x < 0){//si el jugador esta mirando a la izquierda(aca lo comprueba por la escala y si esta mirando a la izquierda lo voltea a la derecha)
						transform.localScale.x *= -1;
					}else{
						transform.localScale.x *= 1;
					}
					if ((GUI_Salto.guiTexture.HitTest(Input.GetTouch(i).position) && canjump)){
						if(Input.GetTouch(i).phase == TouchPhase.Began){
							direccion = new Vector2(0,0.7*rigidbody2D.gravityScale);
							canjump = false;
							animator.SetBool("caminar", false);
							animator.SetBool("salta", true);
						}
					}
				}
			}
			else if (GUI_Izq.guiTexture.HitTest(Input.GetTouch(i).position)){
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					direccion = new Vector2(-1,0);
					if(transform.localScale.x > 0){
						transform.localScale.x *= -1;
					}else{
						transform.localScale.x *= 1;
					}

					if ((GUI_Salto.guiTexture.HitTest(Input.GetTouch(i).position) && canjump)){
						if(Input.GetTouch(i).phase == TouchPhase.Began){
							direccion = new Vector2(0,0.7*rigidbody2D.gravityScale);
							canjump = false;
							animator.SetBool("caminar", false);
							animator.SetBool("salta", true);
						}
					}
				}
			
			}else if ((GUI_Salto.guiTexture.HitTest(Input.GetTouch(i).position) && canjump)){
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					direccion = new Vector2(0,0.7*rigidbody2D.gravityScale);
					canjump = false;
					animator.SetBool("caminar", false);
					animator.SetBool("salta", true);
				}
			}else if (GUI_Ata.guiTexture.HitTest(Input.GetTouch(i).position)){
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					animator.SetBool("caminar", false);
					animator.SetBool("salta", false);
					animator.SetBool("poder1", true);
					LanzarPoder();
				}
			
			}else{
				direccion = Vector2.zero;
				animator.SetBool("caminar", false);
				animator.SetBool("salta", false);
				animator.SetBool("poder1", false);
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
	}	
}
function LanzarPoder(){
	var temp : Poder1;
	var pos : Vector2;
	pos  = new Vector2(transform.position.x+0.7,transform.position.y);
	Instantiate(poder1,pos,Quaternion.identity);
	temp.Update();
}
function OnDrawGizmos(){
}

function AgregarPuntaje(puntaje : int){
	score += puntaje;
	ActualizarScore();
}

function ActualizarScore(){
	scoreText.text = "Score: " + score;
}


function OnCollisionEnter2D(collground : Collision2D){
	if (collground.gameObject.tag == "Terreno"){
		canjump = true;
	}
}

function OnTrigger(collground : Collider2D){
	if (collground.gameObject.tag == "Terreno"){
		canjump = true;
	}
}

