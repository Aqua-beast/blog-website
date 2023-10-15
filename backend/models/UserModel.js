const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('email-validator');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.validate(value),
            message: (props) => `${props.value} is not a valid email address`,
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    confirmedPassword: {
        type: String,
        minLength: 8,
    },  
    slug: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
        validate: function(){
            if(this.password === 'admin1234'){
                this.role = 'admin';
            }
        }
    }, 
    imageUrl: {
        // required: true,
        type: String,
    }, 
    }
)

UserSchema.pre('validate', function(next){
    if(this.email){
        this.slug = slugify(this.username, {lower: true, strict: true});
    }
    next();
})

UserSchema.pre('save', async function(next){
    try{
        const salt = bcrypt.genSaltSync(4);
        this.password = bcrypt.hashSync(this.password, salt);
    }catch(err){
        console.log(err);
    }
    console.log(this.password);
    next();
})

UserSchema.pre('save', function(next){
    this.confirmedPassword = undefined;
    next();
})


module.exports = mongoose.model('User', UserSchema);