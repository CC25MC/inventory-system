import { request } from "./base";
import { Client } from "./services";
import { Supplier } from "./services";
import { Product } from "./services";

request.client = Client;
request.supplier = Supplier;
request.product = Product;

export default request;