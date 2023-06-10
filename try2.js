const obj1 = {
    name: "John",
    age: 24,
    greetings: function(){
        console.log(" My details are: ", this.name, this.age)
    }
}

obj1.greetings()