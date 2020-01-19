import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient: HttpClient) { }

  public getAllProducts() {
    return this.httpClient.get(`http://localhost:8080/api/shop/products`);
  }

  public getProductByCategory(catId: string) {
    return this.httpClient.get(`http://localhost:8080/api/shop/products/${catId}`);
  }

  public getCurrenCart() {
    return this.httpClient.get(`http://localhost:8080/api/shop/cart`);
  }

  public addToCart(data) {
    return this.httpClient.post(`http://localhost:8080/api/shop/cart`, {product_id: data.product_id, quantity: data.quantity});
  }

  public checkOutOrder(data) {
    return this.httpClient.post(`http://localhost:8080/api/shop/cart`, {product_id: data.product_id, quantity: data.quantity});
  }

}
