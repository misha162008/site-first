personClass
<?php

class Person{
	public $name = "Eric";
	public $age = "23";
	public $job = "web-dev";

	public function greeting(){
		return "Hello, ".$this->$name; //this для того что бы взять значения из свойства name для конкретного объекта
	}

}
  $eric = new Person ();
  echo $eric->greeting();
?>