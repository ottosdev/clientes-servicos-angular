import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  href: string='';
  ngAfterViewInit(): void {
    // depois que a tela foi inicializada
    (function($) {
      "use strict";

      // Add active state to sidbar nav links
      var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
          $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
              if (this instanceof HTMLAnchorElement && this.href === path) {
                  $(this).addClass("active");
              }
          });

      // Toggle the side navigation
      $("#sidebarToggle").on("click", function(e) {
          e.preventDefault();
          $("body").toggleClass("sb-sidenav-toggled");
      });
  })(jQuery);
  }
  ngOnInit(): void {
    // carregar algum dado antes da tela aparecer.

  }
  title = 'clientes-app';

}
