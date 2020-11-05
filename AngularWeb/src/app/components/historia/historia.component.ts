import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css'],
  providers: [ArticleService]
})
export class HistoriaComponent implements OnInit {
  public title: string;
  constructor() {
    this.title = "Nuestro Equipo";}

  ngOnInit(): void {
  }

}
