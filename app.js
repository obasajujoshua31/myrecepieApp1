const express = require("express");
const path = require("path");
const { User } = require("./models");
const app = express();

// initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 const user = User.build({
 	firstName: 'Joshua',
    lastName: 'Obasaju',
    email: 'obasajujoshua@yahoo.com',
    password: '123456',
    createdAt: new Date()
 });
 // user.save().then((results)=>{
 // 	console.log("results: ", results);
 // })
// .catch(err=>{
// 	console.error("error found: ", err);
// })



app.get("/", (req, res) => {
 User.update(
 	{email: 'obasajujoshua31@gmail.com', password: 'electrical'},
 	
 	{ returning: true, 
 		where: {
 			id: 2
 		}
 	})
 	.then(([rowupdated, updatedBook]) => {
	res.json(updatedBook);
})
.catch(err=>{
	console.error("error found: ", err);
})
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
