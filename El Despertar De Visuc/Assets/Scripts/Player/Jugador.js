﻿private var seMueve : boolean = false;
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
private var grav;
public var tieneLaLlaveDelNivel : boolean;
public var vive : boolean = true;
private var tiempo : int;

function Awake (){
	animator = GetComponent(Animator);
}
function Start (){
	tieneLaLlaveDelNivel = false;
	grav = rigidbody2D.gravityScale;
	score = 0;
	transform.position = Vector2.zero;
	ActualizarScore();
}

function Update (){
	
}
function FixedUpdate () {
	if(vive == true){             //si esta vivo le asigna la escala del tiempo a la variable tiempp sino, establece que la escala de tiempompasa a 0 es decir el juego se pausa
		tiempo = Time.time;
	}else{
		Time.timeScale = 0;
	}
	if(Input.touches.Length <= 0){
		seMueve = false;
		rigidbody2D.velocity = Vector2.zero;
		rigidbody2D.gravityScale = 48;
		animator.SetBool("caminar",false);
	}else{
		for(var i : int = 0; i < Input.touchCount; i++){
		
			if(GUI_Der.guiTexture.HitTest(Input.GetTouch(i).position)){
				if(Input.GetTouch(i).phase == TouchPhase.Stationary){
					transform.position += transform.right * velocidad * Time.deltaTime;
					seMueve = true;
					if(transform.localScale.x < 0){//si el jugador esta mirando a la izquierda(aca lo comprueba por la escala y si esta mirando a la izquierda lo voltea a la derecha)
						transform.localScale.x *= -1;
					}else{
						transform.localScale.x *= 1;
					}
					if (GUI_Salto.guiTexture.HitTest(Input.GetTouch(i).position)){
						if(Input.GetTouch(i).phase == TouchPhase.Began){
							transform.position += transform.up * 15 * Time.deltaTime;
							rigidbody2D.gravityScale = 0;
							canjump = false;
							animator.SetBool("caminar", false);
							animator.SetBool("salta", true);
						}
						if(Input.GetTouch(i).phase == TouchPhase.Ended){
							rigidbody2D.gravityScale = 48;
						}
					}
				}
				if(Input.GetTouch(i).phase == TouchPhase.Ended){
					animator.SetBool("caminar", false);	
				}
			}
			else if (GUI_Izq.guiTexture.HitTest(Input.GetTouch(i).position)){
				if(Input.GetTouch(i).phase == TouchPhase.Stationary){
					transform.position -= transform.right * velocidad * Time.deltaTime;
					seMueve = true;
					if(transform.localScale.x > 0){
						transform.localScale.x *= -1;
					}else{
						transform.localScale.x *= 1;
					}

					if (GUI_Salto.guiTexture.HitTest(Input.GetTouch(i).position)){
						if(Input.GetTouch(i).phase == TouchPhase.Began){
							transform.position += transform.up * 15 * Time.deltaTime;
							rigidbody2D.gravityScale = 0;
							canjump = false;
							animator.SetBool("caminar", false);
							animator.SetBool("salta", true);
						}
						if(Input.GetTouch(i).phase == TouchPhase.Ended){
							rigidbody2D.gravityScale = 48;
						}
					}
				}
				if(Input.GetTouch(i).phase == TouchPhase.Ended){
					animator.SetBool("caminar", false);	
				}
			
			}else if (GUI_Salto.guiTexture.HitTest(Input.GetTouch(i).position)){
				if(Input.GetTouch(i).phase == TouchPhase.Began){
					transform.position += transform.up * 15 * Time.deltaTime;
					rigidbody2D.gravityScale = 0;
					canjump = false;
					animator.SetBool("caminar", false);
					animator.SetBool("salta", true);
				}
				if(Input.GetTouch(i).phase == TouchPhase.Ended){
					rigidbody2D.gravityScale = 48;
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
			if(seMueve == true){
				animator.SetBool("caminar", true);
				
			}else{
				animator.SetBool("caminar", false);
			}
		}
	}	

}
function LanzarPoder(){
	var pos : Vector2;
	if(transform.localScale.x > 0){
		pos  = new Vector2(transform.position.x+0.7,transform.position.y);
	}else{
		pos  = new Vector2(transform.position.x-0.7,transform.position.y);
	}
	Instantiate(poder1,pos,Quaternion.identity);
	poder1.GetComponent(Poder1).Update();
}
function OnDrawGizmos(){
}

function AgregarPuntaje(puntaje : int){
	score = score + puntaje;
	ActualizarScore();
	Debug.Log(score);
}

function ActualizarScore(){
	scoreText.text = ("Score: " + score);
}


function OnCollisionEnter2D(collground : Collision2D){
	if (collground.gameObject.tag == "Terreno"){
		canjump = true;
	}
}


function setTieneLallave(estado : boolean){
	this.tieneLaLlaveDelNivel = estado;
}

function getTieneLallave() : boolean{

	return tieneLaLlaveDelNivel;
}

function OnGUI(){
	if(vive == false){
		GUI.Box(Rect((Screen.height*0.625),(Screen.width*0.25),(Screen.width*0.25),(Screen.height*0.25)),"Puntuacion: " +score);
		GUI.Label(Rect((Screen.height*0.645),(Screen.width*0.35),(Screen.width*0.25),(Screen.height*0.25)),"Tiempo Jugado: " + tiempo);
	}
}

function setVive(estado : boolean){
	
	vive = estado;
}
