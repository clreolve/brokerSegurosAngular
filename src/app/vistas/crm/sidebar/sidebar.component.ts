import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/crm/contactos', title: 'Contactos',  icon: 'pe-7s-user', class: '' },
    { path: '/crm/graficos', title: 'Graficos',  icon: 'pe-7s-graph', class: '' },
    { path: '/crm/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/crm/notificaciones', title: 'Notificaciones',  icon:'pe-7s-bell', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};

}
