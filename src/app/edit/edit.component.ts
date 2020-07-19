import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes, Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
	
	title = "";
	text = "";
	date = Date.now();
	blogs = [];
	index;
    maxindex;
	titleDsp = "";
	form;
	
  constructor(private _Activatedroute:ActivatedRoute,public router: Router) {}
  ngOnInit() {
      this._Activatedroute.paramMap.subscribe(params => { 
    	  this.index = params.get('index');  
	  	});
	  this.getData();
	  this.form = new FormGroup({
		  title: new FormControl(this.title, Validators.required),
		  text: new FormControl(this.text, Validators.required)
		  })
	  console.log(this.title);
  }
 
    onBackward(){
        if(this.index > 0){
            this.index--;
            this.router.navigate(['/edit',this.index]);
            this.getData();
        }
    }
    
    onForward(){
        this.blogs = JSON.parse(localStorage.getItem("blogs"));
        this.maxindex=this.blogs.length;
        if(this.index < this.maxindex-1){
            this.index++;
            this.router.navigate(['/edit',this.index]);
            this.getData();
        }
    }
    
    getData(){
	  this.blogs = JSON.parse(localStorage.getItem("blogs"));
	  this.title = this.blogs[this.index].title;
	  this.text = this.blogs[this.index].text;
	this.date = this.blogs[this.index].date;
    }
	editBlog(blog,titletext,content){
		let blogEdit = {"title": titletext.value, "text": content.value, "date":this.date};
        this.titleDsp = titletext.value;
		this.blogs.splice(this.index, 1, blogEdit);
		localStorage.setItem("blogs",JSON.stringify(this.blogs));
		alert("Blog Updated");
	} 
	
}
