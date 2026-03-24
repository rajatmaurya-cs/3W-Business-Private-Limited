import express from 'express';

import {authsignIn, authlogin} from '../controller/auth.js'



const authroutes= express.Router();


authroutes.post('/login',authlogin)

authroutes.post('/signin',authsignIn)



export  default authroutes;
