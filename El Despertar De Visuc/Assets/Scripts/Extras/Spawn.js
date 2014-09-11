#pragma strict

public var prefab : GameObject; 
public var cantidadAGenerar : int; 
public var velocidadDeGeneracion : int; 
private var rotacion : Quaternion = Quaternion.identity; 
private var numerodeInstancias:int = 0; 
private var tiempoDeGeneracion : float; 
public var SensorActivado : boolean;

function Start(){
	SensorActivado = false;
}
function Update () { 
	if(SensorActivado == true){
	    if((numerodeInstancias <= cantidadAGenerar) && (Time.time > tiempoDeGeneracion)) 
	    { 
	        numerodeInstancias += 1; 
	        tiempoDeGeneracion = Time.time + velocidadDeGeneracion; 
	        var objeto:GameObject = Instantiate(prefab,gameObject.transform.position,rotacion); 
	    } 
	}
} 

function setSpawn(estado : boolean){
	
	this.SensorActivado = estado;
	
}