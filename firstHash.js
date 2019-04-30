//first hash tables


/*This is a very simple hash table function, it
adds up charcodes for each char in a string and 
returns the remainder of the sumation of charCodes 
when divided by max, this remainder provides the
index to store the data*/
var hash = function(string, max) {
  var hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};


let HashTable = function () {
    //stores all data
    let storage = [];
    //number of buckets in array (normally much higher, for less collisions)
    const storageLimit = 4;

    //for debugging to log all items in storage
    this.print = function(){
        console.log(storage);
    };

    //function to add or change key, value
    this.add = function(key, value) {
        //calls the hash  function to create a index
        var index = hash(key, storageLimit);

        //if index is undefined in storage adds an array containing the [key, value] into the index
        if(storage[index] === undefined){
            storage[index] = [
                [key, value]
            ];
        } else {
            var inserted = false;
            //if index already exists loop through its contents
             for (let i = 0; i < storage[index].length; i++) {
                 //if the key exists in the the index change its value to new value
                 if (storage[index][i][0] === key){
                    storage[index][i][1] = value;
                    inserted = true;
                 } 
             }
             //if the key doesnt exists add the key, value to the index
             if (inserted === false) {
                 storage[index].push([key, value]);
             }
        }
    };

    //function to remove key, value from index
    this.remove = function (key) {
        //gets index from hash function
        var index = hash(key, storageLimit);
        //checks if index has one item and if it equals the, then deletes it
        if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];            
        } else {
            //loops through index deleting key,value if it finds a matching key
            for (let i = 0; i < storage[index]; i++) {
                if (storage[index][i][0] === key){
                    delete storage[index][i];
                }
            }
        }
    };

    this.lookup = function (key) {

        //gets index from hash function
        var index = hash(key, storageLimit);
        //if key doesnt exists return undefined
        if (storage[index] === undefined) {
            return undefined;
        } else {
            //loops  through index and looks for match,
            // returns the value when key is found
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    return storage[index][i][1]
                }
            }
        }
    };
};

//test index output
console.log(hash("tom", 10));

//creates a new hashtable called ht
let ht = new HashTable();

//adds the following four key,value
ht.add("patrick", "creep");
ht.add("matt", "blacksmith");
ht.add("shivam", "leader");
ht.add("david", "general");

//prints the value for "shivam" if it exists
console.log(ht.lookup("shivam"));

//prints entire hashtable storage aray
ht.print();
