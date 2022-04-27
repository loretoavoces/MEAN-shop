import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private localStorage: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.localStorage.removeToken();
    this.router.navigate(['/login'])
  }

}
