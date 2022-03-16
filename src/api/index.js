import { request } from "./base";
import { Client } from "./services";
import { Supplier } from "./services";

request.client = Client;
request.supplier = Supplier;

export default request;