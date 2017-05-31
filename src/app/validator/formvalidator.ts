import {FormControl} from '@angular/forms';


export class FormValidator {

   static isValidMailFormat(control: FormControl){
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "Please provide a valid email": true };
        }

        return null;
    }

    static isAPhoneNumber(control:FormControl){
    	if(!isNaN(parseFloat(control.value)) && isFinite(control.value)){
    		return null;
    	}
    	return { "Please provide a valid phone number": true };
    }

    static isAValidNumber(control:FormControl){
    	if(!isNaN(parseFloat(control.value)) && isFinite(control.value)){
    		return null;
    	}
    	return { "Please provide a valid duration": true };
    }

}