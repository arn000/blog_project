import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AddNewComponent } from './add-new/add-new.component';
import { PostComponent } from './post/post.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTreeModule} from '@angular/material/tree';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddNewComponent,
    PostComponent,
    EditComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    NgbModule,
	ReactiveFormsModule,
	FormsModule,
	MatTreeModule,
	MatButtonModule,
	MatIconModule,
	BrowserAnimationsModule,

	NgxPaginationModule,
  ],
  providers: [
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
