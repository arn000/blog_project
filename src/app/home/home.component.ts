import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource,MatTreeFlattener} from '@angular/material/tree';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

interface FoodNode {
	
  name: string;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	totalRecords: number;
	page:number=1;
  final_data: FoodNode[] = [];
  ff : any ;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public datepipe: DatePipe) {

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  blogs = [];
  ngOnInit(): void {
    this.blogs = JSON.parse(localStorage.getItem('blogs'));

    for (let p of this.blogs) {
      var z = this.datepipe.transform(p.date, 'yyyy:MM:dd').toString();

      this.insert_year(z.split(':') , p);
      this.ff=p;
    }
    this.dataSource.data = this.final_data;

  }

  removeBlog(blog) {
    let index = this.blogs.indexOf(blog);
    this.blogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  }

  insert_year(array , qa) {
    if (this.final_data.length > 0) {
      let i = 0;
      let check = 0;
      for (let p of this.final_data) {
        if (p.name == array[0]) {
          check = 1;
          break;
        }
        i++;
      }
      if (check == 0) {
        let temp = {
          name: array[0],
          children: [],
        };
        this.final_data.push(temp);
        this.insert_month(1, array , qa);
      } else {
        this.insert_month(0, array , qa);
      }
    } else {
      let temp = {
        name: array[0],
        children: [],
      };
      this.final_data.push(temp);
      this.insert_month(1, array , qa);
    }
  }

  insert_month(new_data, array , qa) {
    if (new_data == 1) {
      let i = 0;
      for (let p of this.final_data) {
        if (p.name == array[0]) {
          break;
        }
        i++;
      }
      let temp = {
        name: this.getMonth_name(array[1]),
        children: [],
      };
      this.final_data[i].children.push(temp);
      this.getDays(1, array , qa);
    } else {
      let i = 0;
      for (let p of this.final_data) {
        if (p.name == array[0]) {
          let check = 0;
          let j = 0;
          for (let k of p.children) {
            if (this.getMonth_name(array[1]) == k.name) {

                this.getDays(2, array , qa);
               check = 1;
              break;
            }
            j++;
          }
          if (check == 0) {
            let temp = {
              name: this.getMonth_name(array[1]),
              children: [],
            };
            this.final_data[i].children.push(temp);
            this.getDays(2, array , qa);
          }
        }
        i++;
      }
    }
  }

  getDays(newData, array , qa) {
    if (newData == 1) {
      let i = 0;
      for (let p of this.final_data) {
        if (p.name == array[0]) {
          let j = 0;
          for (let q of p.children) {
            if (q.name == this.getMonth_name(array[1])) {
              let temp = {
                name: q.name + '-' + array[2],
                children: [],
              };
              this.final_data[i].children[j].children.push(temp);
              this.textinsert(1 , array , qa);

              break;
            }
            j++;
          }
          break;
        }
        i++;
      }
    } else {
      let i = 0,
        j = 0,
        k = 0;
      for (let p of this.final_data) {
        if (p.name == array[0]) {
          j = 0;
          for (let q of p.children) {
            if (q.name == this.getMonth_name(array[1])) {
              let check = 0;
              k = 0;
              for (let z of q.children) {
                let aa = z.name.split('-');
                if (aa[1] == array[2]) {
                  this.textinsert(2 , array , qa);
                  check = 1;
                  break;
                }
                k++;
              }
              if (check == 0) {
                let temp = {
                  name: q.name + '-' + array[2],
                  children: [],
                };
                this.final_data[i].children[j].children.push(temp);
                this.textinsert(2 , array , qa);
              }
              break;
            }
            j++;
          }
        }
        i++;
      }
    }
  }


  textinsert(newData , array , qa){
      let i = 0,j = 0, k = 0;
      for (let p of this.final_data) {
        if (p.name == array[0]) {
           j = 0;
          for (let q of p.children) {
            if (q.name == this.getMonth_name(array[1])) {
            k = 0 ;
              for(let r of q.children){
                      if(r.name == this.getMonth_name(array[1]) + "-" + array[2]){
                        let temp = {
							index: qa.index,
                           name :  qa.title,
                          children : []
                        }
                         this.final_data[i].children[j].children[k].children.push(temp);
                         break ;
                      }
                      else{
                      }
                      k++ ;
              }
              break;
            }
            j++;
          }
          break;
        }
        i++;
      }
  }

  getMonth_name(month) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[Math.round(month - 1)];
  }

  onClick(p){
   console.log(p);
  }
}
