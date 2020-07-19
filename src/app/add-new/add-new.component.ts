import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
	
	blogs = [];
	date = Date.now();
  constructor() {
	 
	  }
	
	
  ngOnInit(): void {
	  
  }
	
	addNew(title, text){
		
		let blog = {"title": title.value, "text": text.value, "date": this.date };
		
		if(localStorage.getItem("blogs")){
			this.blogs = JSON.parse(localStorage.getItem("blogs"))
		}
		this.blogs.splice(0,0,blog);
		localStorage.setItem("blogs", JSON.stringify(this.blogs))
		title.value = "";
		text.value = "";
		alert("Blog Submitted");
	}
	
}
