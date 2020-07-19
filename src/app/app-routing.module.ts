import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNewComponent } from './add-new/add-new.component';
import { PostComponent } from './post/post.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
	{
		path: "",
		component: HomeComponent
	},
	{
		path: "new",
		component: AddNewComponent
	},
	{
		path: "post/:index",
		component: PostComponent
	},
	{
		path: "edit/:index",
		component: EditComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
