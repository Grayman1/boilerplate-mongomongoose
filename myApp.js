require('dotenv').config();
// iNSTALL MONGOOSE
var mongoose = require('mongoose');
// SET-UP MONGOOSE
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


//import mongoose from 'mongoose';
const { Schema } = mongoose;

const personSchema = new Schema({
    name:  {type: String, required: true}, 
    age: Number,
    favoriteFoods: [String]
  });

const Person = mongoose.model('Person', personSchema);


// Challenge #3 code: Create and Save a Record of the Model

const createAndSavePerson = (done) => {
  let fred = new Person({
    name:  "Fred", 
    age:57,
    favoriteFoods: ["Beer", "Ale", "Pretzels"]
  });
  fred.save((err,data) => {
    if(err) {
      console.log(err)
    } else {
      done(null, data);
    }
  })  
};

/*
// Challenge #4 code: Create Many Records with model.create()
let arrayOfPeople = [
  {name:  "Joe", age:11, 
  favoriteFoods: ["Chicken", "Taki's", "Smoothies"]},
  {name:  "Luke", age:11,
    favoriteFoods: ["Chicken", "Taki's", "Pizza"]},
  {name:  "Gui", age:12,
    favoriteFoods: ["Pork", "Pizza", "Pretzels"]},
  {name:  "Eddie", age:10,     favoriteFoods: ["Chicken", "Burgers", "Pizza"]},
  {name:  "Jack", age:12, favoriteFoods: ["Burgers", "Beans", "hard-boiled eggs"]}
]
*/


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, newPersons) => {
    if(err) {
      console.log(err)
    } else {
      done(null, newPersons);
    }  
  })
};

/*
// Challenge #5 code: Use model.find() to Search Your Database

Person.find({name: "Eddie"}, (err, data) => {
  if(err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
*/
// data is array of results
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
  if(err) {
    console.log(err)
  } else {
    console.log(data)
    done(null, data);
  }
})  
};


// Challenge #6 code: Use model.findOne() to Return a Single Matching Document from Your Database


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: {$all : food}}, (err, data) => {
  if(err) {
    console.log(err)
  } else {
    console.log(data)
    done(null, data);
  }
})
};


// Challenge #7: Use model.findById() to Search Your Database By _id

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
  if(err) {
    console.log(err)
  } else {
    console.log(data)
    done(null, data);
  }
})  
};


// Challenge #8 code: Perform Classic Updates by Running Find, Edit, then Save

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
  if(err) {
    console.log(err)
  } else {
    //console.log(data)
    data.favoriteFoods.push(foodToAdd)
    data.save((err, updatedRecord) => {
      if(err) {
        console.log(err)
      } else {
        done(null, updatedRecord)
      }
    })
  }
  })
};


// Challenge #9 code: Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName},{age: ageToSet},{new: true},(err, updatedRecord) => {
      if(err) {
    console.log(err)
  } else {
    done(null, updatedRecord)
      }
    })
};

// Challenge #10 code: Delete One Document Using model.findByIdAndRemove


const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
