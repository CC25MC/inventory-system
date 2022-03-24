import { request } from "./base";
import { Client, Supplier, Product, Combo, Entry, Exit, Inventory } from "./services";

request.client = Client;
request.supplier = Supplier;
request.product = Product;
request.combo = Combo;
request.entry = Entry;
request.exit = Exit;
request.inventory = Inventory;

export default request;