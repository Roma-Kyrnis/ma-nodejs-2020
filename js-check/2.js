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
                        
                    let key = Object.keys(user.phoneNumbers);

                        for(let key1 in user.phoneNumbers){

                            
                            
                            for(let key2 in Object.keys(user.phoneNumbers[key1]['type'])) {

                                for(let key3 in user.phoneNumbers[key1]['type'][key2]) {
                                    
                                    console.log(user.phoneNumbers[key1]['type'][key2][key3]);
                                }
                            }
                        }
                }

                break;
        }        
    }
}


check();