import { request } from "./base";
import { Client, Supplier, Product, Combo } from "./services";

request.client = Client;
request.supplier = Supplier;
request.product = Product;
request.combo = Combo;

export default request;