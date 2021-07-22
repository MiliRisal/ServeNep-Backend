const express = require('express');
const fetch = require ('node-fetch');

const router = express.Router();

router.post('/send/notificationtoall',(req)=>{
    var notification ={
        'title':'title of notification',
        'text':'subtitle'
    };
    var fcm_token =[];
    var notification_body ={
        'notification': notification,
        'registration_ids': fcm_token
    };
 

    fetch('https://fcm.googleapis.com/fcm/send',{
        'method':'POST',
        'headers':{ 
            'Authorization':'key='+
            'AAAABfaM5Us:APA91bFaJ928p1v8x9JORngHk7Kd-4AHeIWPKfn8CM8W8Z7zFA1NhBYEcK9cPvQMRUByc47Y_UmUd6iEOL5wMoFv-4g91FH2A84YQWcjIYHkBbZ6o_9JODoDaMahjREXONvrJJnmbMrG',
            'Content-Type':'application/json'
              
         },
        'body': JSON.stringify(notification_body)

    }).then(()=>{
        res.status(200).send('Notification send successfully');
    }).catch((err)=>{
        res.status(400).send('some thing went wrong');
        console.log(err);

    });

});
module.exports=router;
