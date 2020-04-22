const ContactusModel = require("../model/contactus")


function ContactUs(obj, args, context, info)
    {   
        const Contactus = new ContactusModel({
            qemail : obj.qemail,
            query : obj.query,
         })
    
        return Contactus.save();
    }

module.exports = { ContactUs };