import { request } from "./base";
import { Client, Supplier, Product, Combo, Entry, Exit } from "./services";

request.client = Client;
request.supplier = Supplier;
request.product = Product;
request.combo = Combo;
request.entry = Entry;
request.exit = Exit;

export default request;