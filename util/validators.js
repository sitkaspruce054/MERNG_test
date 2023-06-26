module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
 ) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username cannot be empty';
    }
    if(email.trim() === ''){
        errors.username = 'Username cannot be empty';
    } else {
        const regEx = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
        if(!email.match(regEx)){
            errors.email = 'Email must be valid';
        }
    }
    if(password === ''){
        errors.password = 'Password must not be empty'
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

module.exports.validateLoginInput = (username,password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username cannot be empty';
    }
    if(password.trim() === ''){
        errors.password = 'Password cannot be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
    
}

//3:09:00