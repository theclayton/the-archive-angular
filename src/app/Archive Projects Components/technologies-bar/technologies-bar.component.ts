import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-technologies-bar',
  templateUrl: './technologies-bar.component.html',
  styleUrls: ['./technologies-bar.component.css']
})
export class TechnologiesBarComponent implements OnInit {

  technologies = [
    { name: "Xcode", src: "src/assets/technologies/xcode.png" },
    { name: "Swift", src: "src/assets/technologies/swift.png" },
    { name: "Javascript", src: "src/assets/technologies/javascript.png" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onTechClick(tech) {
    console.log(tech)
  }

}
