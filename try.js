function greetings() {
    console.log("Hello World!")
}

// greetings()

const greetings2 = () => {
    return { 
        name: "John" 
    }
}

// console.log(greetings2())

// (function (){
//     console.log("Hello World!")
// })()

const arr = [1,2,3,4,5,6]

const predicate = function(ele) {
    if(ele % 2 == 0) return true
    return false
}

const filteredArray = arr.filter(predicate)

console.log(filteredArray)