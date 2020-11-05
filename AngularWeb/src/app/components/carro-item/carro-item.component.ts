import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { CartService } from '../../services/cart.service';
import swal from 'sweetalert';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartModel } from '../../models/cart'
@Component({
  selector: 'app-carro-item',
  templateUrl: './carro-item.component.html',
  styleUrls: ['./carro-item.component.css'],
  providers: [CartService]
})
export class CarroItemComponent implements OnInit {

  @Input() cartItem: CartModel;
  @Output() DeleteProductCart = new EventEmitter();

  constructor(private _cartService: CartService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
  }

  deleteItem(event, cartItem) {
    var id = cartItem._id;
    this.DeleteProductCart.emit({
      producto: id
    });
  }

}
