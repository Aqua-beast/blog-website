import {createContext} from 'react'
const context = createContext({
    email: '',
    username: '',
    password: '',
    confirmedPassword: '',
})

export default context
