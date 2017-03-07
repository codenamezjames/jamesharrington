import {HttpClient} from 'aurelia-http-client';
import projects from '../../config/projects'

let client = new HttpClient();

export class index {
    constructor(){
        this.projects = projects
    }
    submitContact(){
        const url = 'https://maker.ifttt.com/trigger/contact/with/key/bR8ZKb3setep__kjb2YU9YGgWgsmDiq1dI7xFqYMMV6'

        console.log(this.contact)
        client.post({
            url, 
            content:{"value1":JSON.stringify(this.contact, null, 2)} 
        })
        // .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }
}