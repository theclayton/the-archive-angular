import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // TODO: GET FEATURED PROJECTS
  featuredProjects = [
    {
      title: "Project 1",
      subtitle: "The coolest iPhone4 app ever",
      category: "Mobile",
      thumbnail: "src/assets/proj-1/screen1.jpg",
      dateCreated: "12/05/2000",
      technologies: [
        { name: "Swift" },
        { name: "Xcode" },
        { name: "MySQL" },
      ],
      description: "This is a description of the project",
      links: [
        {
          name: "App Store",
          type: "appstore",
          url: "https//apple.com",
        }
      ],
      images: [{
        name: "Screenshot q",
        src: "src/assets/proj-1/screen1.jpg",
        caption: "Screenshot 1 of project",
        width: "150",
        height: "300"
      }]
    },

    {
      title: "Project 2",
      subtitle: "The coolest Website ever built on this planet ever",
      category: "Web",
      thumbnail: "src/assets/proj-1/screen1.jpg",
      dateCreated: "7/12/2007",
      technologies: [
        { name: "Swift" },
        { name: "Xcode" },
        { name: "MySQL" },
      ],
      description: "This is a description of the project built with the latest and greatest",
      links: [
        {
          name: "App Store",
          type: "appstore",
          url: "https//apple.com",
        }
      ],
      images: [{
        name: "Screenshot q",
        src: "src/assets/proj-1/screen1.jpg",
        caption: "Screenshot 1 of project",
        width: "150",
        height: "300"
      }]
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
