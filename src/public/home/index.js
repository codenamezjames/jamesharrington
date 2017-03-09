import {HttpClient} from 'aurelia-http-client';
import projects from '../../config/projects'

let client = new HttpClient();

export class index {
    constructor(){
        this.projects = projects
    }
    submitContact(){
        client.post('http://64.137.217.6:3000/mail', this.contact)
          .then((d) => {
              console.log(d)
              this.contact = {}
              console.log(this)
          })
    }
}