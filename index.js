const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
//app.set('views',path.join(__dirname,'views'));
app.set('views','./views');

app.use(express.urlencoded());

app.use(express.static('assets'));



// //middleware 2
// app.use(function(req,res,next){
//     req.myname="neeraj";
//   //  console.log("middleware is 1 called");
//     next();
// });
// //middleware 2
// app.use(function(req,res,next){
//         console.log('My name from mw2', req.myname);
//   //  console.log("middleware is 2 called");
//     next();
// });


var contactList = [
    {
        name:"neeraj",
        phone:"9910884306"
    },
    {
        name:"nitin",
        phone:"9717398309"
    },
    {
        name: "dheeraj",
        phone :"9810952558" 
    }
]
app.get('/',function( req ,res){
//    console.log('from the get route controller',req.myname);
 // find can be use with query  but we are not looking for    
    Contact.find({},function(err, contacts){
            if(err){
                console.log('error in fetching');
                return;
            }
            return res.render('home',{
                title: "Contacts List",
                contact_list :contacts
            });
    });

    // return res.render('home',{
    //     title:"Contact list",
    //     contact_list:contactList
});


app.get('/practice',function(req,res){
        return res.render('practice', {
            title:"let us play with ejs"
        });
});

app.post('/create-contact', function( req , res){
//    contactList.push({
//        name: req.body.name,
//        phone:req.body.phone
//    });

  // contactList.push(req.body);
    Contact.create({
        name : req.body.name,
        phone: req.body.phone

    },function(err, newContact){
    if(err){
            console.log('error in creating a contact');
            return;
    }
        console.log('*******', newContact);
        return res.redirect('back');


    });
//   return res.redirect('back');
   // return res.redirect('/practice');
});

//for deleting a contact
app.get('/delete-contact',function(req , res){
   // get the query from url
 // let phone =req.query.phone;
//get th id from query in the url
   let id = req.query.id;
   
    console.log(id);
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //         contactList.splice(contactIndex, 1);
    // }

  //find the contact in the database  
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object froom database');
            return;
        }
        return res.redirect('back');
    });
   

});

app.listen(port, function(err){
    if (err){
        console.log('Error in running the server');
    }
    console.log('yup! My express server is running on port:', port);
});