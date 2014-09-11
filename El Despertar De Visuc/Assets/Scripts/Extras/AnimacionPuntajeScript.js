#pragma strict

function Start () {

}

function Update () {
	transform.position += transform.up * 5 * Time.deltaTime;
}

function DestroyObject(){
	Destroy(gameObject);
}