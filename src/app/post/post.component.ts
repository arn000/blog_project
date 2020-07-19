import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

	title = "";
	text = "";
	date = "";
	blogs = [];
	index;
    isShow=false;
    maxindex;
 
  
  constructor(private _Activatedroute:ActivatedRoute,public router: Router) {}
    
  ngOnInit() {
      this._Activatedroute.paramMap.subscribe(params => { 
    	  this.index = params.get('index');  
	  	});
	  this.getData();
  }
    
    toggleDisplay() {
        this.isShow = !this.isShow;
    }
    
    onBackward(){
        if(this.index > 0){
            this.index--;
            this.router.navigate(['/post',this.index]);
            this.getData();
        }
    }
    
    onForward(){
        this.blogs = JSON.parse(localStorage.getItem("blogs"));
        this.maxindex=this.blogs.length;
        if(this.index < this.maxindex-1){
            this.index++;
            this.router.navigate(['/post',this.index]);
            this.getData();
        }
    }
    
    getData(){
	  this.blogs = JSON.parse(localStorage.getItem("blogs"));
	  this.title = this.blogs[this.index].title;
	  this.text = this.blogs[this.index].text;
	this.date = this.blogs[this.index].date;
    }
}
