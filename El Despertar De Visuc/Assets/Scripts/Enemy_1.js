#pragma strict

var maxX = 6.1;
var minX = -6.1;
var moveSpeed = 1;
private var tChange: float = 0; // force new direction in the first Update
private var randomX: float;

function Start () {

}

function Update () {
	if (Time.time >= tChange){
		randomX = Random.Range(-2.0,2.0);
		
		tChange = Time.time + Random.Range(0.5,1.5);
	}
	
	transform.Translate(Vector3(randomX,0,0) * moveSpeed * Time.deltaTime);
	
	if (transform.position.x >= maxX || transform.position.x <= minX) {
       randomX = -randomX;
    }
    
     transform.position.x = Mathf.Clamp(transform.position.x, minX, maxX);
}

