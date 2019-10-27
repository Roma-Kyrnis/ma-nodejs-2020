const user = {
    firstName: 'John',
    lastName: 'Doe',
    rate: 0.86,
    address: {
        line1: '15 Macon St',
        line2: '',
        city: 'Gotham'
    },
    phoneNumbers: [
        {
            type: 'MOBILE',
            number: '(555) 555-1234'
        },
        {
            type: 'LINE',
            number: '(555) 555-5678'
        }
    ]
     
};

function check() {
    for(let key in user) {
            
        switch(key) {

            case 'firstName':

                if(typeof user[key] === "string") {

                    console.log(key + " is correct.");
                }
                else {

                    console.log(key + " is incorrect.");
                }

                break;

            case 'lastName':

                if(typeof user[key] === "string") {

                    console.log(key + " is correct.");
                }
                else {

                    console.log(key + " is incorrect.");
                }

                break;
                
            case 'rate':

                if(typeof user[key] === "number" && 0 <= user[key] && user[key] <= 1) {
                    console.log(key + " is correct.");
                }
                else {
                    console.log(key + " is incorrect.");
                }

                break;
        
                    
            case 'address':

                if(typeof user[key] === "object" && user[key] !== 0 && user[key] !== '')  {

                    for(let key in user.address){

                        if(typeof(user.address[key]) === "string" || user.address[key] === '') {
                            console.log(key + " is correct.");
                        }
                        else {
                            console.log(key + " is incorrect.");
                        }
                    }
                }
                else {
                    console.log(key + " is incorrect.");
                }

                break;
        
                    
            case 'phoneNumbers':

           
                if(typeof user[key] === "object" && user[key] !== 0 && user[key] !== '')  {
                        
                    for(let i = 0; i < user.phoneNumbers.length; i++) {
                        if(user.phoneNumbers[i].type === "MOBILE" || user.phoneNumbers[i].type === "LINE" || user.phoneNumbers[i].type === "VOIP") {
                            console.log("Type is correct.");
                        } else {
                            console.log("Type is incorrect.");
                        }

                        if((user.phoneNumbers[i].number).match(/^\(\d{3}\)\s\d{3}-\d{4}$/).join('')){
                            console.log("Number is correct.");
                        } else {
                            console.log("Number is incorrect.");
                        }
                    }
                }

                break;
        }        
    }
}

check();